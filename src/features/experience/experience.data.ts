export interface ExperienceNode {
  readonly id: string
  readonly title: string
  readonly subtitle?: string
  readonly period?: string
  readonly level?: string
  readonly body: string
  readonly tags?: readonly string[]
}

// TODO: Replace the schooling placeholders with real institutions, programs, and dates.
export const educationNodes: readonly ExperienceNode[] = [
  {
    id: 'school-placeholder-one',
    title: 'Placeholder School One',
    subtitle: 'Area of study (placeholder)',
    period: 'YYYY - YYYY',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 'school-placeholder-two',
    title: 'Placeholder School Two',
    subtitle: 'Area of study (placeholder)',
    period: 'YYYY - YYYY',
    body: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
] as const

// TODO: Replace the lorem ipsum bodies and placeholder dates with real accomplishments.
export const experienceNodes: readonly ExperienceNode[] = [
  {
    id: 'docnetwork-full-stack-dev-i',
    title: 'Full Stack Developer I',
    subtitle: 'DocNetwork',
    period: 'YYYY - YYYY',
    level: 'Junior',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    tags: ['TypeScript', 'Vue 3', 'Node.js', 'REST APIs'],
  },
  {
    id: 'docnetwork-full-stack-dev-ii',
    title: 'Full Stack Developer II',
    subtitle: 'DocNetwork',
    period: 'YYYY - Present',
    level: 'Mid-level',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    tags: ['TypeScript', 'Vue 3', 'Bun', 'AWS'],
  },
] as const
