// Config
// ------------
// Description: The configuration file for the website.

export interface Logo {
	src: string
	alt: string
}

export type Mode = 'auto' | 'light' | 'dark'

export interface Config {
	siteTitle: string
	siteDescription: string
	ogImage: string
	logo: Logo
	canonical: boolean
	noindex: boolean
	mode: Mode
	scrollAnimations: boolean
}

export const configData: Config = {
	siteTitle: 'The Context Bible',
	siteDescription:
		'Read Scripture in its original literary, historical, and cultural context.',
	ogImage: '/og.jpg',
	logo: {
		src: '/logo.svg',
		alt: 'The Context Bible'
	},
	canonical: true,
	noindex: false,
	mode: 'auto',
	scrollAnimations: true
}
