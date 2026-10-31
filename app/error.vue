<script setup lang="ts">
import type { NuxtError } from '#app'
import { siteBrand } from '~~/shared/site'

const props = defineProps<{ error: NuxtError }>()
const is404 = computed(() => props.error?.statusCode === 404)

usePageSeo({
  title: is404.value ? 'Page not found | building.pub' : 'Something went wrong | building.pub',
  description: siteBrand.description,
  path: '/',
  robots: 'noindex, nofollow',
})
</script>

<template>
  <div class="bg-background text-foreground min-h-dvh">
    <div class="page-sheet mx-auto w-full max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8">
      <article class="card max-w-xl">
        <p class="text-muted-foreground text-sm">{{ siteBrand.name }}</p>
        <h1>{{ is404 ? 'Page not found' : 'Something went wrong' }}</h1>
        <p v-if="is404">That address is not a published page on building.pub.</p>
        <p v-else>The page could not be loaded. Try again in a moment.</p>
        <NuxtLink to="/" class="text-primary mt-2 inline-flex text-sm font-medium">Back to Discover</NuxtLink>
      </article>
    </div>
  </div>
</template>
