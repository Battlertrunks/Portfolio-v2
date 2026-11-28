import type { ProjectDraft } from "@/features/admin/projects/adminProjects";
import type { Project } from "@/types";

export async function getProjects(): Promise<Project[]> {
  const response: Response = await fetch("/api/projects/");

  if (!response.ok) {
    throw new Error("Unable to fetch the projects");
  }

  return response.json();
}

export async function createNewProject(proj: ProjectDraft): Promise<Project> {
  const response: Response = await fetch(
    "/api/projects/",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(proj)
    }
  );

  if (!response.ok) {
    throw new Error("Unable to create the project");
  }

  const result = await response.json();
  return result
}
