<script setup lang="ts">
import { SquarePenIcon, Trash2Icon } from 'lucide-vue-next';
import { nextTick, ref, useTemplateRef } from 'vue';

import BaseButton from '@/components/BaseButton.vue';
import AdminEditorForm from '@/components/admin/AdminEditorForm.vue';
import AdminMediaPreview from '@/features/admin/AdminMediaPreview.vue';
import type { AdminProject, DraftProjectMedia, ProjectDraft } from '@/features/admin/adminProjects';
import type { ProjectStatus } from '@/types';

const { project } = defineProps<{ project: AdminProject | undefined }>();
const emit = defineEmits<{ save: [draft: ProjectDraft]; cancel: [] }>();

const fileInput = useTemplateRef<HTMLInputElement>('fileInput');
const selectFilesButton = useTemplateRef<InstanceType<typeof BaseButton>>('selectFilesButton');
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

/** Accepts valid images and videos even when the batch contains unsupported files. */
function addFiles(files: FileList): void {
  fileError.value = '';

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
}

function onFileChange(): void {
  const input = fileInput.value;
  if (!input?.files) return;

  addFiles(input.files);
  // Reset the picker so choosing the same file again dispatches another change event.
  input.value = '';
}

function onDrop(event: DragEvent): void {
  const files = event.dataTransfer?.files;
  if (files?.length) addFiles(files);
}

/** Returns keyboard focus to the file picker trigger after removing an attachment. */
async function removeAttachment(id: number): Promise<void> {
  attachments.value = attachments.value.filter((attachment) => attachment.id !== id);
  await nextTick();
  selectFilesButton.value?.focus();
}

function save(): void {
  if (!title.value || !description.value) {
    formError.value = 'Enter a project title and description.';
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
    media: attachments.value.map(({ item }) => item),
  });
}
</script>

<template>
  <AdminEditorForm
    :title="project ? 'Edit project' : 'Add project'"
    :submit-label="project ? 'Save changes' : 'Add project'"
    :error="formError"
    @submit="save"
    @cancel="emit('cancel')"
  >
    <div class="sm:col-span-2">
      <label for="project-title" class="admin-field-label">Title</label>
      <input id="project-title" v-model.trim="title" class="admin-field" required autofocus />
    </div>
    <div>
      <label for="project-timeline" class="admin-field-label"
        >Timeline <span class="font-normal text-muted">(optional)</span></label
      >
      <input
        id="project-timeline"
        v-model.trim="timeline"
        class="admin-field"
        placeholder="e.g. May 2025 – Present"
      />
    </div>
    <div>
      <label for="project-status" class="admin-field-label">Status</label>
      <select id="project-status" v-model="status" class="admin-field">
        <option v-for="option in statuses" :key="option">{{ option }}</option>
      </select>
    </div>
    <div class="sm:col-span-2">
      <label for="project-tags" class="admin-field-label"
        >Tags <span class="font-normal text-muted">(optional)</span></label
      >
      <input
        id="project-tags"
        v-model="tags"
        class="admin-field"
        aria-describedby="project-tags-hint"
      />
      <p id="project-tags-hint" class="mt-1.5 text-xs text-muted">Separate tags with commas.</p>
    </div>
    <div class="sm:col-span-2">
      <label for="project-description" class="admin-field-label">Description</label>
      <textarea
        id="project-description"
        v-model.trim="description"
        class="admin-field min-h-24 resize-y"
        rows="3"
        required
      />
    </div>

    <fieldset class="min-w-0 border-t border-line pt-3 sm:col-span-2">
      <legend class="pr-3 text-sm font-semibold">
        Media <span class="font-normal text-muted">(optional)</span>
      </legend>

      <div class="drop-zone-outline" @drop.prevent="onDrop" @dragover.prevent @dragenter.prevent>
        <div class="flex flex-col justify-center">
          <h3>Drop Your Favorite Files Here</h3>
          <p class="text-sm text-muted">You can also click to select files.</p>
          <BaseButton ref="selectFilesButton" class="mt-4 self-center" @click="fileInput?.click()">
            <SquarePenIcon class="h-4 w-4" /> Select file
          </BaseButton>
          <input
            id="project-media"
            ref="fileInput"
            type="file"
            accept="image/*,video/*"
            multiple
            hidden
            @change="onFileChange"
          />
        </div>
      </div>
      <p v-if="fileError" role="alert" class="mt-2 text-sm text-rose-200">{{ fileError }}</p>

      <ul v-if="attachments.length" class="mt-4 space-y-3" aria-label="Attachments">
        <li
          v-for="({ id, item }, index) in attachments"
          :key="id"
          class="flex justify-between items-center rounded-lg border border-line bg-canvas p-6 sm:grid-cols-[8rem_minmax(0,1fr)]"
        >
          <AdminMediaPreview :item="item" />
          <div>
            <button
              type="button"
              class="rounded-sm text-s bg-red-900 p-2 px-4 text-white hover:bg-red-700 transition flex items-center"
              :aria-label="`Remove attachment ${index + 1}`"
              @click="removeAttachment(id)"
            >
              <Trash2Icon class="mr-2 h-4 w-4" /> Remove
            </button>
          </div>
        </li>
      </ul>
    </fieldset>
  </AdminEditorForm>
</template>

<style scoped>
@reference '../../style.css';

.drop-zone-outline {
  @apply flex min-h-48 items-center justify-center rounded-md border border-dashed border-control bg-canvas text-ink;
}
</style>
