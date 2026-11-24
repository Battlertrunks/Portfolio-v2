<script setup lang="ts" generic="Item extends { id: string; archived: boolean }">
import { computed, nextTick, useId, useTemplateRef } from 'vue';

import BaseButton from '@/components/BaseButton.vue';
import BaseCard from '@/components/BaseCard.vue';
import PageContainer from '@/components/PageContainer.vue';
import SectionHeading from '@/components/SectionHeading.vue';

const props = defineProps<{
  title: string;
  description: string;
  itemLabel: string;
  itemsLabel: string;
  items: readonly Item[];
  announcement: string;
}>();
const showArchived = defineModel<boolean>('showArchived', { required: true });
const emit = defineEmits<{ add: [] }>();
defineSlots<{
  row(props: { item: Item }): void;
  editor?(): void;
}>();

const headingId = useId();
const activeFilter = useTemplateRef<HTMLButtonElement>('activeFilter');
const archiveFilter = useTemplateRef<HTMLButtonElement>('archiveFilter');
const archivedCount = computed(() => props.items.filter((item) => item.archived).length);
const visibleItems = computed(() =>
  props.items.filter((item) => item.archived === showArchived.value),
);

/** Returns focus to the selected filter after an action removes its row from the list. */
async function focusCurrentFilter(): Promise<void> {
  await nextTick();
  const filter = showArchived.value ? archiveFilter.value : activeFilter.value;
  filter?.focus();
}

defineExpose({ focusCurrentFilter });
</script>

<template>
  <PageContainer>
    <section class="py-16 sm:py-24" :aria-labelledby="headingId">
      <SectionHeading
        :heading-id="headingId"
        eyebrow="Portfolio admin"
        :title="title"
        :level="1"
        :description="description"
      />

      <BaseCard padding="none" class="mt-8 sm:mt-10">
        <div
          class="flex flex-wrap gap-2 border-b border-line px-4 py-3 sm:px-6"
          role="group"
          :aria-label="`Filter ${itemsLabel}`"
        >
          <button
            ref="activeFilter"
            type="button"
            class="rounded-md px-3 py-2 text-sm font-semibold transition-colors"
            :class="
              showArchived ? 'text-muted hover:text-ink' : 'bg-accent-soft text-accent-soft-ink'
            "
            :aria-pressed="!showArchived"
            @click="showArchived = false"
          >
            Active <span class="ml-1 tabular-nums">{{ items.length - archivedCount }}</span>
          </button>
          <button
            ref="archiveFilter"
            type="button"
            class="rounded-md px-3 py-2 text-sm font-semibold transition-colors"
            :class="
              showArchived ? 'bg-accent-soft text-accent-soft-ink' : 'text-muted hover:text-ink'
            "
            :aria-pressed="showArchived"
            @click="showArchived = true"
          >
            Archived <span class="ml-1 tabular-nums">{{ archivedCount }}</span>
          </button>
        </div>

        <ul
          v-if="visibleItems.length"
          class="divide-y divide-line"
          :aria-label="`${showArchived ? 'Archived' : 'Active'} ${itemsLabel}`"
        >
          <template v-for="item in visibleItems" :key="item.id">
            <slot name="row" :item="item" />
          </template>
        </ul>
        <p v-else class="px-4 py-8 text-sm text-muted sm:px-6">
          No {{ showArchived ? 'archived' : 'active' }} {{ itemsLabel }}.
        </p>

        <div
          class="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-4 sm:px-6"
        >
          <BaseButton aria-haspopup="dialog" @click="emit('add')">
            <span aria-hidden="true" class="text-lg leading-none">+</span>
            Add {{ itemLabel }}
          </BaseButton>
          <p role="status" class="text-sm text-muted">{{ announcement }}</p>
        </div>
      </BaseCard>

      <slot name="editor" />
    </section>
  </PageContainer>
</template>
