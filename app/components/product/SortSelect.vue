<script setup lang="ts">
import type { ProductSort } from '~~/shared/directory-products'

const props = defineProps<{
  sort: ProductSort
  featuredAvailable: boolean
}>()

const emit = defineEmits<{ 'update:sort': [sort: ProductSort] }>()

const options = computed(() => {
  const items: { value: ProductSort, label: string }[] = [
    { value: 'recently-added', label: 'Recently Added' },
    { value: 'name-asc', label: 'Name A–Z' },
    { value: 'name-desc', label: 'Name Z–A' },
  ]
  if (props.featuredAvailable) items.push({ value: 'featured', label: 'Featured' })
  return items
})

function onChange(event: Event) {
  const value = (event.target as HTMLSelectElement).value
  if (value === 'recently-added' || value === 'name-asc' || value === 'name-desc' || value === 'featured') {
    emit('update:sort', value)
  }
}
</script>

<template>
  <label class="relative inline-flex shrink-0">
    <span class="sr-only">Sort products</span>
    <select
      :value="sort"
      class="border-border bg-card text-foreground h-8 cursor-pointer appearance-none rounded-lg border pr-8 pl-3 text-sm font-medium"
      @change="onChange"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
    </select>
    <UIcon name="i-lucide-chevron-down" class="text-muted-foreground pointer-events-none absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2" aria-hidden="true" />
  </label>
</template>
