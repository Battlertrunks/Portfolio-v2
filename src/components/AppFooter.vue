<script setup lang="ts">
import PageContainer from '@/components/PageContainer.vue'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="mt-20 border-t border-line bg-surface">
    <PageContainer>
      <div
        class="flex flex-col gap-3 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between"
      >
        <p>© {{ currentYear }} Gavin Szczesniak. All rights reserved.</p>
        <p>Built with Vue 3, TypeScript, and Tailwind CSS.</p>
      </div>
    </PageContainer>
  </footer>
</template>
