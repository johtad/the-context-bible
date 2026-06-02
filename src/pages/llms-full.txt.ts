import type { APIRoute } from 'astro'
import faqData from '../data/json-files/faqData.json'
import featuresData from '../data/json-files/featuresData.json'
import { homeFaqs } from '../data/homeFaqs'

// llms-full.txt — the long-form, single-document version of the site for
// LLMs that prefer one-shot context loading. Renders the canonical facts,
// features, all FAQs, and the homepage's apologetic Q&As as a single
// Markdown document.

const SITE = 'https://contextscripture.org'

const featuresByCategory: Record<string, typeof featuresData> = {}
for (const f of featuresData) {
	const cat = f.category || 'Other'
	if (!featuresByCategory[cat]) featuresByCategory[cat] = [] as typeof featuresData
	featuresByCategory[cat].push(f)
}

const featuresMarkdown = Object.entries(featuresByCategory)
	.map(
		([cat, feats]) =>
			`### ${cat}\n\n` +
			feats.map((f) => `- **${f.title}** — ${f.description}`).join('\n')
	)
	.join('\n\n')

const faqMarkdown = faqData
	.map((q) => `### ${q.question}\n\n${q.reply}`)
	.join('\n\n')

const homeFaqMarkdown = homeFaqs
	.map((q) => `### ${q.q}\n\n${q.a}`)
	.join('\n\n')

const llmsFullTxt = `# The Context Bible — full content reference

> A Bible reading app that surfaces historical, theological, and academic context for every verse — across 29 translations in English and Spanish. Free, no tiers, no upsell.

Source of truth: ${SITE}

## About

The Context Bible connects every verse in the Bible to the research behind it. The app opens up five lenses for every passage:

- **Historical Context** — who was writing, who they were writing to, and the world they shared.
- **Early Church View** — how the earliest readers, the church fathers, and the councils understood the passage.
- **Biblical Debates** — where today's scholars stand, the major interpretive debates, the textual questions, in plain English.
- **Cross-References** — how the passage echoes, quotes, or is quoted by the rest of Scripture.
- **Word Study** — original-language (Hebrew or Greek) study of any selected word, with lexical data when available and a careful AI-assisted explanation when not.

Beyond the five lenses, the app also includes Theme Explain (tight definitions + how a theme threads through Scripture + 8–15 hand-picked verses for any biblical theme), a full Daily Devotional with reflection questions, prayer, group study guide and sources, the Verse of the Day with comment/like/share community features, multi-language responses (answers in your interface language), and tradition-aware framing (Protestant, Catholic, or Orthodox).

The app is published by **The Aspire Ed Project**.
Contact: theaspireed@gmail.com

## Translations supported

The app currently includes **29 translations** across English and Spanish.

### English (21)

KJV (King James Version), ASV (American Standard Version), CPDV (Catholic Public Domain Version), NASB95 (New American Standard Bible 1995), NIrV (New International Reader's Version 2014), NIV (New International Version 2011), NIVUK (New International Version Anglicized 2011), TOJB2011 (The Orthodox Jewish Bible), WMBBE (World Messianic Bible British Edition), WMB (World Messianic Bible), AMP (Amplified Bible), FBV (Free Bible Version), EASY (EasyEnglish Bible 2024), GNV (Geneva Bible), PEV (Plain English Version, Aboriginal), LSV (Literal Standard Version), NASB20 (New American Standard Bible 2020), BSB (Berean Standard Bible), TCENT (The Text-Critical English New Testament), WEBUS (World English Bible, American English Edition), TPT (The Passion Translation).

### Spanish (8)

LBLA (La Biblia de las Américas), NBLA (Nueva Biblia de las Américas), NVI-S (Nueva Versión Internacional 2025), RVES (Reina-Valera Antigua), NVI-S (Nueva Versión Internacional 2015), VBL (Versión Biblia Libre), PDDPT (Palabra de Dios para Ti), GlossSP (Gloss Spanish).

### Specialized editions

- Catholic Public Domain Version (CPDV)
- The Orthodox Jewish Bible (TOJB)
- World Messianic Bible — American and British editions
- Plain English Version for Aboriginal readers (PEV)
- EasyEnglish Bible 2024 — for accessibility
- The Passion Translation (TPT)
- Geneva Bible — historical Protestant edition
- Berean Standard Bible — modern public-domain study Bible

## Features

${featuresMarkdown}

## Reading customization

- **10 themes**: Light, Cream, Light Gray, Gray, Light Blue, Sepia, Sand, Olive, Dusk, Dark.
- **5 typefaces**: system sans-serif, Georgia, Times New Roman, Palatino, Verdana, Tahoma.
- Adjustable font size and line spacing.
- Interface available in English and Español.

## Daily and weekly rhythms

- **Verse of the Day** — a daily verse delivered by push notification or email, with the context that makes it land.
- **Weekly Context Insights** — a themed deep-dive each week, on the day of your choice.
- Both customizable: choose delivery channel (push, email, or both) and frequency.

## Personal library

- Save verses with one tap.
- Highlight passages and attach notes.
- Copy any verse for pasting into a message, sermon, or note.
- Notes, highlights, and saved verses sync across every device you sign in on — at no cost.

## Sharing

- **Verse cards** — turn any verse into a shareable image.
- **Three aspect ratios**: 1:1 (Instagram feed), 3:4 (Stories), 16:9 (everything else).
- Adjustable plate opacity and background blur for personalization.
- Share to social, send in a message, or save to camera roll.

## Privacy

- We only use your name to personalize the experience.
- No ad targeting.
- No data resale.
- You can update or remove your name from your account at any time in Settings.
- Sign in with Google, Apple, or email.

## Cost

The Context Bible is **fully free**. Every reader gets the same content, the same 29 translations, the same context panels, the same notes and highlights, the same sync. There is no Premium tier and no upsell.

## Frequently asked questions

${faqMarkdown}

## Why context matters — answered from Scripture

A common concern from Bible readers is whether bringing historical context, scholarship, and the early church into their reading is theologically appropriate. Here are 10 honest questions, answered from Scripture itself.

${homeFaqMarkdown}

## Download

- **iOS App Store**: https://apps.apple.com/us/app/the-context-bible/id6754007140
- **Google Play**: https://play.google.com/store/apps/details?id=com.aspireed.tcb20251014b
- **Read in your browser** (desktop): ${SITE}/read
- **Universal share link** (auto-detects device): ${SITE}/app

## Site map

- ${SITE}/ — Homepage
- ${SITE}/features — Full feature breakdown
- ${SITE}/faq — Frequently asked questions
- ${SITE}/blog — Blog index
- ${SITE}/contact — Contact information
- ${SITE}/read — Embedded web reader
- ${SITE}/app — Device-detecting download link
- ${SITE}/terms — Terms of Service
`

export const GET: APIRoute = () => {
	return new Response(llmsFullTxt, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	})
}
