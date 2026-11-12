export interface SkillGroup {
  readonly title: string
  readonly skills: readonly string[]
}

export const skillGroups: readonly SkillGroup[] = [
  {
    title: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'SQL', 'Rust', 'Go'],
  },
  {
    title: 'Backend',
    skills: ['Bun', 'Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'PostgreSQL', 'SQLite'],
  },
  {
    title: 'Frontend',
    skills: ['Vue 3', 'React', 'Tailwind CSS', 'HTML5', 'CSS', 'Vuetify', 'Playwright'],
  },
  {
    title: 'Cloud & Infra',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'OrbStack', 'Datadog', 'GitHub Actions'],
  },
  {
    title: 'Test & Quality',
    skills: ['Testing', 'Vitest', 'Accessibility', 'Chai', 'Mocha', 'Sinon', 'Trivy', 'Test Kube'],
  },
  {
    title: 'Developer Tooling',
    skills: ['pnpm', 'Vite', 'Git', 'GitHub', 'GitHub Copilot', 'OpenCode', 'Ollama', 'Postman / Bruno'],
  },
] as const
