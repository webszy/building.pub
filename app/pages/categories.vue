<script setup lang="ts">
import type { DirectoryCatalog } from '~~/shared/directory-products'
import { directoryCategoryCards } from '~~/shared/directory-products'
import { siteBrand, sitePages } from '~~/shared/site'

const { data, status, error, refresh } = await useFetch<DirectoryCatalog>('/api/directory/products')
const cards = computed(() => directoryCategoryCards(data.value?.products ?? []))
const loading = computed(() => status.value === 'idle' || status.value === 'pending')
const failed = computed(() => status.value === 'error' || (!loading.value && !data.value))

usePageSeo({
  title: sitePages.categories.title,
  description: sitePages.categories.description,
  path: sitePages.categories.path,
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Discover', item: siteBrand.canonicalOrigin },
      { '@type': 'ListItem', position: 2, name: 'Categories', item: `${siteBrand.canonicalOrigin}/categories` },
    ],
  },
})
</script>

<template>
  <div>
    <div class="mx-auto w-full max-w-[1280px] px-4 pt-6 pb-10 sm:px-6 sm:pt-8 lg:px-8">
      <header>
        <nav aria-label="Breadcrumb" class="text-[13px]">
          <ol class="text-muted-foreground flex items-center gap-1.5">
            <li>
              <NuxtLink to="/" class="hover:text-foreground transition-colors">Discover</NuxtLink>
            </li>
            <li aria-hidden="true" class="text-muted-foreground/70">&gt;</li>
            <li aria-current="page">Categories</li>
          </ol>
        </nav>
        <h1 class="mt-4 text-[32px] leading-tight font-semibold tracking-tight">Product Categories</h1>
        <p class="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-[15px]">
          Explore what builders are creating across different categories.
        </p>
      </header>

      <div v-if="loading" class="mt-10" aria-busy="true" aria-live="polite">
        <p class="sr-only">Loading categories</p>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3" aria-hidden="true">
          <div v-for="index in 6" :key="index" class="border-border h-[132px] rounded-xl border p-5 motion-safe:animate-pulse">
            <div class="flex gap-4">
              <div class="bg-secondary size-14 shrink-0 rounded-xl" />
              <div class="flex-1 space-y-2 pt-1">
                <div class="bg-secondary h-5 w-1/3 rounded" />
                <div class="bg-secondary h-4 w-full rounded" />
                <div class="bg-secondary h-4 w-2/3 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="failed" class="border-border mt-10 rounded-xl border px-6 py-16 text-center" role="alert">
        <p class="text-base font-semibold">Could not load categories</p>
        <p class="text-muted-foreground mt-1 text-sm">{{ error?.message || 'Something went wrong while loading the directory.' }}</p>
        <button
          type="button"
          class="bg-primary text-primary-foreground hover:bg-primary/80 mt-4 inline-flex h-8 items-center rounded-full px-4 text-sm font-medium transition-colors"
          @click="refresh()"
        >
          Try again
        </button>
      </div>

      <div v-else class="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <CategoryCard v-for="category in cards" :key="category.slug" :category="category" />
      </div>
    </div>
    <SiteFooter />
  </div>
</template>
