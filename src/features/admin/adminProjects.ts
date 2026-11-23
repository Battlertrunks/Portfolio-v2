import { projects } from '@/features/projects/projects.data';
import type { Project, ProjectImage, ProjectMedia, ProjectVideo } from '@/types';

type LocalProjectImage = Omit<ProjectImage, 'src'> & { file: File };
type LocalProjectVideo = Omit<ProjectVideo, 'src'> & { file: File };
export type DraftProjectMedia = ProjectMedia | LocalProjectImage | LocalProjectVideo;

export interface ProjectDraft extends Omit<Project, 'id' | 'media'> {
  media: readonly DraftProjectMedia[];
}

export interface AdminProject extends ProjectDraft {
  id: string;
  archived: boolean;
}

export function initialAdminProjects(): AdminProject[] {
  return projects.map((project) => ({
    ...project,
    archived: false,
    media: project.media ?? [],
  }));
}
