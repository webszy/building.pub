<script setup lang="ts">
const route = useRoute()
const order = computed(() => typeof route.query.order === 'string' ? route.query.order : '')
usePageSeo({
  title: 'Pricing',
  description: 'Credit packs for building.pub. Purchases are optional and not required to browse the directory.',
  path: '/pricing',
  robots: () => order.value ? 'noindex, nofollow' : 'noindex',
})
</script>
<template>
  <div>
    <div class="page-sheet mx-auto w-full max-w-[1320px] px-4 py-8 sm:px-6 lg:px-8">
      <h1>Simple, flexible pricing.</h1>
      <p>One-time credit packs. Choose what works for you.</p>
      <BillingPaymentStatus v-if="order" :key="order" :order="order" />
      <BillingPlans />
    </div>
    <SiteFooter />
  </div>
</template>
