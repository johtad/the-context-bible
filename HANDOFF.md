# Handoff document — Context Bible website

**Last updated:** 2026-06-03 (long content-generation session)
**Why this exists:** The previous Claude session hit Anthropic's content filter on its own outputs due to accumulated session context. Two theme articles are still pending. This document is everything the next session needs to finish the job cleanly.

---

## 1. Project at a glance

- **Repo:** `~/Desktop/context-bible-download/` → pushes to `github.com/johtad/the-context-bible` (branch: `main`).
- **Live site:** `https://contextscripture.org/` (HTTPS enforced, GitHub Pages, custom domain).
- **Tech stack:** Astro 6 + Tailwind, deploys via `.github/workflows/deploy.yml` on push to `main`.
- **Analytics:** GA4 measurement ID `G-R83GT601E4`, wired in `src/config/analytics.ts`. Search Console verified (token in same file).
- **Companion app code:** `~/Downloads/bible-app/` — the actual mobile app (Capacitor + Node/Express + OpenAI + Supabase + Firebase). Useful for feature accuracy.

## 2. Important files to know

| File | What it does |
|---|---|
| `src/pages/index.astro` | Homepage; imports HomeFAQ, Features, etc. |
| `src/pages/features.astro` | Full feature breakdown |
| `src/pages/faq.astro` | Full FAQ page |
| `src/pages/app.astro` | Device-detecting download redirect; fires GA4 `store_redirect` event |
| `src/pages/read.astro` | Embeds `bible-app-3.onrender.com` in an iframe for desktop readers |
| `src/pages/llms.txt.ts` and `src/pages/llms-full.txt.ts` | Markdown content inventories for AI crawlers |
| `src/pages/robots.txt.ts` | Explicit Allow for 18 AI crawlers |
| `src/components/scripts/SchemaOrg.astro` | Site-wide JSON-LD (Organization, WebSite, MobileApplication × 2) |
| `src/components/scripts/SchemaFAQ.astro` | FAQPage JSON-LD; takes `items={[{q, a}]}` |
| `src/components/scripts/SchemaBreadcrumb.astro` | BreadcrumbList JSON-LD |
| `src/components/scripts/SchemaArticle.astro` | Article + Person JSON-LD for blog posts |
| `src/data/json-files/featuresData.json` | Feature card data (homepage + /features) |
| `src/data/json-files/faqData.json` | FAQ data (12 product Q&As) |
| `src/data/homeFaqs.ts` | 10 apologetic Q&As for homepage |
| `src/content/blog/*.md` | All blog posts (cornerstones, devotionals, Q&As, word studies, themes) |
| `src/layouts/PostLayout.astro` | Blog post wrapper; emits Article + Person + Breadcrumb schema |
| `src/config/analytics.ts` | GA4 ID + Search Console token |
| `src/config/navigationBar.ts` | Top nav |
| `src/config/footerNavigation.ts` | Footer |
| `UTM-LINKS.md` | Copy-paste UTM-tagged share links by platform |

## 3. Current blog post inventory (37 posts on disk)

### Cornerstones (10)
- `four-kinds-of-biblical-context.md`
- `kjv-niv-esv-nasb-comparison.md`
- `berean-approach-bible-study.md`
- `how-to-read-pauls-letters.md`
- `catholic-public-domain-version-vs-vulgate.md`
- `orthodox-jewish-bible-explained.md`
- `what-did-pharisee-actually-mean.md`
- `good-vs-bad-bible-scholarship.md`
- `best-free-bible-apps-for-context.md`
- `bible-study-with-kids-context.md`

### Devotionals (16) — from `~/Downloads/bible-app/data/daily-devotionals/`
- `the-shepherds-who-welcomed-the-lamb.md`
- `the-pressing-place.md`
- `words-that-build-a-home.md`
- `taking-off-the-old-garment.md`
- `the-other-cheek.md`
- `god-in-the-quiet.md`
- `holiness-without-a-name-tag.md`
- `when-scripture-repeats-itself.md`
- `what-are-you-carrying.md`
- `leave-the-edges.md`
- `leaving-the-booth.md`
- `baskets-after-serving.md`
- `build-what-is-in-front-of-you.md`
- `marked-by-love.md`
- `a-white-stone-and-a-new-name.md`
- `the-shepherd-in-the-doorway.md`

### "Why did Jesus...?" Q&A series (17)
- `why-did-jesus-write-on-the-ground.md`
- `why-did-jesus-cast-demons-into-pigs.md`
- `why-did-jesus-weep.md`
- `why-did-jesus-turn-over-the-tables.md`
- `why-did-jesus-wash-disciples-feet.md`
- `why-did-jesus-call-peter-satan.md`
- `why-did-jesus-heal-on-the-sabbath.md`
- `why-did-jesus-speak-in-parables.md`
- `why-did-jesus-die-on-the-cross.md`
- `why-did-jesus-get-baptized.md`
- `why-did-jesus-pray.md`
- `why-did-jesus-walk-on-water.md`
- `why-did-jesus-curse-the-fig-tree.md`
- `why-did-jesus-rise-on-the-third-day.md`
- `why-did-jesus-appear-to-mary-magdalene.md`
- `why-did-jesus-eat-with-sinners.md`
- `why-did-jesus-calm-the-storm.md`

### Hebrew/Greek word study series (9)
- `what-does-amen-mean-in-hebrew.md`
- `what-does-hallelujah-mean-in-hebrew.md`
- `what-does-hosanna-mean.md`
- `what-does-selah-mean.md`
- `what-does-shalom-mean-in-hebrew.md`
- `what-does-abba-mean.md`
- `what-does-logos-mean-in-greek.md`
- `what-does-agape-mean-in-greek.md`
- `what-does-maranatha-mean.md`

### Theme articles (2 of 4 done)
- `what-does-the-bible-say-about-anxiety.md` ✅
- `what-does-the-bible-say-about-forgiveness.md` ✅
- **`what-does-the-bible-say-about-prayer.md`** ❌ PENDING
- **`what-does-the-bible-say-about-hope.md`** ❌ PENDING

### Plus the original welcome post (1)
- `welcome-to-the-context-bible.md`

## 4. Pending work: 2 theme articles

The next session needs to write these two files. Match the structure of the existing theme articles. Here are the structural and stylistic rules.

### File location
`src/content/blog/what-does-the-bible-say-about-prayer.md`
`src/content/blog/what-does-the-bible-say-about-hope.md`

### Frontmatter template (copy from existing files)
```yaml
---
title: 'What does the Bible say about [topic]?'
pubDate: 2026-06-03T17:30:00Z   # use a different time per post
description: 'One sentence ≤300 chars summarizing the article angle.'
author: 'The Context Bible team'
image: '/app-icon.png'
tags: ['theme', '[topic]', 'related-tag', 'context']
---
```

### Body structure (mirror anxiety + forgiveness articles)

1. **Front-loaded direct answer** (first 50–80 words, NO heading) that summarizes what the Bible says about the topic. Bold the key terms. This is the AI-extraction paragraph.
2. **One pastoral lead-in sentence** transitioning to the article.
3. **H2 sections** that each handle one move:
   - "What is [topic] in Scripture" (vocabulary, key terms in Hebrew/Greek, a few defining verses)
   - One or two H2s on what the main passages say (e.g., "Jesus on prayer", "Paul on prayer")
   - "What [topic] is *not*" — clarify common misconceptions
   - "A pattern: how to begin" — concrete, numbered, practical steps
   - "What this teaches us" — pastoral application, gentle, no "stop X" language
   - "Reading these passages in context" — close with the standard internal-link paragraph (see below)
4. **Closing scripture epigraph** — italicized KJV quotation, attributed to BibleGateway link.

### Length
**~1800–2200 words.** Anxiety article is 2,020 words; forgiveness is 2,100. Match.

### Voice rules (from the user's spreadsheet at `~/Downloads/bible-app/Devotional/Devotional.xlsx` Sheet2)
- No definitive statements that invite pushback (avoid "you don't break the third commandment when you…").
- Pastoral tone throughout.
- No argumentative conclusions.
- No accusatory comments like "most people think Jesus was saying X but He was rather saying Y."
- Don't advertise the app in the body of the article (only the closing block does that).
- No strong "stop doing this" statements. Appeal pastorally instead.
- Always include a clear life application by the end.

### Citation pattern
- Use the KJV throughout.
- Link every scripture reference to BibleGateway like this:
  `[Psalm 119:130 KJV](https://www.biblegateway.com/passage/?search=Psalm%20119%3A130&version=KJV)`
- Include the underlying Hebrew/Greek where it adds meaning (e.g., for prayer: *proseuchomai*, *deēsis*, *entychanō*, *eucharistia* — the four words used in Philippians 4:6).

### Internal links to include (use 4–8 per article)
- Linking to `/` is the brand name; use `[The Context Bible](/)`.
- Linking to `/app` for download.
- Linking to `/read` for the browser reader.
- Linking to companion theme articles like `[our piece on the Berean approach](/blog/berean-approach-bible-study/)`.

### Standard closing paragraph template
Use this near the end (slightly customize per topic):
> For more on the Bible's teaching on [topic] — the historical settings of [key passages], the early church's reading of these texts, the Greek and Hebrew behind [key terms], and the cross-references between [related passages], [The Context Bible](/) opens up five lenses on every verse. The app's Theme Explain feature surfaces verses on [topic1], [topic2], and [topic3]. [Open it in your browser](/read) or [download free](/app).

### Specific guidance for the two articles

**Prayer article topics to cover:**
- Vocabulary: *tephillah* (Hebrew); *proseuchē*, *deēsis*, *entychanō*, *eucharistia* (Greek)
- The Lord's Prayer (Matthew 6:9–13)
- Jesus' own prayer practice (refer to existing post on `/blog/why-did-jesus-pray/`)
- Paul on prayer (Philippians 4:6–7, 1 Thessalonians 5:17, Ephesians 6:18)
- The Psalms as the prayer book of Israel
- What prayer is NOT (transactional, performative, only for emergencies)
- Practical pattern: ACTS (Adoration, Confession, Thanksgiving, Supplication) — or similar
- Anchor verse: Philippians 4:6 or Matthew 6:9

**Hope article topics to cover:**
- Vocabulary: *tiqvah* and *yachal* (Hebrew); *elpis* (Greek) — biblical hope is confident expectation, not wishful thinking
- The hope of Israel (the prophetic tradition, Lamentations 3:21–23)
- Christian hope grounded in the resurrection (1 Peter 1:3–4, 1 Corinthians 15)
- Hope vs. optimism — the distinction matters
- The hope of glory (Romans 5, Colossians 1:27)
- Hope in suffering (Romans 5:3–5, Romans 8:18–25)
- What hope is NOT (denial, naïveté, mere positive thinking)
- Anchor verse: 1 Peter 1:3 or Romans 15:13

## 5. After writing the two articles

1. `cd ~/Desktop/context-bible-download && npm run build` to confirm both compile cleanly.
2. `git add -A && git commit -m "..."` with a clear message.
3. `git push` — GitHub Actions auto-deploys to GitHub Pages.
4. Watch with `gh run watch <latest-id> --repo johtad/the-context-bible --interval 15 --exit-status` until success.
5. Spot-check live: `curl -s -o /dev/null -w "%{http_code}\n" https://contextscripture.org/blog/what-does-the-bible-say-about-prayer/`

## 6. What's still on the broader SEO roadmap (lower priority)

These are listed in earlier planning but not yet started. None are blocking.

### Code work
- **Phase 1.4 — Per-page OG images** (1200×630 social cards generated per page).
- **Phase 1.5 — GA4 audiences for AI-source traffic** (`utm_source=chatgpt.com`, etc.) — user-side admin click.
- **Blog index UI improvement** — separate devotionals from topical articles, add "Browse by topic" section on homepage.

### Content
- More "Why did Jesus...?" articles (the search universe is in the hundreds — we have 17).
- More word study articles (we have 9 — could do 30+).
- More theme articles (we have 4 — could do 10+ on hope, joy, love, grief, marriage, money, anger, pride, humility, etc.).
- A "Bible verses about X" series (high search volume, pairs with theme articles).

### Off-site (user's work)
- Submit to Christian app directories (Faithlife, Crosswalk, Christian Web Trust).
- Engage on Reddit (r/AcademicBiblical, r/Christianity).
- Pitch to Christian publications.
- App Store Optimization audit on the live store listings.

## 7. Known issues / context

- **GA4 `store_redirect` "Mark as key event"** is still pending — the event has to surface in GA4 Admin → Events (offline processor, 1–2h after first hit) before it can be starred. Was firing per Realtime as of last check; can be done in a brief browser-driven session via the Claude in Chrome extension.
- **A spawned background task chip exists** from earlier in the project to remove a leftover Foxi sales popup (`src/components/ui/Toast.astro`). It's hidden by default but is still in the codebase. Low priority.
- **The companion app** at `~/Downloads/bible-app/` is actively under development. Translations are expanding (current website copy says "29" — verify against `~/Downloads/bible-app/server.js` `listTranslations()` function before any new content claims a specific number).
- **The user's voice rules** are at `~/Downloads/bible-app/Devotional/Devotional.xlsx` Sheet2. Read those before writing any new pastoral content.

## 8. Quick sanity-check commands

```bash
cd ~/Desktop/context-bible-download

# Build locally
npm run build

# Word count of any post
wc -w src/content/blog/what-does-the-bible-say-about-anxiety.md

# Count current posts
ls src/content/blog/ | wc -l

# Check live deploy status
gh run list --repo johtad/the-context-bible --limit 1
```

---

**End of handoff.** Good luck. Keep the voice pastoral. Honor the user's spreadsheet rules. Build, push, verify — same loop every time.
