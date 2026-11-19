<script setup lang="ts">
import { RouterView } from 'vue-router'

import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import RetroBackground from '@/components/RetroBackground.vue'
import RetroStickers from '@/components/RetroStickers.vue'
</script>

<template>
  <div class="relative isolate flex min-h-dvh flex-col">
    <RetroBackground />
    <a
      href="#main-content"
      class="sr-only rounded-md bg-accent px-4 py-3 font-semibold text-on-accent focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50"
    >
      Skip to content
    </a>
    <AppHeader />
    <main id="main-content" class="relative isolate flex-1" tabindex="-1">
      <RetroStickers />
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>
