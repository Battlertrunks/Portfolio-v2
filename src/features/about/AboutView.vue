<script setup lang="ts">
import PageContainer from '@/components/PageContainer.vue'
import SectionHeading from '@/components/SectionHeading.vue'

const skills = [
  'TypeScript',
  'JavaScript',
  'Bun',
  'REST APIs',
  'SQL',
  'Vue 3',
  'Tailwind CSS',
  'Testing',
  'Accessibility',
  'GraphQL',
  'pnpm',
  'Express.js',
  'Node.js',
  'Docker',
  'Kubernetes',
  'AWS',
  'React',
  'Rust',
  'PostgreSQL',
  'SQLite',
  'HTML',
  'CSS',
] as const

const currentFocus = [
  'Designing APIs that are predictable, documented, and hard to misuse.',
  'Modeling data and writing queries that stay fast as they grow.',
  'Keeping contracts type-safe from the database to the browser.',
  'Testing failure modes, not just the happy path.',
] as const
</script>

<template>
  <PageContainer>
    <section class="py-16 sm:py-24" aria-labelledby="about-title">
      <SectionHeading
        heading-id="about-title"
        eyebrow="About"
        title="A full-stack developer with a backend focus."
        :level="1"
        description="I build systems end to end, spending most of my time on the APIs, data, and server-side logic that make the interface possible."
      />

      <div class="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div class="space-y-5 text-base leading-7 text-muted">
          <p>
            I'm Gavin, a full-stack developer who leans toward the backend. I enjoy modeling data,
            shaping API contracts, and making server-side behavior predictable before I touch the
            UI.
          </p>
          <p>
            My main tools are TypeScript and Bun on the server, with Vue 3 and Tailwind CSS on the
            client. I care about clear boundaries, useful error messages, and tests that cover the
            paths users actually take.
          </p>
          <p>
            Outside of work, I'm usually experimenting with a side project, reading about system
            design, or refining this portfolio.
          </p>
        </div>

        <aside aria-labelledby="skills-title" class="rounded-xl border border-line bg-surface p-6">
          <h2 id="skills-title" class="text-sm font-semibold tracking-widest text-accent uppercase">
            Skills
          </h2>
          <ul class="mt-4 flex flex-wrap gap-2">
            <li
              v-for="skill in skills"
              :key="skill"
              class="rounded-full border border-line bg-canvas px-3 py-1 text-sm text-ink"
            >
              {{ skill }}
            </li>
          </ul>
        </aside>
      </div>
    </section>

    <section aria-labelledby="focus-title" class="pb-16 sm:pb-24">
      <h2 id="focus-title" class="text-2xl font-bold tracking-tight text-ink">
        What I'm focused on
      </h2>
      <ul class="mt-6 space-y-3">
        <li v-for="item in currentFocus" :key="item" class="flex gap-3 leading-7 text-muted">
          <span
            aria-hidden="true"
            class="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
          ></span>
          <span>{{ item }}</span>
        </li>
      </ul>
    </section>
  </PageContainer>
</template>
