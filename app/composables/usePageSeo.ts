import { absoluteSiteUrl, siteBrand } from '~~/shared/site'

export function usePageSeo(options: {
  title: string
  description: string
  path: string
  ogType?: 'website' | 'article'
  ogImage?: string | null
  robots?: string | (() => string | undefined)
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}) {
  const config = useRuntimeConfig()
  const origin = String(config.public.siteUrl || siteBrand.canonicalOrigin)
  const canonical = absoluteSiteUrl(options.path, origin)
  const imagePath = options.ogImage || siteBrand.ogImagePath
  const image = imagePath.startsWith('http') ? imagePath : absoluteSiteUrl(imagePath, origin)

  useSeoMeta({
    title: options.title,
    description: options.description,
    ogTitle: options.title,
    ogDescription: options.description,
    ogUrl: canonical,
    ogType: options.ogType ?? 'website',
    ogImage: image,
    ogSiteName: siteBrand.name,
    ogLocale: siteBrand.locale,
    twitterCard: 'summary_large_image',
    twitterTitle: options.title,
    twitterDescription: options.description,
    twitterImage: image,
    robots: options.robots,
  })

  useHead({
    link: [{ rel: 'canonical', href: canonical }],
    script: options.jsonLd
      ? [{ type: 'application/ld+json', innerHTML: JSON.stringify(options.jsonLd) }]
      : undefined,
  })

  return { canonical, image }
}
