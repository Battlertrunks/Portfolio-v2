<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import PageContainer from '@/components/PageContainer.vue'
import type { NavItem } from '@/types'

const navItems: readonly NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
]

const route = useRoute()
const isMenuOpen = ref(false)
const menuButton = ref<HTMLButtonElement | null>(null)

watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false
  },
)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenuOnEscape(event: KeyboardEvent) {
  if (event.key !== 'Escape' || !isMenuOpen.value) {
    return
  }

  isMenuOpen.value = false
  menuButton.value?.focus()
}

onMounted(() => window.addEventListener('keydown', closeMenuOnEscape))
onBeforeUnmount(() => window.removeEventListener('keydown', closeMenuOnEscape))
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur">
    <PageContainer>
      <div
        class="flex flex-wrap items-center justify-between gap-x-4 py-3 md:h-16 md:flex-nowrap md:py-0"
      >
        <RouterLink
          to="/"
          class="rounded-md text-lg font-bold tracking-tight text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          Gavin Szczesniak<span class="text-accent">.</span>
        </RouterLink>

        <button
          ref="menuButton"
          type="button"
          class="inline-flex h-11 w-11 items-center justify-center rounded-md border border-control text-ink transition-colors hover:border-accent hover:text-accent md:hidden"
          :aria-expanded="isMenuOpen"
          aria-controls="primary-navigation"
          :aria-label="isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'"
          @click="toggleMenu"
        >
          <svg
            v-if="isMenuOpen"
            aria-hidden="true"
            focusable="false"
            class="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
          <svg
            v-else
            aria-hidden="true"
            focusable="false"
            class="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>

        <nav
          id="primary-navigation"
          aria-label="Primary"
          class="w-full md:w-auto"
          :class="isMenuOpen ? 'block' : 'hidden md:block'"
        >
          <ul
            class="flex flex-col gap-1 border-t border-line pt-3 md:flex-row md:items-center md:gap-6 md:border-0 md:pt-0"
          >
            <li v-for="item in navItems" :key="item.to">
              <RouterLink
                :to="item.to"
                class="block rounded-md px-1 py-3 text-sm font-medium text-muted transition-colors hover:text-accent hover:underline md:py-2"
                exact-active-class="text-accent underline decoration-2 underline-offset-4"
                @click="isMenuOpen = false"
              >
                {{ item.label }}
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>
    </PageContainer>
  </header>
</template>
