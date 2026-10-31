<script setup lang="ts">
import {
  categoryFilters,
  categoryShortcuts,
  directoryTool,
  directoryTools,
  directoryToolsByName,
  faqs,
  featuredHero,
  homeSections,
  popularCategories,
  topPicks,
} from '~/data/directory'

const activeCategory = ref<(typeof categoryFilters)[number]>('All')
const openFaq = ref('')

const visibleSections = computed(() => {
  if (activeCategory.value === 'All') return homeSections
  const match = homeSections.find(section => section.title === activeCategory.value)
  if (match) return [match]
  const tools = directoryTools.filter(tool => tool.category === activeCategory.value)
  if (!tools.length) return []
  return [{ id: activeCategory.value, title: activeCategory.value, subtitle: '', names: tools.map(tool => tool.name) }]
})

function selectCategory(category: (typeof categoryFilters)[number] | string) {
  if ((categoryFilters as readonly string[]).includes(category)) {
    activeCategory.value = category as (typeof categoryFilters)[number]
  }
}

function sectionHref(section: { categorySlug?: string }) {
  return section.categorySlug ? { path: '/products', query: { category: section.categorySlug } } : '/products'
}

const picks = topPicks.map(directoryTool)
</script>

<template>
  <div class="mx-auto w-full max-w-[1320px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
    <div class="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_300px]">
      <div class="min-w-0">
        <header class="mb-8">
          <h1 class="text-2xl font-semibold tracking-tight sm:text-3xl">Every builder deserves to be seen.</h1>
          <p class="text-muted-foreground mt-1.5 text-sm sm:text-[15px]">Not just what you built. What you're building.</p>
        </header>

        <section v-if="activeCategory === 'All'">
          <div class="flex items-baseline justify-between gap-4 pb-3">
            <h2 class="text-lg font-semibold tracking-tight">Featured Builds</h2>
            <NuxtLink to="/products" class="text-muted-foreground hover:text-foreground inline-flex shrink-0 items-center gap-1 text-[13px] font-medium transition">
              View all
              <UIcon name="i-lucide-arrow-right" class="size-3.5" aria-hidden="true" />
            </NuxtLink>
          </div>
          <div class="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
            <div class="border-border from-primary/12 via-card to-card relative overflow-hidden rounded-2xl border bg-gradient-to-br p-6 sm:p-8">
              <div
                aria-hidden="true"
                class="text-primary/25 absolute inset-y-0 right-0 w-1/2 [mask-image:linear-gradient(to_left,black,transparent)]"
                style="background-image:radial-gradient(currentColor 1px, transparent 1px);background-size:14px 14px"
              />
              <div class="relative flex items-start gap-6">
                <div class="min-w-0 flex-1">
                  <span class="bg-primary/12 text-primary inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold">Featured</span>
                  <h3 class="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{{ featuredHero.name }}</h3>
                  <p class="text-muted-foreground mt-2 max-w-md text-sm leading-relaxed sm:text-[15px]">{{ featuredHero.description }}</p>
                  <div class="mt-6 flex flex-wrap gap-2">
                    <NuxtLink :to="`/products/${featuredHero.slug}`" class="bg-primary text-primary-foreground hover:bg-primary/80 inline-flex h-8 items-center gap-1 rounded-full px-4 text-sm font-medium transition">
                      View details
                      <UIcon name="i-lucide-chevron-right" class="size-3.5" aria-hidden="true" />
                    </NuxtLink>
                  </div>
                </div>
                <div class="border-border/60 bg-card hidden shrink-0 rotate-6 overflow-hidden rounded-2xl border shadow-xl shadow-black/10 sm:grid sm:place-items-center" style="width:96px;height:96px">
                  <img v-if="featuredHero.logo" :src="featuredHero.logo" alt="" class="size-full object-cover" width="96" height="96">
                  <UIcon v-else name="i-lucide-shapes" class="text-muted-foreground size-10" aria-hidden="true" />
                </div>
              </div>
            </div>
            <div class="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-1">
              <button
                v-for="shortcut in categoryShortcuts"
                :key="shortcut.title"
                type="button"
                class="group border-border bg-card hover:border-primary/35 flex items-center gap-3.5 rounded-2xl border p-4 text-left transition"
                @click="selectCategory(shortcut.title)"
              >
                <span class="bg-primary/10 text-primary grid size-11 shrink-0 place-items-center rounded-xl">
                  <UIcon :name="shortcut.icon" class="size-5" aria-hidden="true" />
                </span>
                <span class="min-w-0 flex-1">
                  <span class="block truncate font-semibold">{{ shortcut.title }}</span>
                  <span class="text-muted-foreground block truncate text-[13px]">{{ shortcut.description }}</span>
                </span>
                <UIcon name="i-lucide-chevron-right" class="text-muted-foreground group-hover:text-primary size-4 shrink-0 transition" aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>

        <nav class="scrollbar-none -mx-4 mt-6 flex items-center gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0" aria-label="Categories">
          <button
            v-for="category in categoryFilters"
            :key="category"
            type="button"
            class="inline-flex h-8 shrink-0 items-center rounded-full border px-3.5 text-sm font-medium whitespace-nowrap transition"
            :class="activeCategory === category ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-muted-foreground hover:text-foreground'"
            :aria-current="activeCategory === category ? 'page' : undefined"
            @click="selectCategory(category)"
          >
            {{ category }}
          </button>
        </nav>

        <section v-for="(section, index) in visibleSections" :id="section.id" :key="section.id" :class="index === 0 ? 'mt-8' : 'mt-10'">
          <div class="flex items-baseline justify-between gap-4 pb-3">
            <div class="flex min-w-0 flex-wrap items-baseline gap-x-2.5 gap-y-1">
              <h2 class="text-lg font-semibold tracking-tight">{{ section.title }}</h2>
              <p v-if="section.subtitle" class="text-muted-foreground text-[13px]">{{ section.subtitle }}</p>
            </div>
            <NuxtLink :to="sectionHref(section)" class="text-muted-foreground hover:text-foreground inline-flex shrink-0 items-center gap-1 text-[13px] font-medium transition">
              View all
              <UIcon name="i-lucide-arrow-right" class="size-3.5" aria-hidden="true" />
            </NuxtLink>
          </div>
          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <HomeToolCard v-for="tool in directoryToolsByName(section.names)" :key="`${section.id}-${tool.name}`" :tool="tool" />
          </div>
        </section>
        <p v-if="activeCategory !== 'All' && !visibleSections.length" class="text-muted-foreground mt-8 text-sm">No products in this category yet.</p>

        <section v-if="activeCategory === 'All'" class="border-border mt-14 grid gap-8 border-t pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <div>
            <h2 class="text-lg font-semibold tracking-tight">About building.pub</h2>
            <p class="text-muted-foreground mt-3 text-sm leading-relaxed">A discovery platform for people who build. Projects are the medium; builders are the protagonists.</p>
            <p class="text-muted-foreground mt-3 text-sm leading-relaxed">Give every builder a chance to be seen, to learn, and to grow.</p>
            <NuxtLink to="/about" class="mt-4 inline-flex items-center gap-1 text-sm font-medium hover:underline">
              Why building.pub
              <UIcon name="i-lucide-arrow-right" class="size-3.5" aria-hidden="true" />
            </NuxtLink>
          </div>
          <div>
            <h2 class="mb-3 text-lg font-semibold tracking-tight">Questions</h2>
            <div class="border-border flex w-full flex-col border-t">
              <div v-for="item in faqs" :key="item.question" class="border-border border-b last:border-b-0">
                <h3 class="flex">
                  <button
                    type="button"
                    class="flex flex-1 items-start justify-between gap-4 py-4 text-left text-[15px] font-medium"
                    :aria-expanded="openFaq === item.question"
                    @click="openFaq = openFaq === item.question ? '' : item.question"
                  >
                    {{ item.question }}
                    <UIcon :name="openFaq === item.question ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'" class="text-muted-foreground mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  </button>
                </h3>
                <p v-if="openFaq === item.question" class="text-muted-foreground pb-4 text-sm leading-relaxed">{{ item.answer }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <aside class="space-y-8 xl:sticky xl:top-[calc(var(--header-h,3.5rem)+1.5rem+var(--banner-h))] xl:self-start">
        <section>
          <h2 class="text-lg font-semibold tracking-tight">Featured Builds</h2>
          <p class="text-muted-foreground -mt-2 mb-3 text-[13px]">Highlighted independent projects</p>
          <ol class="space-y-2">
            <li v-for="(tool, index) in picks" :key="tool.name">
              <NuxtLink :to="`/products/${tool.slug}`" class="border-border bg-card hover:border-primary/35 flex items-center gap-3 rounded-xl border px-3 py-2.5 transition">
                <span class="text-primary w-4 shrink-0 text-center text-sm font-semibold tabular-nums">{{ index + 1 }}</span>
                <span class="border-border/60 bg-secondary/50 grid shrink-0 place-items-center overflow-hidden rounded-lg border" style="width:32px;height:32px">
                  <img v-if="tool.logo" :src="tool.logo" alt="" class="size-full object-cover" width="32" height="32">
                  <UIcon v-else name="i-lucide-shapes" class="text-muted-foreground size-4" aria-hidden="true" />
                </span>
                <span class="min-w-0 flex-1">
                  <span class="block truncate text-sm font-semibold">{{ tool.name }}</span>
                  <span class="text-muted-foreground block truncate text-xs">{{ tool.description }}</span>
                </span>
              </NuxtLink>
            </li>
          </ol>
        </section>
        <section>
          <h2 class="mb-3 text-lg font-semibold tracking-tight">Categories</h2>
          <div class="flex flex-wrap gap-2">
            <NuxtLink
              v-for="category in popularCategories"
              :key="category.slug"
              :to="{ path: '/products', query: { category: category.slug } }"
              class="bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary inline-flex h-8 items-center rounded-full px-3.5 text-sm font-medium transition"
            >{{ category.label }}</NuxtLink>
          </div>
        </section>
      </aside>
    </div>
  </div>
</template>
