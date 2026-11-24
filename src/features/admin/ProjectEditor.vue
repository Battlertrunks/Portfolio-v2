<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue';

import BaseButton from '@/components/BaseButton.vue';
import AdminMediaPreview from '@/features/admin/AdminMediaPreview.vue';
import type { AdminProject, DraftProjectMedia, ProjectDraft } from '@/features/admin/adminProjects';
import type { ProjectStatus } from '@/types';

const { project } = defineProps<{ project: AdminProject | undefined }>();
const emit = defineEmits<{ save: [draft: ProjectDraft]; cancel: [] }>();

const dialog = useTemplateRef<HTMLDialogElement>('dialog');
const fileInput = useTemplateRef<HTMLInputElement>('fileInput');
const title = ref(project?.title ?? '');
const timeline = ref(project?.timeline ?? '');
const statuses: readonly ProjectStatus[] = ['Planned', 'In progress', 'Shipped'];
const status = ref<ProjectStatus>(project?.status ?? 'Planned');
const tags = ref(project?.tags.join(', ') ?? '');
const description = ref(project?.description ?? '');
let nextAttachmentId = 0;
const attachments = ref(
  (project?.media ?? []).map((item) => ({ id: nextAttachmentId++, item: { ...item } })),
);
const fileError = ref('');
const formError = ref('');

onMounted(() => dialog.value?.showModal());
onBeforeUnmount(() => dialog.value?.close());

/**
 * Adds files to the attachments list.
 * @param {Event} event - The file input change event.
 */
function addFiles(event: Event): void {
  const input = event.currentTarget as HTMLInputElement;
  const files = Array.from(input.files ?? []);
  fileError.value = '';

  // Validate each file before adding it to the attachments list.
  for (const file of files) {
    const type = file.type.split('/')[0];
    if (type !== 'image' && type !== 'video') {
      fileError.value = 'Choose image or video files.';
      continue;
    }

    const item: DraftProjectMedia =
      type === 'image' ? { type, file, alt: '' } : { type, file, label: file.name };
    attachments.value.push({ id: nextAttachmentId++, item });
  }

  input.value = '';
}

/**
 * Removes an attachment from the list by its ID.
 * @param {number} id - The ID of the attachment to remove.
 */
async function removeAttachment(id: number): Promise<void> {
  attachments.value = attachments.value.filter((attachment) => attachment.id !== id);
  await nextTick();
  fileInput.value?.focus();
}

/**
 * Saves the project by emitting the 'save' event with the project data.
 * @emits save - The event emitted with the project data when the project is saved.
 */
function save(): void {
  const media = attachments.value.map(({ item }) => item);

  if (
    !title.value ||
    !description.value ||
    media.some((item) => !(item.type === 'image' ? item.alt : item.label))
  ) {
    formError.value = 'Enter a title, description, and a label for each attachment.';
    return;
  }

  emit('save', {
    title: title.value,
    timeline: timeline.value || undefined,
    status: status.value,
    tags: [
      ...new Set(
        tags.value
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
      ),
    ],
    description: description.value,
    media,
  });
}
</script>

<template>
  <dialog
    ref="dialog"
    aria-labelledby="project-editor-title"
    class="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto overscroll-contain rounded-xl border border-line bg-surface text-ink shadow-2xl backdrop:bg-canvas/80 backdrop:backdrop-blur-sm"
    @cancel.prevent="emit('cancel')"
  >
    <form @submit.prevent="save">
      <div class="border-b border-line px-5 py-4 sm:px-6">
        <h2 id="project-editor-title" class="text-xl font-semibold tracking-tight">
          {{ project ? 'Edit project' : 'Add project' }}
        </h2>
      </div>

      <div class="grid gap-5 px-5 py-5 sm:grid-cols-2 sm:px-6">
        <div class="sm:col-span-2">
          <label for="project-title" class="field-label">Title</label>
          <input id="project-title" v-model.trim="title" class="field" required autofocus />
        </div>
        <div>
          <label for="project-timeline" class="field-label"
            >Timeline <span class="font-normal text-muted">(optional)</span></label
          >
          <input
            id="project-timeline"
            v-model.trim="timeline"
            class="field"
            placeholder="e.g. May 2025 – Present"
          />
        </div>
        <div>
          <label for="project-status" class="field-label">Status</label>
          <select id="project-status" v-model="status" class="field">
            <option v-for="option in statuses" :key="option">{{ option }}</option>
          </select>
        </div>
        <div class="sm:col-span-2">
          <label for="project-tags" class="field-label"
            >Tags <span class="font-normal text-muted">(optional)</span></label
          >
          <input
            id="project-tags"
            v-model="tags"
            class="field"
            aria-describedby="project-tags-hint"
          />
          <p id="project-tags-hint" class="mt-1.5 text-xs text-muted">Separate tags with commas.</p>
        </div>
        <div class="sm:col-span-2">
          <label for="project-description" class="field-label">Description</label>
          <textarea
            id="project-description"
            v-model.trim="description"
            class="field min-h-24 resize-y"
            rows="3"
            required
          />
        </div>

        <fieldset class="min-w-0 border-t border-line pt-3 sm:col-span-2">
          <legend class="pr-3 text-sm font-semibold">
            Media <span class="font-normal text-muted">(optional)</span>
          </legend>
          <label for="project-media" class="field-label">Attach images or videos</label>
          <input
            id="project-media"
            ref="fileInput"
            type="file"
            multiple
            accept="image/*,video/*"
            class="block w-full rounded-md border border-dashed border-control bg-canvas px-3 py-2 text-sm text-muted file:mr-3 file:rounded-sm file:border-0 file:bg-accent-soft file:px-2.5 file:py-1 file:font-semibold file:text-accent-soft-ink hover:file:bg-accent-soft/75"
            @change="addFiles"
          />
          <p v-if="fileError" role="alert" class="mt-2 text-sm text-rose-200">{{ fileError }}</p>

          <ul v-if="attachments.length" class="mt-4 space-y-3" aria-label="Attachments">
            <li
              v-for="({ id, item }, index) in attachments"
              :key="id"
              class="grid items-start gap-3 rounded-lg border border-line bg-canvas p-3 sm:grid-cols-[8rem_minmax(0,1fr)]"
            >
              <AdminMediaPreview :item="item" />
              <div class="min-w-0">
                <label :for="`project-media-label-${id}`" class="field-label">
                  {{ item.type === 'image' ? 'Alt text' : 'Video label' }}
                </label>
                <input
                  v-if="item.type === 'image'"
                  :id="`project-media-label-${id}`"
                  v-model.trim="item.alt"
                  class="field"
                  required
                />
                <input
                  v-else
                  :id="`project-media-label-${id}`"
                  v-model.trim="item.label"
                  class="field"
                  required
                />
                <button
                  type="button"
                  class="mt-2 rounded-sm text-sm font-medium text-muted hover:text-rose-200"
                  :aria-label="`Remove attachment ${index + 1}`"
                  @click="removeAttachment(id)"
                >
                  Remove
                </button>
              </div>
            </li>
          </ul>
        </fieldset>
      </div>

      <div
        class="sticky bottom-0 flex flex-wrap items-center justify-end gap-2 border-t border-line bg-surface px-5 py-4 sm:px-6"
      >
        <p v-if="formError" role="alert" class="w-full text-sm text-rose-200">{{ formError }}</p>
        <BaseButton variant="secondary" @click="emit('cancel')">Cancel</BaseButton>
        <BaseButton type="submit">{{ project ? 'Save changes' : 'Add project' }}</BaseButton>
      </div>
    </form>
  </dialog>
</template>

<style scoped>
@reference '../../style.css';

.field-label {
  @apply mb-1.5 block text-sm font-medium text-ink;
}

.field {
  @apply block w-full rounded-md border border-control bg-canvas px-3 py-2 text-sm text-ink placeholder:text-muted;
}
</style>
