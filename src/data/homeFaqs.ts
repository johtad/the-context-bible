// 10 apologetic Q&As that appear on the homepage's "Why do I need to study
// context?" panel. Pastoral framing, KJV citations, every answer under 500
// characters. Shared between HomeFAQ.astro (visual accordion) and
// index.astro (JSON-LD FAQPage schema), so both stay in lockstep.

export type HomeFAQ = { q: string; a: string; open?: boolean }

export const homeFaqs: HomeFAQ[] = [
	{
		q: "Isn't the Bible enough on its own? Why do I need historical context?",
		a: "Scripture is sufficient and authoritative — yet God gave it through real people, in real languages, to real cultures, in real moments. Knowing those settings doesn't add to the text; it helps us hear what's already there. Luke himself opens his Gospel by carefully gathering eyewitness accounts (Luke 1:1–4). Context is how he honored Scripture, not how he undermined it.",
		open: true
	},
	{
		q: "Doesn't 2 Timothy 3:16 mean Scripture is all I need?",
		a: "Yes — Scripture is enough to make us \"wise unto salvation\" (2 Tim 3:15). But sufficiency isn't the same as isolation. The same Paul, in the same letter, asks Timothy to bring \"the books, but especially the parchments\" (2 Tim 4:13). Sufficient Scripture, faithfully studied, has always meant Scripture read with care — including the care of knowing its world."
	},
	{
		q: "Won't outside sources corrupt my reading of the Bible?",
		a: "The Bereans were called \"more noble\" because they \"received the word with all readiness of mind, and searched the scriptures daily, whether those things were so\" (Acts 17:11). They didn't avoid investigation — they did it. \"Prove all things; hold fast that which is good\" (1 Thess 5:21). The answer to error is careful study, not closed eyes."
	},
	{
		q: "Isn't the Holy Spirit my only teacher?",
		a: "Yes, the Spirit teaches you (John 14:26) — and that same Spirit gave Christ to give teachers to His church \"for the perfecting of the saints\" (Eph 4:11–12). The Spirit who inspired the text also raises up scholars and pastors to help us read it. Welcoming their work is welcoming His gifts."
	},
	{
		q: "Doesn't Proverbs warn against adding to God's Word?",
		a: "\"Add thou not unto his words, lest he reprove thee, and thou be found a liar\" (Prov 30:6). Context never adds a word to Scripture — it helps us not subtract. When you learn what \"Pharisee\" meant in first-century Judea, you aren't editing Matthew. You're hearing Matthew with the ears his first readers had."
	},
	{
		q: "Should I trust modern scholars over my pastor?",
		a: "Neither one alone. Scholars do the patient work of language and history; pastors shepherd souls through the text. Both serve the same Word. \"In the multitude of counsellors there is safety\" (Prov 11:14). The Context Bible isn't a replacement for either — it puts the background work pastors already rely on into your pocket."
	},
	{
		q: "Aren't the church fathers fallible? Why study their interpretations?",
		a: "They are — and they were the first to say so. But the earliest readers spoke the same languages, walked the same streets, and worshipped beside people who had walked with the apostles. Hearing them isn't bowing to them; it's refusing to read Scripture as if no one had ever read it before us. \"Where no counsel is, the people fall\" (Prov 11:14)."
	},
	{
		q: "Won't all this context distract from a simple, personal faith?",
		a: "Loving God \"with all thy mind\" (Mark 12:30) is not the enemy of loving Him with all your heart. When Jesus answered the tempter, He quoted specific texts in their specific settings (Matt 4:1–11). Context isn't academic distance from the Word — it's intimacy with the Word the Lord chose to give you."
	},
	{
		q: "Is it OK to read what Catholic or Orthodox scholars say?",
		a: "The Bereans tested teaching against Scripture; they didn't refuse to listen (Acts 17:11). The earliest creeds, the canon of Scripture itself, and the languages we read it in came from a church that wasn't yet divided. Reading what brothers and sisters in other traditions see in a passage doesn't compromise yours — it widens the company of witnesses."
	},
	{
		q: "If God wanted me to know the context, wouldn't He have put it in the text?",
		a: "He often did — Luke names rulers, John names places, Paul names cities, prophets name kings. The Bible is full of historical anchors precisely because the gospel happened in time and space, not abstractly. Studying that world is taking those anchors seriously. \"The earth is the Lord's, and the fulness thereof\" (Ps 24:1) — including the history He set His Word inside."
	}
]
