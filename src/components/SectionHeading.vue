<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title: string
  eyebrow?: string
  description?: string
  level?: 1 | 2
  headingId?: string
}

const props = withDefaults(defineProps<Props>(), {
  eyebrow: undefined,
  description: undefined,
  level: 2,
  headingId: undefined,
})

const headingTag = computed<'h1' | 'h2'>(() => (props.level === 1 ? 'h1' : 'h2'))
</script>

<template>
  <div class="max-w-2xl">
    <p v-if="eyebrow" class="text-sm font-semibold tracking-widest text-accent uppercase">
      {{ eyebrow }}
    </p>
    <component
      :is="headingTag"
      :id="headingId"
      class="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl"
    >
      {{ title }}
    </component>
    <p v-if="description" class="mt-4 text-base leading-7 text-muted">
      {{ description }}
    </p>
  </div>
</template>
