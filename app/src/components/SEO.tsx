import { Helmet } from 'react-helmet-async'

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

  // Build Article schema for blog posts
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
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.ico`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  } : null

  // Website schema for homepage
  const websiteSchema = type === 'website' ? {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/blog?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  } : null

  const activeSchema = schema || articleSchema || websiteSchema

  return (
    <Helmet>
      {/* Core */}
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

      {/* Article-specific OG */}
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
    </Helmet>
  )
}
