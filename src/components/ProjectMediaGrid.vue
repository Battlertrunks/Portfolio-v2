<script setup lang="ts">
import { computed } from 'vue'

import type { ProjectMedia } from '@/types'

interface Props {
  media: readonly ProjectMedia[]
}

const props = defineProps<Props>()

const visibleMedia = computed(() => props.media.slice(0, 4))

const gridClasses = computed(() => {
  switch (visibleMedia.value.length) {
    case 1:
      return 'grid-cols-1'
    case 2:
      return 'grid-cols-2'
    default:
      return 'grid-cols-2 grid-rows-2'
  }
})
</script>

<template>
  <div class="overflow-hidden rounded-lg border border-line bg-line">
    <div class="grid aspect-[4/3] gap-0.5 sm:aspect-video" :class="gridClasses">
      <div
        v-for="(item, index) in visibleMedia"
        :key="`${item.type}-${index}`"
        class="group relative min-h-0 overflow-hidden bg-surface"
        :class="{ 'row-span-2': visibleMedia.length === 3 && index === 0 }"
      >
        <img
          v-if="item.type === 'image'"
          :src="item.src"
          :alt="item.alt"
          class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          loading="lazy"
          decoding="async"
        />
        <video
          v-else
          :src="item.src"
          :poster="item.poster"
          :aria-label="item.label"
          class="h-full w-full object-cover"
          controls
          playsinline
          preload="metadata"
        />
      </div>
    </div>
  </div>
</template>
