import { createNewProject } from "@/api/projects";
import type { ProjectDraft } from "@/features/admin/projects/adminProjects";
import type { Project } from "@/types";
import { ref } from "vue";

export function useCreateProject() {
  const project = ref<Project | null>();
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);


  async function createProject(proj: ProjectDraft): Promise<void> {
    isLoading.value = true;
    error.value = null;

    try {
      project.value = await createNewProject(proj);
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : "Unable to create project: Unknown error";
    } finally {
      isLoading.value = false;
    }
  }

  return {
    project,
    isLoading,
    error,
    createProject
  }
}
