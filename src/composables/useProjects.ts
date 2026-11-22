import { ref } from "vue";
import { getProjects } from "@/api/projects";
import { type Project } from "@/types";

export function useProjects(){
  const projects = ref<Project[]>([]);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  async function fetchProjects() {
    isLoading.value = true;
    error.value = null;

    try {
      projects.value = await getProjects();
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : "Unknown error";
    } finally {
      isLoading.value = false;
    }
  }

  return {
    projects,
    isLoading,
    error,
    fetchProjects
  };
}
