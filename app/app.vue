<script setup lang="ts">
import { siteBrand } from '~~/shared/site'

const config = useRuntimeConfig()
const { theme } = useSiteChrome()
const origin = String(config.public.siteUrl || siteBrand.canonicalOrigin)
const defaultImage = new URL(siteBrand.ogImagePath, `${origin}/`).href

useHead({
  titleTemplate: (title) => {
    if (!title) return siteBrand.name
    return title.includes(siteBrand.name) ? title : `${title} | ${siteBrand.name}`
  },
  htmlAttrs: { class: theme, lang: 'en' },
  bodyAttrs: { class: 'font-sans antialiased' },
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteBrand.name,
      url: siteBrand.canonicalOrigin,
      description: siteBrand.description,
      inLanguage: 'en-US',
    }),
  }],
})

useSeoMeta({
  description: () => config.public.siteDescription || siteBrand.description,
  ogSiteName: siteBrand.name,
  ogType: 'website',
  ogLocale: siteBrand.locale,
  ogImage: defaultImage,
  twitterCard: 'summary_large_image',
  twitterImage: defaultImage,
})
</script>
<template>
  <UApp><NuxtRouteAnnouncer /><AuthLoginModal /><NuxtLayout><NuxtPage /></NuxtLayout></UApp>
</template>
