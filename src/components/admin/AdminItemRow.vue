<script setup lang="ts">
import { nextTick, ref, useId, useTemplateRef } from 'vue';

import BaseButton from '@/components/BaseButton.vue';

defineProps<{ title: string; itemLabel: string; archived: boolean }>();
const emit = defineEmits<{ edit: []; toggleArchive: []; delete: [] }>();
const detailsId = useId();
const expanded = ref(false);
const confirmDelete = ref(false);
const deleteButton = useTemplateRef<HTMLButtonElement>('deleteButton');
const cancelDeleteButton = useTemplateRef<{ $el: HTMLButtonElement }>('cancelDeleteButton');

/** Moves focus after Vue adds or removes the inline confirmation controls. */
async function setDeleteConfirmation(isOpen: boolean): Promise<void> {
  confirmDelete.value = isOpen;
  await nextTick();
  const button = isOpen ? cancelDeleteButton.value?.$el : deleteButton.value;
  button?.focus();
}
</script>

<template>
  <li class="px-4 py-4 sm:px-6">
    <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
      <div class="min-w-0">
        <h2>
          <button
            type="button"
            class="group inline-flex min-h-9 items-center gap-2.5 rounded-sm text-left font-semibold text-ink hover:text-accent"
            :aria-expanded="expanded"
            :aria-controls="detailsId"
            @click="expanded = !expanded"
          >
            <span
              aria-hidden="true"
              class="size-2 shrink-0 border-r border-b border-muted transition-transform group-hover:border-accent"
              :class="expanded ? 'rotate-45' : '-rotate-45'"
            />
            <span class="wrap-anywhere">{{ title }}</span>
          </button>
        </h2>
        <div
          v-if="$slots.metadata"
          class="ml-[1.125rem] flex flex-wrap items-center gap-x-3 gap-y-1"
        >
          <slot name="metadata" />
        </div>
      </div>
      <div class="flex flex-wrap gap-x-1 sm:shrink-0">
        <button
          type="button"
          class="row-action text-ink hover:border-line hover:bg-canvas"
          :aria-label="`Edit ${title}`"
          aria-haspopup="dialog"
          @click="emit('edit')"
        >
          Edit
        </button>
        <button
          type="button"
          class="row-action text-muted hover:border-line hover:bg-canvas hover:text-ink"
          :aria-label="`${archived ? 'Restore' : 'Archive'} ${title}`"
          @click="emit('toggleArchive')"
        >
          {{ archived ? 'Restore' : 'Archive' }}
        </button>
        <button
          ref="deleteButton"
          type="button"
          class="row-action text-muted hover:border-rose-400/30 hover:bg-rose-400/10 hover:text-rose-200"
          :aria-label="`Delete ${title}`"
          @click="setDeleteConfirmation(true)"
        >
          Delete
        </button>
      </div>
    </div>

    <div
      v-show="expanded"
      :id="detailsId"
      class="mt-3 rounded-lg border border-line bg-canvas px-4 py-3 text-sm text-muted"
    >
      <slot name="details" />
    </div>

    <div
      v-if="confirmDelete"
      class="mt-3 rounded-lg border border-rose-400/30 bg-rose-400/5 px-4 py-3"
    >
      <p class="text-sm text-rose-200 wrap-anywhere">Delete “{{ title }}”?</p>
      <div class="mt-3 flex flex-wrap gap-2">
        <BaseButton
          ref="cancelDeleteButton"
          variant="secondary"
          @click="setDeleteConfirmation(false)"
        >
          Cancel
        </BaseButton>
        <button
          type="button"
          class="rounded-md border border-rose-400/40 bg-rose-400/10 px-4 py-2.5 text-sm font-semibold text-rose-200 transition-colors hover:bg-rose-400/20"
          @click="emit('delete')"
        >
          Delete {{ itemLabel }}
        </button>
      </div>
    </div>
  </li>
</template>

<style scoped>
@reference '../../style.css';

.row-action {
  @apply min-h-9 rounded-md border border-transparent px-2.5 text-sm font-medium transition-colors;
}
</style>
