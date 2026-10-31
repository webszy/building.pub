<script setup lang="ts">
import { siteBrand, sitePages } from '~~/shared/site'

usePageSeo({
  title: sitePages.home.title,
  description: sitePages.home.description,
  path: sitePages.home.path,
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: siteBrand.name,
    description: sitePages.home.description,
    url: siteBrand.canonicalOrigin,
    isPartOf: { '@type': 'WebSite', name: siteBrand.name, url: siteBrand.canonicalOrigin },
  },
})
</script>

<template>
  <div>
    <HomeDirectory />
    <SiteFooter />
  </div>
</template>
