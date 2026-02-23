/**
 * SEO Component — uses React 19's native <head> tag hoisting
 * React 19 automatically moves <title>, <meta>, <link> to <head>
 * No external library needed.
 */

interface FAQ {
  question: string
  answer: string
}

interface BreadcrumbItem {
  name: string
  url: string
}

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
  faqs?: FAQ[]
  breadcrumbs?: BreadcrumbItem[]
  includeOrganization?: boolean
  softwareApp?: { name: string; description: string; url: string }
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
  faqs,
  breadcrumbs,
  includeOrganization = false,
  softwareApp,
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

  const organizationSchema = includeOrganization ? {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/favicon.ico`,
    },
    sameAs: [
      'https://twitter.com/sleepsmarter',
    ],
  } : null

  const softwareAppSchema = softwareApp ? {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: softwareApp.name,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web',
    url: softwareApp.url,
    description: softwareApp.description,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Bedtime calculator based on 90-minute sleep cycles',
      'Wake-up time calculator',
      'Personalized sleep assessment',
      'Sleep score and persona analysis',
      'Custom 7-day sleep protocol',
    ],
  } : null

  const faqSchema = faqs && faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null

  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  } : null

  // Combine multiple schemas using @graph when needed
  const schemas = [
    schema || articleSchema || websiteSchema,
    organizationSchema,
    softwareAppSchema,
    faqSchema,
    breadcrumbSchema,
  ].filter(Boolean)

  const activeSchema = schemas.length > 1
    ? { '@context': 'https://schema.org', '@graph': schemas.map(s => { const { '@context': _, ...rest } = s as any; return rest }) }
    : schemas[0] || null

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
