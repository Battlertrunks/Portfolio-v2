import type { Project } from '@/types'

export const projects: readonly Project[] = [
  {
    id: 'portfolio-v2',
    title: 'Portfolio V2',
    description:
      'A full-stack rebuild of my personal site. The Vue 3 client is in place with a small design system, typed content, and accessible navigation; the backend will expose typed project and contact endpoints.',
    tags: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Accessibility'],
    status: 'In progress',
    media: [
      {
        type: 'image',
        src: '/projects/portfolio-home.svg',
        alt: 'Portfolio V2 home page mockup with a large introduction and a teal call to action.',
      },
      {
        type: 'image',
        src: '/projects/portfolio-projects.svg',
        alt: 'Projects page mockup with large project cards and a jump-to-project sidebar.',
      },
      {
        type: 'image',
        src: '/projects/portfolio-about.svg',
        alt: 'About page mockup with a heading, paragraphs, and a vertical timeline.',
      },
      {
        type: 'image',
        src: '/projects/portfolio-api.svg',
        alt: 'API surface mockup showing project endpoints and a typed response payload.',
      },
    ],
  },
  {
    id: 'project-two',
    title: 'Project two',
    description:
      'A placeholder for a future backend case study. Describe the data model, the API surface, and the problem the service solves.',
    tags: ['Bun', 'REST APIs', 'SQL'],
    status: 'Planned',
    media: [
      {
        type: 'image',
        src: '/projects/service-dashboard.svg',
        alt: 'Dashboard mockup with service health metrics and usage charts.',
      },
      {
        type: 'image',
        src: '/projects/portfolio-api.svg',
        alt: 'API surface mockup showing endpoints and a typed response payload.',
      },
    ],
  },
  {
    id: 'project-three',
    title: 'Project three',
    description:
      'A placeholder for another project. Focus the case study on reliability, performance, or the decisions behind the system.',
    tags: ['TypeScript', 'Testing', 'Queues'],
    status: 'Planned',
    media: [
      {
        type: 'image',
        src: '/projects/service-pipeline.svg',
        alt: 'Pipeline diagram showing requests moving from an API through a queue to workers and a database.',
      },
      {
        type: 'image',
        src: '/projects/service-dashboard.svg',
        alt: 'Dashboard mockup with service health metrics and usage charts.',
      },
      {
        type: 'image',
        src: '/projects/portfolio-api.svg',
        alt: 'API surface mockup showing endpoints and a typed response payload.',
      },
    ],
  },
]
