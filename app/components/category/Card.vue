<script setup lang="ts">
import type { DirectoryCategoryCard } from '~~/shared/directory-products'

const props = defineProps<{ category: DirectoryCategoryCard }>()

const countLabel = computed(() => `${props.category.count} ${props.category.count === 1 ? 'product' : 'products'}`)
</script>

<template>
  <NuxtLink
    :to="{ path: '/products', query: { category: category.slug } }"
    class="border-border bg-card hover:border-primary/50 focus-visible:ring-ring group flex min-h-[132px] min-w-0 items-start gap-4 rounded-xl border p-5 transition-[border-color,box-shadow] duration-150 focus-visible:ring-2 focus-visible:outline-none hover:shadow-[0_8px_24px_-16px]"
  >
    <span class="bg-primary/10 text-primary grid size-14 shrink-0 place-items-center rounded-xl">
      <UIcon :name="category.icon" class="size-6" aria-hidden="true" />
    </span>
    <span class="min-w-0 flex-1">
      <span class="flex items-start justify-between gap-3">
        <h2 class="min-w-0 text-lg leading-6 font-semibold text-balance">{{ category.label }}</h2>
        <span class="text-muted-foreground mt-0.5 flex shrink-0 items-center gap-1 text-sm">
          {{ countLabel }}
          <UIcon name="i-lucide-arrow-right" class="size-4" aria-hidden="true" />
        </span>
      </span>
      <span class="text-muted-foreground mt-1.5 line-clamp-2 min-h-10 text-sm leading-5">{{ category.description }}</span>
    </span>
  </NuxtLink>
</template>
