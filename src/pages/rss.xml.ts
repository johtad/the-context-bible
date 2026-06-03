import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import type { APIContext } from 'astro'

export async function GET(context: APIContext) {
	const posts = await getCollection('blog')
	const sorted = posts.sort(
		(a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
	)

	return rss({
		title: 'The Context Bible — Blog',
		description:
			'Notes on Scripture in context, study guides, Q&As, word studies, and devotionals from The Context Bible team.',
		site: context.site ?? 'https://contextscripture.org',
		items: sorted.map((post) => ({
			title: String(post.data.title),
			description: String(post.data.description ?? ''),
			pubDate: new Date(post.data.pubDate),
			link: `/blog/${post.id}/`,
			author: post.data.author ? `noreply@contextscripture.org (${post.data.author})` : undefined,
			categories: Array.isArray(post.data.tags) ? post.data.tags : undefined
		})),
		customData: '<language>en-us</language>'
	})
}
