# contextscripture-book-gate

A small Cloudflare Worker that gates the `Context Matters` PDF behind an email
submission, then emails a time-limited download link.

```
/api/book/request    POST  { email, name? }   → 200 { ok, status: "sent" }
/api/book/download   GET   ?token=…           → 200 application/pdf
```

The PDF is bundled into the Worker (`assets/context-matters.pdf`). It is not
served from the static site. The only way to get the file is to go through
the email gate.

Emails are persisted in a KV namespace (`BOOK_EMAILS`) keyed by the lowercased
email, with `first_seen`, `last_seen`, and `request_count` — enough for future
outreach without standing up a database.

## One-time setup

### 1. Cloudflare account + wrangler

```sh
npm install -g wrangler   # or use npx wrangler in commands below
cd worker
npm install
wrangler login
```

### 2. Create the KV namespace

```sh
wrangler kv:namespace create BOOK_EMAILS
```

Wrangler prints something like:

```
[[kv_namespaces]]
binding = "BOOK_EMAILS"
id = "abc123…"
```

Copy the `id` and paste it into `wrangler.toml`, replacing
`REPLACE_WITH_KV_NAMESPACE_ID`.

### 3. Resend account (for sending email)

1. Sign up at https://resend.com (free tier: 100/day, 3000/month).
2. Add and verify the `contextscripture.org` domain. Resend gives you DNS
   records (SPF, DKIM) to paste into your domain registrar.
3. Create an API key (Resend → API Keys → Create).

### 4. Worker secrets

```sh
wrangler secret put RESEND_API_KEY        # paste the Resend API key
wrangler secret put TOKEN_SECRET          # paste a random string from `openssl rand -hex 32`
```

`TOKEN_SECRET` signs the download links. Don't change it after launch unless
you're OK with already-sent links breaking.

### 5. Deploy

```sh
wrangler deploy
```

Wrangler prints the URL. By default it's something like
`https://contextscripture-book-gate.<account>.workers.dev`. Optionally bind
a custom subdomain (e.g. `book-gate.contextscripture.org`) in the Cloudflare
dashboard under Workers & Pages → your worker → Triggers.

### 6. Wire the frontend

Open `src/pages/book.astro` and `src/pages/book/download.astro` in the Astro
project and set `WORKER_URL` to the deployed URL.

## Local development

```sh
cd worker
wrangler dev
```

The Worker runs locally at `http://localhost:8787`. You can POST to
`/api/book/request` and the email goes out via Resend (so use a test email).

## Looking at collected emails

```sh
wrangler kv:key list --namespace-id <KV_NAMESPACE_ID>
wrangler kv:key get --namespace-id <KV_NAMESPACE_ID> "person@example.com"
```

Or in the Cloudflare dashboard: Workers KV → BOOK_EMAILS → browse.
