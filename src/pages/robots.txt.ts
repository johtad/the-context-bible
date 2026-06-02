import type { APIRoute } from 'astro'

// robots.txt — explicit allow for traditional search crawlers AND every major
// AI crawler. The default User-agent: * Allow: / already permits these by
// omission, but listing them by name has two benefits:
//
//   1. Some AI bots treat the absence of an explicit rule as ambiguous; an
//      explicit Allow: / is the unambiguous green light.
//   2. It documents intent — anyone auditing the file can see which AI
//      systems we welcome.
//
// References:
// - https://platform.openai.com/docs/gptbot
// - https://docs.anthropic.com/en/docs/build-with-claude/claude-web-search
// - https://docs.perplexity.ai/guides/bots
// - https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers
// - https://support.apple.com/en-us/119829 (Applebot-Extended)

const aiCrawlers = [
	'GPTBot', // OpenAI training + ChatGPT browse
	'OAI-SearchBot', // OpenAI ChatGPT Search
	'ChatGPT-User', // ChatGPT user-triggered fetches
	'ClaudeBot', // Anthropic training
	'Claude-Web', // Anthropic user-triggered
	'anthropic-ai', // older Anthropic UA, harmless to keep
	'PerplexityBot', // Perplexity background
	'Perplexity-User', // Perplexity user-triggered
	'Google-Extended', // Google AI / Bard / Gemini opt-in
	'Applebot-Extended', // Apple Intelligence opt-in
	'CCBot', // Common Crawl (training data for many LLMs)
	'Bytespider', // ByteDance / Doubao
	'Amazonbot', // Amazon Alexa / Nova
	'cohere-ai', // Cohere
	'Diffbot', // Diffbot (used by many LLM pipelines)
	'FacebookBot', // Meta AI
	'meta-externalagent', // Meta AI agent
	'Mistral-AI-User' // Mistral
]

const siteOrigin = import.meta.env.SITE || 'https://contextscripture.org'
const sitemapUrl = new URL('sitemap-index.xml', siteOrigin).href
const llmsTxtUrl = new URL('llms.txt', siteOrigin).href

const lines: string[] = [
	'# The Context Bible — robots.txt',
	'# We welcome AI training and search crawlers. See /llms.txt for an indexed inventory.',
	'',
	'User-agent: *',
	'Allow: /',
	''
]

for (const bot of aiCrawlers) {
	lines.push(`User-agent: ${bot}`)
	lines.push('Allow: /')
	lines.push('')
}

lines.push(`Sitemap: ${sitemapUrl}`)
lines.push(`# LLM-friendly content inventory: ${llmsTxtUrl}`)

const robotsTxt = lines.join('\n').trim() + '\n'

export const GET: APIRoute = () => {
	return new Response(robotsTxt, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	})
}
