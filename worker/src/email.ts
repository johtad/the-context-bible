// Sends the email-gated download link via Resend (resend.com).

function esc(s: string): string {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;')
}

export async function sendDownloadLink(opts: {
	to: string
	downloadUrl: string
	fromEmail: string
	resendApiKey: string
}): Promise<{ ok: true } | { ok: false; error: string }> {
	const { to, downloadUrl, fromEmail, resendApiKey } = opts
	const subject = 'Your free book — Context Matters'
	const preheader = 'Tap the button to download the PDF.'
	const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>${esc(subject)}</title>
<style>
  body{margin:0;background:#faf6ef;font-family:Georgia,serif;color:#2c2c2c;}
  .wrap{max-width:560px;margin:0 auto;padding:40px 24px;}
  h1{font-family:Georgia,serif;font-size:24px;color:#1f2a44;margin:0 0 16px;}
  p{line-height:1.6;margin:0 0 16px;}
  .cta{display:inline-block;background:#1f2a44;color:#fbf7ee;text-decoration:none;padding:14px 22px;border-radius:8px;font-weight:600;}
  .muted{color:#6b6452;font-size:13px;}
  a{color:#c8962f;}
</style></head>
<body>
<span style="display:none;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">${esc(preheader)}</span>
<div class="wrap">
  <h1>Here's your book</h1>
  <p>Thanks for requesting <em>Context Matters</em>. Tap the button below to download the PDF (~46 pages):</p>
  <p><a class="cta" href="${esc(downloadUrl)}">Download the book</a></p>
  <p class="muted">If the button doesn't work, paste this link into your browser:<br><a href="${esc(downloadUrl)}">${esc(downloadUrl)}</a></p>
  <p class="muted">The link is good for 7 days. If it expires, you can request a fresh one from <a href="https://contextscripture.org/book">contextscripture.org/book</a>.</p>
  <p style="margin-top:32px;">Grace and peace,<br><strong>The Context Bible team</strong></p>
</div>
</body></html>`
	const text = [
		`Thanks for requesting Context Matters. Tap this link to download the PDF (good for 7 days):`,
		``,
		downloadUrl,
		``,
		`If it expires, you can request a fresh one from https://contextscripture.org/book`,
		``,
		`Grace and peace,`,
		`The Context Bible team`
	].join('\n')

	try {
		const res = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${resendApiKey}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				from: fromEmail,
				to,
				subject,
				html,
				text
			})
		})
		if (!res.ok) {
			const body = await res.text().catch(() => '')
			return { ok: false, error: `Resend ${res.status}: ${body.slice(0, 200)}` }
		}
		return { ok: true }
	} catch (err) {
		return { ok: false, error: `Network error: ${(err as Error).message}` }
	}
}
