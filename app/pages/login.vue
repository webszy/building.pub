<script setup lang="ts">
import { resolveSafeReturnTo } from '~/utils/safe-return-to'
const route = useRoute()
const destination = computed(() => resolveSafeReturnTo(route.query.returnTo))
usePageSeo({ title: 'Sign in', description: 'Sign in to building.pub.', path: '/login', robots: 'noindex, nofollow' })
</script>
<template>
  <div>
    <div class="page-sheet mx-auto w-full max-w-[1320px] px-4 py-8 sm:px-6 lg:px-8">
      <section class="auth-page">
        <h1>Welcome back.</h1>
        <p>Sign in or create an account to get started.</p>
        <AuthLoginPanel :destination="destination" />
      </section>
    </div>
    <SiteFooter />
  </div>
</template>
