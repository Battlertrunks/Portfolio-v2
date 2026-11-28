<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue';

import AdminCollectionView from '@/components/admin/AdminCollectionView.vue';
import AdminProjectRow from '@/features/admin/projects/AdminProjectRow.vue';
import ProjectEditor from '@/features/admin/projects/ProjectEditor.vue';
import {
  type AdminProject,
  type ProjectDraft,
} from '@/features/admin/projects/adminProjects';
import { useProjects } from '@/composables/useProjects';
import { useCreateProject } from '@/composables/useCreateProject';

const projects = ref<AdminProject[]>([]);
const loading = ref<boolean>(true);
const loadError = ref<string | null>(null);

const projectCreationError = ref<string | null>(null);

const showArchived = ref(false);
const editor = ref<{ project?: AdminProject }>();
const announcement = ref('');
const collection = useTemplateRef('collection');

const {
  projects: fetchedProjects,
  error: fetchError,
  fetchProjects

} = useProjects();

async function loadProjects(): Promise<void> {
  try {
    await fetchProjects();

    if (fetchError.value !== null) {
      loadError.value = fetchError.value;
      return;
    }

    projects.value = fetchedProjects.value.map(project => ({
      ...project,
      archived: false,
      media: project.media ?? []
    }));
  } catch (error) {
    loadError.value = error instanceof Error ? error.message : "Failed to load projects";
  } finally {
    loading.value = false;
  }
}

onMounted(loadProjects);

const {
  project: createdProject,
  isLoading,
  error: createError,
  createProject
} = useCreateProject()

/**
 * Adds new projects within the projects ref
 * @param {ProjectDraft} draft - Contains the properties of the project
 */
async function saveProject(draft: ProjectDraft): Promise<void> {
  const existing = editor.value?.project;

  try {
    // TODO: Improve the structure and devise a separation of coupled logic. I have a feeling the error handling and user context could get messy if left unchecked
    if (!existing) {
      loading.value = isLoading.value;
      await createProject(draft);

      console.log("test");

      if (createError.value !== null) {
        projectCreationError.value = createError.value;
        return;
      }

      if (!createdProject.value) {
        projectCreationError.value = "Project was returned.";
        return;
      }

      projects.value.push({ ...createdProject.value, archived: false, media: createdProject.value.media ?? [] });
      showArchived.value = false;
    } else {
      projects.value = projects.value.map((project) =>
        project.id === existing.id ? { ...project, ...draft } : project,
      );
    }
  } catch (error: unknown) {
    projectCreationError.value = error instanceof Error ? error.message : "Unable to create or update projects.";
  } finally {
    loading.value = isLoading.value; // May need to re-think this loading state change
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
  <p v-if="loading" role="status">Loading Projects...</p>
  <p v-else-if="loadError !== null" role="alert">
    Could not load projects: {{ loadError }}
  </p>
  <AdminCollectionView
    v-else
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
