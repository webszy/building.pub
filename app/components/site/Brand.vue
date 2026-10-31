<script setup lang="ts">
import { siteBrand } from '~~/shared/site'
</script>

<template>
  <NuxtLink class="flex min-w-0 items-center gap-2" to="/">
    <img :src="siteBrand.logoPath" :alt="siteBrand.name" width="28" height="28" class="size-7 shrink-0 rounded-md">
    <span class="truncate text-base font-semibold tracking-tight">{{ siteBrand.name }}</span>
  </NuxtLink>
</template>
