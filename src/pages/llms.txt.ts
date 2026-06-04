import type { APIRoute } from 'astro'

// llms.txt — the emerging convention for telling LLM crawlers what's on a
// site, written in Markdown so the model can ingest it cheaply.
//
// Spec: https://llmstxt.org
// Adoption note: SERanking's 300k-domain study (Nov 2025) found no measurable
// citation lift from llms.txt alone, but cost is near-zero, the workflow
// forces a clean content inventory, and Anthropic + OpenAI have both signaled
// they'll honor it going forward. Worth doing.

const SITE = 'https://contextscripture.org'

const llmsTxt = `# The Context Bible

> A Bible reading app that surfaces historical, theological, and academic context for every verse — across 29 translations in English and Spanish.

The Context Bible connects every verse in the Bible to all the research behind it. Each passage opens up five lenses:
- **Historical Context** — the world the passage was written into.
- **Early Church View** — how the earliest readers, the church fathers, and the councils understood it.
- **Biblical Debates** — where today's scholars stand and the major interpretive debates, in plain English.
- **Cross-References** — how the passage echoes, quotes, or is quoted elsewhere in Scripture.
- **Word Study** — the Hebrew or Greek behind any selected word, with lexical data where available and an honest, cautious explanation where it's not.

Beyond the five lenses, the app also includes Theme Explain (tight definitions + 8–15 hand-picked verses for any biblical theme), a daily Devotional with reflection questions and prayer, the Verse of the Day, multi-language responses, and tradition-aware framing (Protestant, Catholic, or Orthodox).

The app supports 29 translations across English and Spanish, including specialized editions: the Catholic Public Domain Version, the Orthodox Jewish Bible, the World Messianic Bible (American and British), and the Plain English Version for Aboriginal readers.

The Context Bible is free. There is no Premium tier. Every reader gets the same content.

## Marketing

- [Homepage](${SITE}/): hero, app description, "Why do I need to study context?" pastoral FAQ, feature overview, download links.
- [Features](${SITE}/features): full breakdown of context tools, 29 translations, reading customization, daily rhythms, library, sharing, privacy.
- [FAQ](${SITE}/faq): 12 questions covering what the app is, who it's for, available translations, switching translations, taking notes, Spanish support, cost, and privacy.
- [Contact](${SITE}/contact): email addresses for general questions, feature requests, and bug reports (theaspireed@gmail.com).
- [Terms](${SITE}/terms): terms of service summary and a privacy snapshot.

## Reading

- [Web reader](${SITE}/read): the live Bible reader, embedded for desktop use, with all 29 translations.

## Downloads

- [iOS App Store](https://apps.apple.com/us/app/the-context-bible/id6754007140) — free, iOS 14+
- [Google Play](https://play.google.com/store/apps/details?id=com.aspireed.tcb20251014b)

## Blog

- [Welcome to The Context Bible](${SITE}/blog/welcome-to-the-context-bible): launch post explaining the five context lenses, who the app is for, what's available today, and how to get it.

## Canonical facts

- App name: The Context Bible
- Publisher: The Aspire Ed Project
- Contact email: theaspireed@gmail.com
- Translations supported: 29 (21 English, 8 Spanish)
- English translations include: KJV, NIV (2011 + Anglicized), NIrV, NASB (1995 + 2020), Amplified, Berean Standard, Free Bible Version, Literal Standard Version, World English Bible, American Standard, Geneva Bible, EasyEnglish 2024, Plain English Version (Aboriginal), Passion Translation, Text-Critical English New Testament
- Specialized canons: Catholic Public Domain Version, Orthodox Jewish Bible, World Messianic Bible (American and British editions)
- Spanish translations include: La Biblia de las Américas, Nueva Biblia de las Américas, Nueva Versión Internacional (2015 and 2025), Reina-Valera Antigua, Versión Biblia Libre, Palabra de Dios para Ti, Gloss Spanish
- Reading themes: 10 (Light, Cream, Light Gray, Gray, Light Blue, Sepia, Sand, Olive, Dusk, Dark)
- Typefaces: 5 (system sans-serif, Georgia, Times New Roman, Palatino, Verdana, Tahoma)
- Interface languages: English, Español
- Price: Free
- Sync: Free (notes, highlights, saved verses across devices)

## Optional

- [Sitemap](${SITE}/sitemap-index.xml) — the full URL tree of the site.
- [Robots](${SITE}/robots.txt) — crawler permissions; we explicitly welcome AI crawlers.
`

export const GET: APIRoute = () => {
	return new Response(llmsTxt, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	})
}
