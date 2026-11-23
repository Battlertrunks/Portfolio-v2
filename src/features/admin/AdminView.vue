<script setup lang="ts">
import { computed, nextTick, ref, useTemplateRef } from 'vue';

import BaseButton from '@/components/BaseButton.vue';
import BaseCard from '@/components/BaseCard.vue';
import PageContainer from '@/components/PageContainer.vue';
import SectionHeading from '@/components/SectionHeading.vue';
import AdminProjectRow from '@/features/admin/AdminProjectRow.vue';
import ProjectEditor from '@/features/admin/ProjectEditor.vue';
import {
  initialAdminProjects,
  type AdminProject,
  type ProjectDraft,
} from '@/features/admin/adminProjects';

const projects = ref(initialAdminProjects());
const showArchived = ref(false);
const editor = ref<{ project?: AdminProject }>();
const announcement = ref('');
const activeFilter = useTemplateRef<HTMLButtonElement>('activeFilter');
const archiveFilter = useTemplateRef<HTMLButtonElement>('archiveFilter');
const archivedCount = computed(() => projects.value.filter((project) => project.archived).length);
const visibleProjects = computed(() =>
  projects.value.filter((project) => project.archived === showArchived.value),
);

function saveProject(draft: ProjectDraft) {
  const existing = editor.value?.project;

  if (existing) {
    projects.value = projects.value.map((project) =>
      project.id === existing.id ? { ...project, ...draft } : project,
    );
  } else {
    projects.value.push({ ...draft, id: crypto.randomUUID(), archived: false });
    showArchived.value = false;
  }

  announcement.value = `${draft.title} ${existing ? 'updated' : 'added'}.`;
  editor.value = undefined;
}

async function focusCurrentFilter() {
  await nextTick();
  const filter = showArchived.value ? archiveFilter.value : activeFilter.value;
  filter?.focus();
}

function toggleArchive(project: AdminProject) {
  project.archived = !project.archived;
  announcement.value = `${project.title} ${project.archived ? 'archived' : 'restored'}.`;
  void focusCurrentFilter();
}

function deleteProject(project: AdminProject) {
  projects.value = projects.value.filter(({ id }) => id !== project.id);
  announcement.value = `${project.title} deleted.`;
  void focusCurrentFilter();
}
</script>

<template>
  <PageContainer>
    <section class="py-16 sm:py-24" aria-labelledby="admin-title">
      <SectionHeading
        heading-id="admin-title"
        eyebrow="Portfolio admin"
        title="Manage projects"
        :level="1"
        description="Changes are available for this visit only."
      />

      <BaseCard padding="none" class="mt-8 sm:mt-10">
        <div
          class="flex flex-wrap gap-2 border-b border-line px-4 py-3 sm:px-6"
          role="group"
          aria-label="Filter projects"
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
            Active <span class="ml-1 tabular-nums">{{ projects.length - archivedCount }}</span>
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
          v-if="visibleProjects.length"
          class="divide-y divide-line"
          :aria-label="showArchived ? 'Archived projects' : 'Active projects'"
        >
          <AdminProjectRow
            v-for="project in visibleProjects"
            :key="project.id"
            :project="project"
            @edit="editor = { project }"
            @toggle-archive="toggleArchive(project)"
            @delete="deleteProject(project)"
          />
        </ul>
        <p v-else class="px-4 py-8 text-sm text-muted sm:px-6">
          {{ showArchived ? 'No archived projects.' : 'No active projects.' }}
        </p>

        <div
          class="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-4 sm:px-6"
        >
          <BaseButton aria-haspopup="dialog" @click="editor = {}">
            <span aria-hidden="true" class="text-lg leading-none">+</span>
            Add project
          </BaseButton>
          <p role="status" class="text-sm text-muted">{{ announcement }}</p>
        </div>
      </BaseCard>

      <ProjectEditor
        v-if="editor"
        :project="editor.project"
        @save="saveProject"
        @cancel="editor = undefined"
      />
    </section>
  </PageContainer>
</template>
