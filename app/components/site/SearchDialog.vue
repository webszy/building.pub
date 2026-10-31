<script setup lang="ts">
import { searchDirectory } from '~/data/directory'

const { searchOpen, searchQuery, closeSearch } = useSiteChrome()
const input = ref<HTMLInputElement | null>(null)

const results = computed(() => searchDirectory(searchQuery.value).slice(0, 8))

watch(searchOpen, async (open) => {
  if (!open) return
  await nextTick()
  input.value?.focus()
})

function openProduct(slug: string) {
  closeSearch()
  return navigateTo(`/products/${slug}`)
}
</script>

<template>
  <div v-if="searchOpen" class="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]">
    <button type="button" class="absolute inset-0 bg-black/40" aria-label="Close search" @click="closeSearch" />
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search products"
      class="border-border bg-popover text-popover-foreground relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border shadow-2xl"
    >
      <div class="border-border flex items-center gap-2 border-b px-4">
        <UIcon name="i-lucide-search" class="text-muted-foreground size-4 shrink-0" aria-hidden="true" />
        <input
          ref="input"
          v-model="searchQuery"
          type="search"
          placeholder="Search products…"
          class="placeholder:text-muted-foreground h-12 w-full bg-transparent text-sm outline-none"
        >
        <button type="button" class="text-muted-foreground hover:text-foreground text-xs" @click="closeSearch">Esc</button>
      </div>
      <ul v-if="results.length" class="max-h-[50vh] overflow-y-auto p-2">
        <li v-for="tool in results" :key="tool.slug">
          <button
            type="button"
            class="hover:bg-accent flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left"
            @click="openProduct(tool.slug)"
          >
            <span class="border-border/60 grid size-8 shrink-0 place-items-center overflow-hidden rounded-lg border">
              <img v-if="tool.logo" :src="tool.logo" alt="" width="32" height="32" class="size-8 object-cover">
              <UIcon v-else name="i-lucide-shapes" class="text-muted-foreground size-4" aria-hidden="true" />
            </span>
            <span class="min-w-0 flex-1">
              <span class="block truncate text-sm font-semibold">{{ tool.name }}</span>
              <span class="text-muted-foreground block truncate text-xs">{{ tool.category }}</span>
            </span>
          </button>
        </li>
      </ul>
      <p v-else class="text-muted-foreground px-4 py-8 text-center text-sm">No products match that search.</p>
    </div>
  </div>
</template>
