<script setup lang="ts">
import { RouterView } from 'vue-router'

import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <a
      href="#main-content"
      class="sr-only rounded-md bg-accent px-4 py-3 font-semibold text-on-accent focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50"
    >
      Skip to content
    </a>
    <AppHeader />
    <main id="main-content" class="flex-1" tabindex="-1">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>
