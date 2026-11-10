export interface NavItem {
  readonly label: string
  readonly to: string
}

export type ProjectStatus = 'Shipped' | 'In progress' | 'Planned'

export interface Project {
  readonly title: string
  readonly description: string
  readonly tags: readonly string[]
  readonly status: ProjectStatus
}
