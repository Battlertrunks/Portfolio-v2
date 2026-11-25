<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';

import AdminCollectionView from '@/components/admin/AdminCollectionView.vue';
import AdminProjectRow from '@/features/admin/projects/AdminProjectRow.vue';
import ProjectEditor from '@/features/admin/projects/ProjectEditor.vue';
import {
  initialAdminProjects,
  type AdminProject,
  type ProjectDraft,
} from '@/features/admin/projects/adminProjects';

const projects = ref(initialAdminProjects());
const showArchived = ref(false);
const editor = ref<{ project?: AdminProject }>();
const announcement = ref('');
const collection = useTemplateRef('collection');

/**
 * Adds new projects within the projects ref
 * @param {ProjectDraft} draft - Contains the properties of the project
 */
function saveProject(draft: ProjectDraft): void {
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

/**
 * Makes active projects go to the archive
 * @param {AdminProject} project - The project being archived
 */
function toggleArchive(project: AdminProject): void {
  project.archived = !project.archived;
  announcement.value = `${project.title} ${project.archived ? 'archived' : 'restored'}.`;
  void collection.value?.focusCurrentFilter();
}

/**
 * Deletes the project from the database
 * @param {AdminProject} project - The project being deleted
 */
function deleteProject(project: AdminProject): void {
  projects.value = projects.value.filter(({ id }) => id !== project.id);
  announcement.value = `${project.title} deleted.`;
  void collection.value?.focusCurrentFilter();
}
</script>

<template>
  <AdminCollectionView
    ref="collection"
    v-model:show-archived="showArchived"
    title="Manage projects"
    description="Changes are available for this visit only."
    item-label="project"
    items-label="projects"
    :items="projects"
    :announcement="announcement"
    @add="editor = {}"
  >
    <template #row="{ item: project }">
      <AdminProjectRow
        :project="project"
        @edit="editor = { project }"
        @toggle-archive="toggleArchive(project)"
        @delete="deleteProject(project)"
      />
    </template>

    <template #editor>
      <ProjectEditor
        v-if="editor"
        :project="editor.project"
        @save="saveProject"
        @cancel="editor = undefined"
      />
    </template>
  </AdminCollectionView>
</template>
