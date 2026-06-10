// HMAC-signed token utilities. A token encodes the email + issue time, signed
// with a shared secret. Verification requires only the secret — no DB lookup.

function b64urlEncode(bytes: Uint8Array): string {
	let bin = ''
	for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i])
	return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function b64urlDecode(s: string): Uint8Array {
	const pad = s.length % 4 === 0 ? '' : '='.repeat(4 - (s.length % 4))
	const std = s.replace(/-/g, '+').replace(/_/g, '/') + pad
	const bin = atob(std)
	const out = new Uint8Array(bin.length)
	for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i)
	return out
}

async function hmacKey(secret: string): Promise<CryptoKey> {
	return crypto.subtle.importKey(
		'raw',
		new TextEncoder().encode(secret),
		{ name: 'HMAC', hash: 'SHA-256' },
		false,
		['sign', 'verify']
	)
}

export interface TokenPayload {
	e: string // email (lowercased)
	t: number // issued-at unix seconds
}

export async function mintToken(payload: TokenPayload, secret: string): Promise<string> {
	const body = b64urlEncode(new TextEncoder().encode(JSON.stringify(payload)))
	const key = await hmacKey(secret)
	const sig = new Uint8Array(
		await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(body))
	)
	return `${body}.${b64urlEncode(sig)}`
}

export async function verifyToken(
	token: string,
	secret: string,
	ttlSeconds: number
): Promise<TokenPayload | null> {
	const parts = token.split('.')
	if (parts.length !== 2) return null
	const [body, sigB64] = parts
	const key = await hmacKey(secret)
	const ok = await crypto.subtle.verify(
		'HMAC',
		key,
		b64urlDecode(sigB64),
		new TextEncoder().encode(body)
	)
	if (!ok) return null
	let payload: TokenPayload
	try {
		payload = JSON.parse(new TextDecoder().decode(b64urlDecode(body))) as TokenPayload
	} catch {
		return null
	}
	if (typeof payload.t !== 'number' || typeof payload.e !== 'string') return null
	const ageSeconds = Math.floor(Date.now() / 1000) - payload.t
	if (ageSeconds < 0 || ageSeconds > ttlSeconds) return null
	return payload
}
