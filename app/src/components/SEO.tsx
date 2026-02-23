/**
 * SEO Component — uses React 19's native <head> tag hoisting
 * React 19 automatically moves <title>, <meta>, <link> to <head>
 * No external library needed.
 */

interface SEOProps {
  title: string
  description: string
  canonical?: string
  type?: 'website' | 'article'
  image?: string
  imageAlt?: string
  datePublished?: string
  dateModified?: string
  author?: string
  schema?: object
}

const SITE_NAME = 'Sleep Smarter'
const SITE_URL = 'https://sleepsmarter.io'
const DEFAULT_IMAGE = `${SITE_URL}/og-default.png`

export default function SEO({
  title,
  description,
  canonical,
  type = 'website',
  image,
  imageAlt,
  datePublished,
  dateModified,
  author = 'Sleep Smarter Editorial Team',
  schema,
}: SEOProps) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : undefined
  const ogImage = image
    ? image.startsWith('http') ? image : `${SITE_URL}${image}`
    : DEFAULT_IMAGE

  const articleSchema = type === 'article' && datePublished ? {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image: ogImage,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author,
      url: `${SITE_URL}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  } : null

  const websiteSchema = type === 'website' ? {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description,
  } : null

  const activeSchema = schema || articleSchema || websiteSchema

  // React 19 natively hoists these tags to <head>
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type === 'article' ? 'article' : 'website'} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={ogImage} />
      {imageAlt && <meta property="og:image:alt" content={imageAlt} />}
      <meta property="og:site_name" content={SITE_NAME} />

      {type === 'article' && datePublished && (
        <meta property="article:published_time" content={datePublished} />
      )}
      {type === 'article' && (dateModified || datePublished) && (
        <meta property="article:modified_time" content={dateModified || datePublished} />
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Schema.org JSON-LD */}
      {activeSchema && (
        <script type="application/ld+json">
          {JSON.stringify(activeSchema)}
        </script>
      )}
    </>
  )
}
