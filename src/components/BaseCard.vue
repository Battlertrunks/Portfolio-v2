<script setup lang="ts">
withDefaults(
  defineProps<{
    as?: 'div' | 'article' | 'li'
  }>(),
  {
    as: 'div',
  },
)
</script>

<template>
  <component :is="as" class="rounded-lg border border-line bg-surface p-6 shadow-sm">
    <slot />
  </component>
</template>
