<script setup lang="ts">
import { siteBrand } from '~~/shared/site'

const links = [
  { label: 'Discover', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Categories', to: '/categories' },
  { label: 'Our Mission', to: '/about' },
]

const linkClass = 'text-muted-foreground hover:text-foreground focus-visible:ring-ring rounded-sm text-sm leading-relaxed break-words transition-colors outline-none hover:underline hover:underline-offset-4 focus-visible:ring-2'
</script>

<template>
  <footer class="bg-muted/20 border-border mt-12 border-t">
    <div class="mx-auto max-w-[1320px] px-4 py-8 sm:px-6 lg:px-8">
      <p class="text-foreground text-lg font-semibold tracking-tight">{{ siteBrand.name }}</p>
      <p class="text-foreground font-serif mt-3 text-3xl leading-snug tracking-tight text-balance italic sm:text-4xl">
        {{ siteBrand.slogan }}
      </p>
      <nav class="mt-8 flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to" :class="linkClass">{{ link.label }}</NuxtLink>
      </nav>
    </div>
    <div class="border-border border-t">
      <div class="text-muted-foreground mx-auto max-w-[1320px] px-4 py-5 text-xs sm:px-6 lg:px-8">
        <span>© {{ new Date().getFullYear() }} {{ siteBrand.name }}. All rights reserved.</span>
      </div>
    </div>
  </footer>
</template>
