<script setup lang="ts">
import type { DirectoryCatalog } from '~~/shared/directory-products'
import { siteBrand, sitePages } from '~~/shared/site'

const { data, status, error, refresh } = await useFetch<DirectoryCatalog>('/api/directory/products')
const { categories, featuredAvailable, category, sort, visible, setCategory, setSort } = useProductListing(data)

usePageSeo({
  title: sitePages.products.title,
  description: sitePages.products.description,
  path: sitePages.products.path,
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Discover', item: siteBrand.canonicalOrigin },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${siteBrand.canonicalOrigin}/products` },
    ],
  },
})

const loading = computed(() => status.value === 'idle' || status.value === 'pending')
const failed = computed(() => status.value === 'error' || (!loading.value && !data.value))
const catalogEmpty = computed(() => (data.value?.products.length ?? 0) === 0)

const countLabel = computed(() => {
  const count = visible.value.length
  const noun = count === 1 ? 'product' : 'products'
  const prefix = category.value === 'all'
    ? 'All'
    : categories.value.find(item => item.slug === category.value)?.label ?? 'All'
  return `${prefix} ${count} ${noun}`
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
            <li aria-current="page">Products</li>
          </ol>
        </nav>
        <h1 class="mt-4 text-[32px] leading-tight font-semibold tracking-tight">All Products</h1>
        <p class="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-[15px]">
          Discover what independent builders are creating.
        </p>
      </header>

      <div v-if="loading" class="mt-6" aria-busy="true" aria-live="polite">
        <p class="sr-only">Loading products</p>
        <div class="flex gap-2" aria-hidden="true">
          <div v-for="index in 5" :key="index" class="bg-secondary h-8 w-28 shrink-0 rounded-full motion-safe:animate-pulse" />
        </div>
        <div class="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3" aria-hidden="true">
          <div v-for="index in 6" :key="index" class="border-border bg-card h-[132px] rounded-2xl border p-4 motion-safe:animate-pulse">
            <div class="flex gap-3">
              <div class="bg-secondary size-11 shrink-0 rounded-lg" />
              <div class="flex-1 space-y-2 pt-1">
                <div class="bg-secondary h-4 w-2/5 rounded" />
                <div class="bg-secondary h-3 w-full rounded" />
                <div class="bg-secondary h-3 w-4/5 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="failed" class="border-border mt-6 rounded-2xl border px-6 py-16 text-center" role="alert">
        <p class="text-base font-semibold">Could not load products</p>
        <p class="text-muted-foreground mt-1 text-sm">{{ error?.message || 'Something went wrong while loading the directory.' }}</p>
        <button
          type="button"
          class="bg-primary text-primary-foreground hover:bg-primary/80 mt-4 inline-flex h-8 items-center rounded-full px-4 text-sm font-medium transition-colors"
          @click="refresh()"
        >
          Try again
        </button>
      </div>

      <template v-else>
        <ProductCategoryFilter class="mt-6" :categories="categories" :active="category" @select="setCategory" />

        <div class="mt-5 flex items-center justify-between gap-3">
          <p class="text-muted-foreground min-w-0 truncate text-sm">{{ countLabel }}</p>
          <ProductSortSelect :sort="sort" :featured-available="featuredAvailable" @update:sort="setSort" />
        </div>

        <div class="mt-4">
          <ProductGrid v-if="visible.length" :products="visible" :categories="categories" />
          <div v-else class="border-border rounded-2xl border border-dashed px-6 py-16 text-center">
            <p class="text-base font-semibold">{{ catalogEmpty ? 'No products yet' : 'No products in this category' }}</p>
            <p class="text-muted-foreground mt-1 text-sm">
              {{ catalogEmpty ? 'New work will show up here as it is added.' : 'Try another category, or come back as new work is added.' }}
            </p>
            <button
              v-if="!catalogEmpty && category !== 'all'"
              type="button"
              class="text-primary mt-3 text-sm font-medium"
              @click="setCategory('all')"
            >
              Show all products
            </button>
          </div>
        </div>
      </template>
    </div>
    <SiteFooter />
  </div>
</template>
