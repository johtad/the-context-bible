// Cloudflare Worker: email-gated download of Context Matters.
//
// Routes:
//   POST /api/book/request    { email, name? }  -> sends an email with a signed link
//   GET  /api/book/download?token=...           -> verifies the token, returns the PDF
//
// Emails are also stored in KV (BOOK_EMAILS) keyed by lowercased email for
// future outreach. Tokens are HMAC-signed and time-limited (TOKEN_TTL_HOURS).

import pdfBytes from '../assets/context-matters.pdf'
import { mintToken, verifyToken } from './token'
import { sendDownloadLink } from './email'

export interface Env {
	BOOK_EMAILS: KVNamespace
	SITE_ORIGIN: string
	FROM_EMAIL: string
	TOKEN_TTL_HOURS: string
	RESEND_API_KEY: string
	TOKEN_SECRET: string
}

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const MAX_EMAIL_LEN = 254
const MAX_NAME_LEN = 80

function corsHeaders(origin: string): Record<string, string> {
	return {
		'Access-Control-Allow-Origin': origin,
		'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type',
		'Access-Control-Max-Age': '86400'
	}
}

function json(body: unknown, init: ResponseInit & { origin: string }): Response {
	return new Response(JSON.stringify(body), {
		...init,
		headers: {
			'Content-Type': 'application/json',
			...corsHeaders(init.origin),
			...(init.headers || {})
		}
	})
}

async function handleRequest(req: Request, env: Env, origin: string): Promise<Response> {
	let body: { email?: string; name?: string; website?: string }
	try {
		body = await req.json()
	} catch {
		return json({ ok: false, error: 'Invalid JSON body.' }, { status: 400, origin })
	}

	// Honeypot — silently succeed so bots don't learn the field is fake.
	if (body.website && body.website.length > 0) {
		return json({ ok: true, status: 'pending' }, { status: 200, origin })
	}

	const email = String(body.email || '').trim().toLowerCase()
	if (!email || email.length > MAX_EMAIL_LEN || !EMAIL_RE.test(email)) {
		return json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400, origin })
	}
	const name = body.name ? String(body.name).slice(0, MAX_NAME_LEN).trim() : null

	// Mint token.
	const ttlSeconds = Math.max(60, Number(env.TOKEN_TTL_HOURS || '168') * 3600)
	const issuedAt = Math.floor(Date.now() / 1000)
	const token = await mintToken({ e: email, t: issuedAt }, env.TOKEN_SECRET)
	const downloadUrl = `${env.SITE_ORIGIN}/book/download?token=${encodeURIComponent(token)}`

	// Persist the email (idempotent; preserves the original signup time).
	try {
		const existingRaw = await env.BOOK_EMAILS.get(email)
		const existing = existingRaw ? (JSON.parse(existingRaw) as Record<string, unknown>) : null
		const record = {
			email,
			name: existing?.name || name,
			first_seen: existing?.first_seen || new Date().toISOString(),
			last_seen: new Date().toISOString(),
			request_count: ((existing?.request_count as number) || 0) + 1,
			user_agent: req.headers.get('user-agent') || null,
			country: req.headers.get('cf-ipcountry') || null
		}
		await env.BOOK_EMAILS.put(email, JSON.stringify(record))
	} catch (err) {
		console.error('[book-gate] KV write failed:', (err as Error).message)
		// Non-fatal — still send the link.
	}

	// Send the email.
	const send = await sendDownloadLink({
		to: email,
		downloadUrl,
		fromEmail: env.FROM_EMAIL,
		resendApiKey: env.RESEND_API_KEY
	})
	if (!send.ok) {
		console.error('[book-gate] email send failed:', send.error)
		return json(
			{ ok: false, error: "We saved your email but couldn't send the link. Please try again in a moment." },
			{ status: 502, origin }
		)
	}

	return json({ ok: true, status: 'sent' }, { status: 200, origin })
}

async function handleDownload(req: Request, env: Env, origin: string): Promise<Response> {
	const url = new URL(req.url)
	const token = url.searchParams.get('token') || ''
	if (!token) {
		return json({ ok: false, error: 'Missing token.' }, { status: 400, origin })
	}
	const ttlSeconds = Math.max(60, Number(env.TOKEN_TTL_HOURS || '168') * 3600)
	const payload = await verifyToken(token, env.TOKEN_SECRET, ttlSeconds)
	if (!payload) {
		return json(
			{ ok: false, error: 'This download link is invalid or has expired. Please request a fresh one.' },
			{ status: 401, origin }
		)
	}

	const bytes = pdfBytes as unknown as ArrayBuffer
	return new Response(bytes, {
		status: 200,
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Disposition': 'attachment; filename="Context-Matters.pdf"',
			'Cache-Control': 'private, no-store',
			...corsHeaders(origin)
		}
	})
}

export default {
	async fetch(req: Request, env: Env): Promise<Response> {
		const url = new URL(req.url)
		// Allow same-origin and the site origin to call the API.
		const origin = req.headers.get('origin') || env.SITE_ORIGIN

		if (req.method === 'OPTIONS') {
			return new Response(null, { status: 204, headers: corsHeaders(origin) })
		}

		if (url.pathname === '/api/book/request' && req.method === 'POST') {
			return handleRequest(req, env, origin)
		}
		if (url.pathname === '/api/book/download' && req.method === 'GET') {
			return handleDownload(req, env, origin)
		}
		if (url.pathname === '/' || url.pathname === '/healthz') {
			return new Response('contextscripture-book-gate is running', {
				status: 200,
				headers: corsHeaders(origin)
			})
		}
		return new Response('Not Found', { status: 404, headers: corsHeaders(origin) })
	}
} satisfies ExportedHandler<Env>
