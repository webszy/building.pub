<script setup lang="ts">
import type { DirectoryCategory } from '~~/shared/directory-products'

const props = defineProps<{
  categories: DirectoryCategory[]
  active: string
}>()

const emit = defineEmits<{ select: [slug: string] }>()

const scroller = ref<HTMLElement | null>(null)

function revealActive() {
  const root = scroller.value
  const current = root?.querySelector<HTMLElement>('[aria-pressed="true"]')
  if (!root || !current) return
  const start = current.offsetLeft
  const end = start + current.offsetWidth
  const viewStart = root.scrollLeft
  const viewEnd = viewStart + root.clientWidth
  if (start < viewStart || end > viewEnd) {
    root.scrollTo({ left: Math.max(0, start - 16) })
  }
}

onMounted(revealActive)
watch(() => props.active, async () => {
  await nextTick()
  revealActive()
})
</script>

<template>
  <div
    ref="scroller"
    class="scrollbar-none flex flex-nowrap gap-2 overflow-x-auto overscroll-x-contain"
    role="toolbar"
    aria-label="Product categories"
  >
    <button
      type="button"
      class="inline-flex h-8 shrink-0 items-center rounded-full border px-3.5 text-sm font-medium whitespace-nowrap transition-colors"
      :class="active === 'all' ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-foreground hover:bg-secondary'"
      :aria-pressed="active === 'all'"
      @click="emit('select', 'all')"
    >
      All
    </button>
    <button
      v-for="category in categories"
      :key="category.slug"
      type="button"
      class="inline-flex h-8 shrink-0 items-center rounded-full border px-3.5 text-sm font-medium whitespace-nowrap transition-colors"
      :class="active === category.slug ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-foreground hover:bg-secondary'"
      :aria-pressed="active === category.slug"
      @click="emit('select', category.slug)"
    >
      {{ category.label }}
    </button>
  </div>
</template>
