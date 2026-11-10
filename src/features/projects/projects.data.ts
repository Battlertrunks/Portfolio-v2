import type { Project } from '@/types'

export const projects: readonly Project[] = [
  {
    title: 'Portfolio V2',
    description:
      'A full-stack rebuild of my personal site. The Vue 3 client is in place; the backend will expose typed project and contact endpoints.',
    tags: ['Vue 3', 'TypeScript', 'Tailwind CSS'],
    status: 'In progress',
  },
  {
    title: 'Project two',
    description:
      'A placeholder for a future backend case study. Describe the data model, the API surface, and the problem the service solves.',
    tags: ['Bun', 'REST APIs', 'SQL'],
    status: 'Planned',
  },
  {
    title: 'Project three',
    description:
      'A placeholder for another project. Focus the case study on reliability, performance, or the decisions behind the system.',
    tags: ['TypeScript', 'Testing', 'Queues'],
    status: 'Planned',
  },
]
