import { useProjects } from '@/composables/useProjects';
import type { Project, ProjectImage, ProjectMedia, ProjectVideo } from '@/types';

type LocalProjectImage = Omit<ProjectImage, 'src'> & { file: File };
type LocalProjectVideo = Omit<ProjectVideo, 'src'> & { file: File };
export type DraftProjectMedia = ProjectMedia | LocalProjectImage | LocalProjectVideo;

export interface ProjectDraft extends Omit<Project, 'id' | 'media'> {
  media: readonly DraftProjectMedia[];
}

export interface AdminProject extends ProjectDraft {
  id: number;
  archived: boolean;
}

export async function initialAdminProjects(): Promise<AdminProject[]> {
  const {
    projects,
    fetchProjects
  } = useProjects();

  await fetchProjects()

  console.log(projects.value)

  return projects.value.map((project: Project) => ({
    ...project,
    archived: false,
    media: project.media ?? [],
  }));
}
