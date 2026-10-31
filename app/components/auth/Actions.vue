<script setup lang="ts">
const configured = useRuntimeConfig().public.clerkConfigured
const { open } = useLoginModal()
</script>
<template>
  <ClientOnly v-if="configured">
    <AuthClerkActions />
    <template #fallback>
      <NuxtLink to="/login" class="bg-primary text-primary-foreground hover:bg-primary/80 ml-1 inline-flex h-8 items-center rounded-full px-3.5 text-sm font-medium">Sign In</NuxtLink>
    </template>
  </ClientOnly>
  <button v-else type="button" class="bg-primary text-primary-foreground hover:bg-primary/80 ml-1 inline-flex h-8 items-center rounded-full px-3.5 text-sm font-medium" @click="open()">Sign In</button>
</template>
