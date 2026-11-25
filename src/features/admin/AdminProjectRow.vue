<script setup lang="ts">
import AdminItemRow from '@/components/admin/AdminItemRow.vue';
import type { AdminProject } from '@/features/admin/adminProjects';

defineProps<{ project: AdminProject }>();
const emit = defineEmits<{ edit: []; toggleArchive: []; delete: [] }>();
</script>

<template>
  <AdminItemRow
    :title="project.title"
    :archived="project.archived"
    item-label="project"
    @edit="emit('edit')"
    @toggle-archive="emit('toggleArchive')"
    @delete="emit('delete')"
  >
    <template #metadata>
      <span
        class="rounded-full px-2.5 py-0.5 text-xs font-semibold"
        :class="
          project.status === 'Planned'
            ? 'bg-canvas text-muted'
            : 'bg-accent-soft text-accent-soft-ink'
        "
      >
        {{ project.status }}
      </span>
      <span v-if="project.timeline" class="text-xs text-muted wrap-anywhere">{{
        project.timeline
      }}</span>
    </template>

    <template #details>
      <p class="leading-6 wrap-anywhere whitespace-pre-line">{{ project.description }}</p>
      <ul v-if="project.tags.length" aria-label="Tags" class="mt-3 flex flex-wrap gap-2">
        <li
          v-for="tag in project.tags"
          :key="tag"
          class="rounded-full border border-line px-2.5 py-0.5 text-xs wrap-anywhere"
        >
          {{ tag }}
        </li>
      </ul>
      <p v-if="project.media.length" class="mt-3 text-xs">
        {{ project.media.length }} {{ project.media.length === 1 ? 'attachment' : 'attachments' }}
      </p>
    </template>
  </AdminItemRow>
</template>
