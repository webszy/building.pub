<script setup lang="ts">
import type { DirectoryTool } from '~/data/directory'

defineProps<{ tool: DirectoryTool }>()
</script>

<template>
  <article class="group border-border bg-card hover:border-primary/35 hover:shadow-primary/25 relative flex h-full min-w-0 flex-col rounded-xl border p-4 transition hover:shadow-[0_8px_24px_-12px]">
    <div class="flex items-start gap-3">
      <div class="border-border/60 bg-secondary/50 grid size-11 shrink-0 place-items-center overflow-hidden rounded-lg border">
        <img
          v-if="tool.logo"
          :src="tool.logo"
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
          <h3 class="min-w-0 truncate text-[15px] leading-tight font-semibold">
            <NuxtLink :to="`/products/${tool.slug}`" class="after:absolute after:inset-0 after:rounded-xl">{{ tool.name }}</NuxtLink>
          </h3>
          <span v-if="tool.featured" class="shrink-0">
            <UIcon name="i-lucide-sparkles" class="text-primary size-3.5" aria-hidden="true" />
            <span class="sr-only">Featured</span>
          </span>
        </div>
        <p class="text-muted-foreground mt-1 line-clamp-2 min-h-10 text-[13px] leading-5">{{ tool.description }}</p>
      </div>
    </div>
    <div class="mt-auto flex min-w-0 items-center gap-2 pt-3">
      <span v-if="tool.openSource && tool.categorySlug !== 'open-source'" class="bg-primary/10 text-primary shrink-0 rounded-md px-2 py-0.5 text-[11px] font-semibold">Open Source</span>
      <span class="bg-secondary text-secondary-foreground ml-auto min-w-0 truncate rounded-md px-2 py-0.5 text-[11px] font-medium">{{ tool.category }}</span>
    </div>
  </article>
</template>
