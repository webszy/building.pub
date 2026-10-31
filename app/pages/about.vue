<script setup lang="ts">
import { siteBrand, sitePages } from '~~/shared/site'

usePageSeo({
  title: sitePages.about.title,
  description: sitePages.about.description,
  path: sitePages.about.path,
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Discover', item: siteBrand.canonicalOrigin },
      { '@type': 'ListItem', position: 2, name: 'Our Mission', item: `${siteBrand.canonicalOrigin}/about` },
    ],
  },
})
</script>

<template>
  <div>
    <div class="page-sheet mx-auto w-full max-w-[1320px] px-4 py-8 sm:px-6 lg:px-8">
      <article class="card max-w-2xl">
        <h1>{{ siteBrand.slogan }}</h1>
        <p>{{ siteBrand.subtitle }}</p>
        <h2>Our mission</h2>
        <p>{{ siteBrand.mission }}</p>
        <h2>Our vision</h2>
        <p>{{ siteBrand.vision }}</p>
        <p>{{ siteBrand.positioning }} Discovery is the entry point. Projects are the medium. Builders are the protagonists.</p>
        <p>building.pub helps independent creators and everyday builders get found. Attention and feedback are the value we are building toward — not a leaderboard, and not a submit-for-backlinks directory.</p>
      </article>
    </div>
    <SiteFooter />
  </div>
</template>
