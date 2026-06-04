import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const blog = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
	schema: () =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.date(),
			updatedDate: z.date().optional(),
			image: z.string(),
			author: z.string(),
			tags: z.array(z.string()),
			// Optional per-article FAQPage JSON-LD. Each Q&A is rendered as a
			// Question/Answer pair for AI engines to extract.
			faqs: z
				.array(
					z.object({
						q: z.string(),
						a: z.string()
					})
				)
				.optional(),
			// Optional HowTo JSON-LD for instructional posts.
			howto: z
				.object({
					name: z.string(),
					description: z.string().optional(),
					totalTime: z.string().optional(),
					steps: z.array(
						z.object({
							name: z.string(),
							text: z.string()
						})
					)
				})
				.optional()
		})
})

export const collections = {
	blog
}
