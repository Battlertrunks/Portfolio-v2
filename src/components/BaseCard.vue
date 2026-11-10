<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  as?: 'div' | 'article' | 'li'
  padding?: 'none' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
  padding: 'md',
})

const paddingClasses = computed(() => {
  if (props.padding === 'none') {
    return ''
  }

  return props.padding === 'lg' ? 'p-6 sm:p-8' : 'p-6'
})
</script>

<template>
  <component
    :is="as"
    class="rounded-xl border border-line bg-surface shadow-sm"
    :class="paddingClasses"
  >
    <slot />
  </component>
</template>
