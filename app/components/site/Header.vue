<script setup lang="ts">
const { desktopOpen, toggleSidebar, openSearch, toggleTheme, theme } = useSiteChrome()
</script>

<template>
  <header class="border-border bg-background/85 sticky top-(--banner-h) z-30 border-b backdrop-blur">
    <div class="flex h-14 items-center gap-2 px-4 sm:gap-3 sm:px-6 lg:px-8">
      <button
        type="button"
        aria-label="Toggle sidebar"
        title="Toggle sidebar"
        class="hover:bg-secondary text-muted-foreground hover:text-foreground -ml-1.5 grid size-9 shrink-0 place-items-center rounded-md transition-colors"
        @click="toggleSidebar"
      >
        <UIcon name="i-lucide-panel-left" class="size-[18px]" aria-hidden="true" />
      </button>
      <div :class="desktopOpen ? 'hidden shrink-0 sm:block lg:hidden' : 'hidden shrink-0 sm:block'">
        <SiteBrand />
      </div>
      <div class="max-w-md min-w-0 flex-1">
        <button
          type="button"
          aria-label="Search products…"
          class="border-border bg-secondary/60 hover:bg-secondary text-muted-foreground flex h-9 w-full items-center gap-2.5 rounded-md border pr-2 pl-3.5 text-left text-sm transition"
          @click="openSearch"
        >
          <UIcon name="i-lucide-search" class="size-4 shrink-0" aria-hidden="true" />
          <span class="text-muted-foreground/80 min-w-0 flex-1 truncate">Search products…</span>
          <kbd class="border-border bg-card hidden shrink-0 rounded border px-1.5 py-0.5 font-sans text-[11px] sm:inline-block">⌘K</kbd>
        </button>
      </div>
      <div class="ml-auto flex shrink-0 items-center gap-1">
        <div class="hidden items-center gap-1 sm:flex">
          <button
            type="button"
            class="text-muted-foreground hover:bg-accent hover:text-accent-foreground inline-flex size-8 items-center justify-center rounded-md transition-colors"
            aria-label="Switch language"
          >
            <UIcon name="i-lucide-languages" class="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            class="text-muted-foreground hover:bg-muted hover:text-foreground inline-flex size-8 items-center justify-center rounded-lg transition-colors"
            aria-label="Toggle theme"
            @click="toggleTheme"
          >
            <UIcon :name="theme === 'dark' ? 'i-lucide-moon' : 'i-lucide-sun'" class="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
