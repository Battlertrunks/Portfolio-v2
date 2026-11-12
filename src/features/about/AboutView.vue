<script setup lang="ts">
import BaseCard from '@/components/BaseCard.vue'
import PageContainer from '@/components/PageContainer.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { skillGroups } from '@/features/about/about.data'

const branchPaths: string[] = [
  'M12 14C16 14 16 7 20 7S24 21 28 21S34 14 40 14',
  'M12 14C16 14 16 21 20 21S24 7 28 7S34 14 40 14',
  'M12 14C15 14 15 9 18 9S21 19 24 19S31 9 34 9S37 14 40 14',
  'M12 14C17 14 17 9 21 9S25 19 29 19S35 14 40 14',
] as const

const currentFocus: string[] = [
  'Designing APIs that are predictable, documented, and hard to misuse.',
  'Finding more opportunities to feature captain my skills and knowledge in collaborative projects.',
  'Exploring more approaches to building reliable and maintainable systems with agentic workflows and automation.',
  'Building foundational knowledge in software architecture and system design.',
  'Modeling data and writing queries that stay fast as they grow.',
  'Keeping contracts type-safe from the database to the browser.',
] as const

function branchPath(seed: number) {
  return branchPaths[seed % branchPaths.length] ?? branchPaths[0]
}
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

      <div class="mt-10 max-w-2xl space-y-5 text-base leading-7 text-muted">
        <p>
          I'm Gavin, a full-stack developer who leans toward the backend. I enjoy building and
          learning how to make systems reliable and maintainable before they reach the user interface.
        </p>
        <p>
          My main tools are TypeScript and Node.js on the server, with Vue 3 and Vuetify on the
          client. I care about clear boundaries, useful error messages, and tests that cover the
          paths users actually take. I prioritize building systems that are robust and maintainable from the start.
        </p>
        <p>
          Outside of work, I'm usually experimenting with a side project, reading about system
          design, or refining this portfolio. I enjoy tinkering with different agentic workflows and approaches to problem-solving with my local AI server
        </p>
      </div>
    </section>

    <section class="pb-16 sm:pb-24" aria-labelledby="skills-title">
      <SectionHeading
        heading-id="skills-title"
        eyebrow="Skills"
        title="The tools I reach for."
        description="What I have experience with and reach for in my work and projects."
      />

      <ul class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <BaseCard
          v-for="(group, groupIndex) in skillGroups"
          :key="group.title"
          as="li"
          padding="none"
          class="h-full p-5"
        >
          <div class="relative flex h-full flex-col">
            <span
              aria-hidden="true"
              class="absolute top-3 bottom-0 left-3 w-px bg-gradient-to-b from-accent/40 via-control/30 to-transparent"
            />

            <div class="relative flex items-center gap-3">
              <span
                class="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-surface"
              >
                <span
                  class="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]"
                />
              </span>
              <h3 class="text-s font-semibold tracking-[0.14em] text-ink uppercase">
                {{ group.title }}
              </h3>
            </div>

            <ul class="relative mt-3 space-y-1">
              <li
                v-for="(skill, skillIndex) in group.skills"
                :key="skill"
                class="group/skill relative flex items-center"
              >
                <span
                  aria-hidden="true"
                  class="absolute top-1/2 left-3 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-control/50 transition-colors group-hover/skill:bg-accent"
                />
                <svg
                  aria-hidden="true"
                  focusable="false"
                  class="h-7 w-10 shrink-0 text-control/40 transition-colors group-hover/skill:text-accent"
                  viewBox="0 0 40 28"
                  fill="none"
                >
                  <path
                    :d="branchPath(groupIndex + skillIndex)"
                    stroke="currentColor"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    vector-effect="non-scaling-stroke"
                  />
                </svg>
                <span
                  class="ml-1 rounded-full border border-line bg-canvas px-3 py-1 text-s text-ink transition-colors group-hover/skill:border-accent/40 group-hover/skill:bg-surface group-hover/skill:text-accent-strong"
                >
                  {{ skill }}
                </span>
              </li>
            </ul>
          </div>
        </BaseCard>
      </ul>
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
