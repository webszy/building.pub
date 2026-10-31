<script setup lang="ts">
import type { DirectoryCategory, DirectoryProduct } from '~~/shared/directory-products'

const props = defineProps<{
  products: DirectoryProduct[]
  categories: DirectoryCategory[]
}>()

function labelFor(slug: string) {
  return props.categories.find(category => category.slug === slug)?.label ?? slug
}
</script>

<template>
  <div class="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
    <ProductCard
      v-for="product in products"
      :key="product.slug"
      :product="product"
      :category-label="labelFor(product.category)"
    />
  </div>
</template>
