// Google tracking
// - Google Site Verification: for Google Search Console
// - Google Analytics Measurement ID: for Google Analytics 4
// - Google Tag Manager ID: for Google Tag Manager (unused; prefer GA4 above)

export const googleSiteVerification = ''

// Paste your GA4 Measurement ID here (it looks like "G-XXXXXXXXXX").
// Find it in Google Analytics → Admin → Data Streams → your web stream.
// Leave as '' to disable analytics; the rest of the site is unaffected.
const HARDCODED_GA_ID = 'G-R83GT601E4'

export const googleAnalyticsMeasurementID =
	HARDCODED_GA_ID || import.meta.env.PUBLIC_GA_TRACKING_ID || ''

export const googleTagManagerID = ''
