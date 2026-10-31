<script setup lang="ts">
const route = useRoute()
const mainEl = ref<HTMLElement | null>(null)
const { mobileOpen, closeMobileSidebar, searchOpen, restoreTheme } = useSiteChrome()

watch(() => route.fullPath, async () => {
  closeMobileSidebar()
  await nextTick()
  mainEl.value?.scrollTo({ top: 0 })
})

function onKeydown(event: KeyboardEvent) {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    searchOpen.value = true
  }
  if (event.key === 'Escape') {
    searchOpen.value = false
    closeMobileSidebar()
  }
}

watch(mobileOpen, (open) => {
  if (!import.meta.client) return
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => {
  restoreTheme()
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="bg-background text-foreground flex h-dvh overflow-hidden [--banner-h:0px] has-[[data-top-banner]]:[--banner-h:2.75rem]">
    <SiteSidebar />
    <div class="flex h-full min-h-0 min-w-0 flex-1 flex-col">
      <SiteHeader />
      <main ref="mainEl" class="min-h-0 flex-1 overflow-y-auto">
        <slot />
      </main>
    </div>
    <button
      v-if="mobileOpen"
      type="button"
      class="fixed inset-0 z-30 bg-black/40 lg:hidden"
      aria-label="Close sidebar"
      @click="closeMobileSidebar"
    />
    <SiteSearchDialog />
  </div>
</template>
