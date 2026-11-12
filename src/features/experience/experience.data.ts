export interface ExperienceNode {
  readonly id: string
  readonly title: string
  readonly subtitle?: string
  readonly period?: string
  readonly level?: string
  readonly body: string
  readonly tags?: readonly string[]
}

// TODO: Should I move everything here on the admin page when I have that created?
export const educationNodes: readonly ExperienceNode[] = [
  {
    id: 'Grand Circus',
    title: 'Grand Circus',
    subtitle: 'Full Stack Development Certificate',
    period: 'Jan 2022 - Apr 2022',
    body:
      'Activities and societies: TypeScript, MongoDB, Express, React, Node.js, Jest, REST APIs, HTML5/CSS, and JavaScript.\n\n' +
      'This was a 3-month intensive course learning to become a full stack web developer. During the 3 months, we learned how to create meaningful design and layout of front-end applications using HTML, CSS, and JavaScript. We worked with Node.js and Express to create the back end for navigating our projects. We used React.js to create advanced single-page applications to limit HTTP requests and improve the user experience. We learned to test our projects using Jest to ensure our applications were not faulty. Lastly, we used MongoDB and PostgreSQL to store valuable information in applications.\n\n' +
      'We practiced and implemented User Experience/User Interface theories with Figma to develop wireframes. Furthermore, we studied target audiences and personas to gain an understanding of what we are making and for whom.',
    tags: [
      'TypeScript',
      'MongoDB',
      'Express',
      'React',
      'Node.js',
      'Jest',
      'REST APIs',
      'HTML5',
      'CSS',
      'JavaScript',
      'PostgreSQL',
      'Figma',
      'UX/UI',
    ],
  },
  {
    id: 'Ferris State University',
    title: 'Ferris State University',
    subtitle: 'Digital Animation and Game Design (DAGD) coursework - GPA 3.9',
    period: 'Aug 2019 - May 2021',
    body:
      'Activities and societies: C#, C++, Unity Game Engine, Unreal Engine, Agile/SCRUM methodologies, user experience, user interface, and design and layout.\n\n' +
      'Studied game development and design through design practices and theories, level design, game programming, procedural programming and development, Agile and SCRUM methodologies, user experience, and UI/UX development. ' +
      'Worked with C#, C++, and Java using Unity Game Engine, Unreal Engine 4, and Processing to create well-developed games and applications.\n\n' +
      'Received Dean’s List every semester.',
    tags: [
      'C#',
      'C++',
      'Java',
      'Unity Game Engine',
      'Unreal Engine 4',
      'Processing',
      'Game Development',
      'Game Design',
      'Level Design',
      'Procedural Programming',
      'UX/UI',
      'Agile/SCRUM',
    ],
  },
  {
    id: 'Macomb Community College',
    title: 'Macomb Community College',
    subtitle: 'General Studies coursework - GPA 3.4',
    period: 'Aug 2017 - May 2019',
    body:
      'Completed classes for general studies to transfer to Ferris State University’s Digital Animation and Game Design degree.\n\n' +
      'Received Dean’s List multiple times and was recognized by multiple professors.',
  },
  {
    id: 'High School',
    title: 'Anchor Bay High School',
    subtitle: 'General Studies',
    period: 'Aug 2013 - May 2017',
    body:
      'Graduated with a focus on general studies, preparing for further education in software development and game design.\n\n' +
      'Received Honor Roll recognition during high school every year.',
  },
] as const

export const experienceNodes: readonly ExperienceNode[] = [
  {
    id: 'docnetwork-full-stack-dev-i',
    title: 'Full Stack Developer II',
    subtitle: 'DocNetwork',
    period: 'March 2025 - Present',
    level: 'Mid-Level (Dev II)',
    body:
      'Contributed to the modernization of payment infrastructure, supporting the secure migration to a new payment processor and refactoring legacy code to align with current security standards. ' +
      'Founded and led a backend development guild that built a Proof of Concept (PoC) for migrating backend services from JavaScript to TypeScript with Express.js, evaluating reliability, maintainability, and scalability considerations. ' +
      'Translated findings from the TypeScript migration PoC into technical recommendations and a potential roadmap for incremental adoption across the backend stack.\n\n' +
      'Researched and documented Testkube capabilities for AI integrations to expand Playwright test coverage, automate test analysis and issue reporting, leverage MCP servers to improve developer workflows, and optimize CI/CD test execution. ' +
      'Took initiative in developing and evaluating AI-assisted development workflows, supporting a GitHub Copilot developer initiative, advocating for practices to reduce comprehension debt from AI-generated code, and promoting standardized Agent, Skills, and Instructions workflows.\n\n' +
      'Mentored junior developers through onboarding, codebase familiarization, feature development, and developer tooling, incorporating feedback to continuously improve mentoring practices. ' +
      'Served as a Subject Matter Expert (SME) for onboarding and provided technical guidance to engineers working within the codebase and development workflows. ' +
      'Created API architecture diagrams and technical documentation to improve system understanding, support development and troubleshooting, and improve long-term maintainability.\n\n' +
      'Partnered with business stakeholders to translate technical opportunities and constraints into actionable engineering recommendations aligned with product and organizational goals.',
    tags: [
      'TypeScript',
      'JavaScript',
      'Vue 3',
      'Vuetify',
      'HTML',
      'CSS',
      'Node.js',
      'AWS',
      'CI/CD',
      'Figma',
      'Terraform',
      'AngularJS',
      'Express.js',
      'Docker',
      'Playwright',
      'GitHub Copilot',
      'Testkube',
      'GraphQL',
      'REST APIs',
      'Emphemeral Environments',
      'Parcel / Micro Frontends',
      'Microservices',
      'Feature Captaining',
      'Technical Leadership',
      'Mentoring',
      'Onboarding',
      'Technical Documentation',
      'API Architecture',
      'AI-Assisted Development',
      'Test Automation',
      'CI/CD Optimization',
    ],
  },
  {
    id: 'docnetwork-full-stack-dev-ii',
    title: 'Full Stack Developer I',
    subtitle: 'DocNetwork',
    period: 'September 2022 - March 2025',
    level: 'Junior (Dev I)',
    body:
      'Worked extensively with both legacy and modern frontend technologies, maintaining and refactoring legacy code while helping develop new micro frontends. ' +
      'Used material design component framework to also help develop and design the micro frontends. Contributed to the development and maintenance of APIs, ensuring ' +
      'efficient and secure connections to the database. Also played a starting role in leading the development of a feature, collaborating with cross-functional teams to deliver high-quality solutions. ' +
      'Assisted in maintaining AWS infrastructure and CI/CD pipeline. \n\n' +
      'Focused on achieving both personal and company-driven goals, which allowed me to improve my existing technical skills and learn new technologies and stacks. ' +
      'Additionally, I contributed to research initiatives, leveraging my growing expertise to support the company’s strategic objectives.',
    tags: [
      'TypeScript',
      'JavaScript',
      'Vue 3',
      'Vuetify',
      'HTML',
      'CSS',
      'Node.js',
      'AWS',
      'CI/CD',
      'Figma',
      'Terraform',
      'AngularJS',
      'Express.js',
      'Docker',
    ],
  },
] as const
