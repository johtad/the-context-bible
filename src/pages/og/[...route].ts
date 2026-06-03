import { OGImageRoute } from 'astro-og-canvas'
import { getCollection } from 'astro:content'

type PageEntry = {
	title: string
	description: string
}

const staticPages: Record<string, PageEntry> = {
	index: {
		title: 'The Context Bible',
		description: 'Scripture in its original literary, historical, and cultural context.'
	},
	features: {
		title: 'Features — The Context Bible',
		description:
			'Five context lenses on every verse, a daily devotional, 29 translations across English and Spanish, and a reading experience built for long sessions.'
	},
	faq: {
		title: 'Frequently asked questions — The Context Bible',
		description:
			'Answers about translations, context, devotionals, privacy, pricing, and how the app works.'
	},
	app: {
		title: 'Download The Context Bible',
		description: 'Free on iOS and Android. No tiers, no upsell.'
	},
	read: {
		title: 'Read the Bible — The Context Bible',
		description: 'Read Scripture with context, in any of 29 translations, right in your browser.'
	},
	newsletter: {
		title: 'Daily devotional newsletter',
		description:
			'A short, contextual reflection on Scripture in your inbox each morning. Free. Unsubscribe any time.'
	},
	contact: {
		title: 'Contact — The Context Bible',
		description: 'Reach the team behind The Context Bible.'
	},
	terms: {
		title: 'Terms of service — The Context Bible',
		description: 'Terms governing use of The Context Bible.'
	},
	blog: {
		title: 'The Context Blog',
		description:
			'Notes on Scripture in context, study guides, Q&As, word studies, and devotionals.'
	}
}

const posts = await getCollection('blog')
const postPages: Record<string, PageEntry> = Object.fromEntries(
	posts.map((post) => [
		`blog/${post.id}`,
		{
			title: String(post.data.title),
			description: String(post.data.description ?? '')
		}
	])
)

const pages: Record<string, PageEntry> = {
	...staticPages,
	...postPages
}

export const { getStaticPaths, GET } = await OGImageRoute({
	pages,
	param: 'route',
	getImageOptions: (_path, page: PageEntry) => ({
		title: page.title,
		description: page.description,
		bgGradient: [
			[15, 23, 42],
			[31, 41, 55]
		],
		border: { color: [31, 168, 192], width: 14, side: 'inline-start' },
		padding: 80,
		font: {
			title: {
				size: 64,
				color: [255, 255, 255],
				weight: 'Bold',
				lineHeight: 1.15,
				families: ['Inter', 'Helvetica', 'sans-serif']
			},
			description: {
				size: 28,
				color: [212, 212, 212],
				lineHeight: 1.4,
				families: ['Inter', 'Helvetica', 'sans-serif']
			}
		}
	})
})
