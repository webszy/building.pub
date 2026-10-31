<script setup lang="ts">
import { useAuth } from '@clerk/nuxt/composables'
import { UserButton } from '@clerk/nuxt/components'
const { isLoaded, isSignedIn } = useAuth()
const { open } = useLoginModal()
</script>
<template>
  <span v-if="isLoaded && isSignedIn" class="ml-1 inline-flex"><UserButton /></span>
  <button v-else type="button" class="bg-primary text-primary-foreground hover:bg-primary/80 ml-1 inline-flex h-8 items-center rounded-full px-3.5 text-sm font-medium disabled:opacity-50" :disabled="!isLoaded" @click="open()">Sign In</button>
</template>
