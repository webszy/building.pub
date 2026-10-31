<script setup lang="ts">
const route = useRoute()
const { desktopOpen, mobileOpen, closeMobileSidebar } = useSiteChrome()

const sections = [
  {
    label: 'Discover',
    items: [
      { label: 'Discover', to: '/', icon: 'i-lucide-compass', exact: true },
      { label: 'Products', to: '/products', icon: 'i-lucide-grid-2x2' },
      { label: 'Categories', to: '/categories', icon: 'i-lucide-layout-grid' },
    ],
  },
  {
    label: 'About',
    items: [
      { label: 'Our Mission', to: '/about', icon: 'i-lucide-heart-handshake' },
    ],
  },
]

function isActive(item: { to: string, exact?: boolean }) {
  if (!item.to) return false
  return item.exact ? route.path === item.to : route.path === item.to || route.path.startsWith(`${item.to}/`)
}

const itemClass = 'flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition'
const activeClass = 'bg-sidebar-accent text-sidebar-accent-foreground'
const idleClass = 'text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground'

const asideClass = computed(() => {
  const pinned = 'h-full min-h-0 w-[240px] shrink-0'
  if (mobileOpen.value) return `fixed inset-y-0 left-0 z-40 flex h-dvh lg:static lg:z-auto lg:flex ${pinned}`
  if (desktopOpen.value) return `hidden lg:flex ${pinned}`
  return 'hidden'
})
</script>

<template>
  <aside
    class="border-sidebar-border bg-sidebar text-sidebar-foreground flex-col border-r px-3 py-4"
    :class="asideClass"
  >
    <div class="mb-6 px-3">
      <SiteBrand />
    </div>
    <div class="flex min-h-0 flex-1 flex-col">
      <nav class="flex-1 space-y-5 overflow-y-auto" aria-label="Sidebar">
        <div v-for="section in sections" :key="section.label">
          <p class="text-sidebar-foreground/55 mb-1.5 px-3 text-[11px] font-semibold tracking-[0.14em] uppercase">{{ section.label }}</p>
          <ul class="space-y-0.5">
            <li v-for="item in section.items" :key="item.label">
              <NuxtLink
                :to="item.to"
                :class="[itemClass, isActive(item) ? activeClass : idleClass]"
                :aria-current="isActive(item) ? 'page' : undefined"
                @click="closeMobileSidebar"
              >
                <UIcon :name="item.icon" class="size-4 shrink-0" aria-hidden="true" />
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </nav>
      <div class="border-sidebar-border bg-sidebar-accent/40 mt-4 shrink-0 rounded-lg border p-3.5">
        <p class="text-sidebar-foreground text-sm leading-snug font-semibold">Every builder deserves to be seen.</p>
        <p class="text-sidebar-foreground/65 mt-2 text-xs leading-relaxed">Not just what you built. What you're building.</p>
        <NuxtLink
          to="/about"
          class="text-primary mt-3 inline-flex items-center gap-1 text-sm font-medium"
          @click="closeMobileSidebar"
        >
          Why building.pub
          <UIcon name="i-lucide-arrow-right" class="size-3.5" aria-hidden="true" />
        </NuxtLink>
      </div>
    </div>
  </aside>
</template>
