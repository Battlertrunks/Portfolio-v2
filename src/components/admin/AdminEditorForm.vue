<script setup lang="ts">
import { onBeforeUnmount, onMounted, useId, useTemplateRef } from 'vue';

import BaseButton from '@/components/BaseButton.vue';

withDefaults(defineProps<{ title: string; submitLabel: string; error?: string }>(), { error: '' });
const emit = defineEmits<{ submit: []; cancel: [] }>();
const dialog = useTemplateRef<HTMLDialogElement>('dialog');
const headingId = useId();

onMounted(() => dialog.value?.showModal());
onBeforeUnmount(() => dialog.value?.close());
</script>

<template>
  <dialog
    ref="dialog"
    :aria-labelledby="headingId"
    class="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto overscroll-contain rounded-xl border border-line bg-surface text-ink shadow-2xl backdrop:bg-canvas/80 backdrop:backdrop-blur-sm"
    @cancel.self.prevent="emit('cancel')"
  >
    <form @submit.prevent="emit('submit')">
      <div class="border-b border-line px-5 py-4 sm:px-6">
        <h2 :id="headingId" class="text-xl font-semibold tracking-tight">{{ title }}</h2>
      </div>

      <div class="grid gap-5 px-5 py-5 sm:grid-cols-2 sm:px-6">
        <slot />
      </div>

      <div
        class="sticky bottom-0 flex flex-wrap items-center justify-end gap-2 border-t border-line bg-surface px-5 py-4 sm:px-6"
      >
        <p v-if="error" role="alert" class="w-full text-sm text-rose-200">{{ error }}</p>
        <BaseButton variant="secondary" @click="emit('cancel')">Cancel</BaseButton>
        <BaseButton type="submit">{{ submitLabel }}</BaseButton>
      </div>
    </form>
  </dialog>
</template>

<style scoped>
@reference '../../style.css';

/* Slotted controls opt in to the shared label and input styles. */
:deep(.admin-field-label) {
  @apply mb-1.5 block text-sm font-medium text-ink;
}

:deep(.admin-field) {
  @apply block w-full rounded-md border border-control bg-canvas px-3 py-2 text-sm text-ink placeholder:text-muted;
}
</style>
