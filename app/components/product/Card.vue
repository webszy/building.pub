<script setup lang="ts">
import type { DirectoryProduct } from '~~/shared/directory-products'

const props = defineProps<{
  product: DirectoryProduct
  categoryLabel: string
}>()

const attributeLabel = computed(() => {
  if (!props.product.openSource || props.product.category === 'open-source') return null
  return 'Open Source'
})
</script>

<template>
  <article class="border-border bg-card hover:border-primary hover:shadow-primary/20 focus-within:border-primary group relative flex h-full min-w-0 flex-col rounded-2xl border p-4 shadow-none transition-[border-color,box-shadow] duration-150 hover:shadow-[0_8px_24px_-12px]">
    <div class="flex items-start gap-3">
      <div class="border-border/60 bg-secondary/50 grid size-11 shrink-0 place-items-center overflow-hidden rounded-lg border">
        <img
          v-if="product.logo"
          :src="product.logo"
          alt=""
          class="size-full object-cover"
          width="44"
          height="44"
          decoding="async"
        >
        <UIcon v-else name="i-lucide-shapes" class="text-muted-foreground size-5" aria-hidden="true" />
      </div>
      <div class="min-w-0 flex-1">
        <div class="flex items-center gap-1.5">
          <h2 class="min-w-0 truncate text-[15px] leading-5 font-semibold">
            <NuxtLink :to="`/products/${product.slug}`" class="after:absolute after:inset-0 after:rounded-2xl">{{ product.name }}</NuxtLink>
          </h2>
          <span v-if="product.featured" class="shrink-0">
            <UIcon name="i-lucide-sparkles" class="text-primary size-3.5" aria-hidden="true" />
            <span class="sr-only">Featured</span>
          </span>
        </div>
        <p class="text-muted-foreground mt-1 line-clamp-2 min-h-10 text-[13px] leading-5">{{ product.description }}</p>
      </div>
    </div>
    <div class="mt-auto flex min-w-0 items-center gap-2 pt-3">
      <span v-if="attributeLabel" class="bg-primary/10 text-primary shrink-0 rounded-md px-2 py-0.5 text-[11px] font-semibold">{{ attributeLabel }}</span>
      <span class="bg-secondary text-secondary-foreground ml-auto max-w-[58%] min-w-0 truncate rounded-md px-2 py-0.5 text-[11px] font-medium">{{ categoryLabel }}</span>
    </div>
  </article>
</template>
