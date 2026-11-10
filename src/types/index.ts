export interface NavItem {
  readonly label: string
  readonly to: string
}

export type ProjectStatus = 'Shipped' | 'In progress' | 'Planned'

export interface ProjectImage {
  readonly type: 'image'
  readonly src: string
  readonly alt: string
}

export interface ProjectVideo {
  readonly type: 'video'
  readonly src: string
  readonly label: string
  readonly poster?: string
}

export type ProjectMedia = ProjectImage | ProjectVideo

export interface Project {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly tags: readonly string[]
  readonly status: ProjectStatus
  readonly media?: readonly ProjectMedia[]
}
