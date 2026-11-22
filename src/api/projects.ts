import type { Project } from "@/types";

export async function getProjects(): Promise<Project[]> {
  const response: Response = await fetch("/api/projects/");

  if (!response.ok) {
    throw new Error("Unable to fetch the projects");
  }

  return response.json();
}
