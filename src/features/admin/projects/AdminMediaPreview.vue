<script setup lang="ts">
import { ref, watch } from 'vue';

import type { DraftProjectMedia } from '@/features/admin/projects/adminProjects';

const { item } = defineProps<{ item: DraftProjectMedia }>();
const previewUrl = ref('');

watch(
  () => ('file' in item ? item.file : item.src),
  (source, _previous, onCleanup) => {
    if (typeof source === 'string') {
      previewUrl.value = source;
      return;
    }

    const url = URL.createObjectURL(source);
    previewUrl.value = url;
    onCleanup(() => URL.revokeObjectURL(url));
  },
  { immediate: true },
);
</script>

<template>
  <div class="max-w-36">
    <img
      v-if="item.type === 'image'"
      :src="previewUrl"
      :alt="item.alt"
      class="aspect-video w-full rounded-md bg-surface object-contain"
      loading="lazy"
    />
    <video
      v-else
      :src="previewUrl"
      :poster="item.poster"
      :aria-label="item.label"
      class="aspect-video w-full rounded-md bg-surface object-contain"
      controls
      playsinline
      preload="metadata"
    />
  </div>
</template>
