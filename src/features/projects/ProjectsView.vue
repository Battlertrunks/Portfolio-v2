<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

import BaseCard from '@/components/BaseCard.vue'
import PageContainer from '@/components/PageContainer.vue'
import ProjectMediaGrid from '@/components/ProjectMediaGrid.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { projects } from '@/features/projects/projects.data'

const activeProjectId = ref(projects[0]?.id ?? '')
let scrollFrame: number | null = null

function updateActiveProject() {
  if (projects.length === 0) {
    return
  }

  const activationOffset = 140
  let nextActiveId = projects[0]?.id ?? ''

  for (const project of projects) {
    const section = document.getElementById(project.id)

    if (section && section.getBoundingClientRect().top <= activationOffset) {
      nextActiveId = project.id
    }
  }

  const pageHeight = document.documentElement.scrollHeight
  const viewportBottom = window.scrollY + window.innerHeight
  const isAtPageBottom = pageHeight > window.innerHeight && viewportBottom >= pageHeight - 8

  if (isAtPageBottom) {
    nextActiveId = projects[projects.length - 1]?.id ?? nextActiveId
  }

  activeProjectId.value = nextActiveId
}

function scheduleActiveProjectUpdate() {
  if (scrollFrame !== null) {
    return
  }

  scrollFrame = window.requestAnimationFrame(() => {
    scrollFrame = null
    updateActiveProject()
  })
}

onMounted(() => {
  updateActiveProject()
  window.addEventListener('scroll', scheduleActiveProjectUpdate, { passive: true })
  window.addEventListener('resize', scheduleActiveProjectUpdate)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', scheduleActiveProjectUpdate)
  window.removeEventListener('resize', scheduleActiveProjectUpdate)

  if (scrollFrame !== null) {
    window.cancelAnimationFrame(scrollFrame)
  }
})
</script>

<template>
  <PageContainer>
    <section class="py-16 sm:py-24" aria-labelledby="projects-title">
      <SectionHeading
        heading-id="projects-title"
        eyebrow="Projects"
        title="Things I've built and learned from."
        :level="1"
        description="A small selection of full-stack work. Each project is a chance to practice clear data modeling, dependable APIs, and accessible interfaces."
      />

      <div class="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_14rem] lg:items-start lg:gap-10">
        <aside
          class="rounded-xl border border-line bg-surface p-5 shadow-sm lg:sticky lg:top-24 lg:col-start-2 lg:row-start-1 lg:self-start"
          aria-labelledby="project-index-title"
        >
          <h2
            id="project-index-title"
            class="text-xs font-semibold tracking-widest text-accent uppercase"
          >
            Jump to a project
          </h2>
          <nav class="mt-3" aria-label="Project sections">
            <ul class="flex flex-wrap gap-x-5 gap-y-0 lg:mt-1 lg:flex-col lg:gap-0">
              <li v-for="project in projects" :key="project.id">
                <a
                  :href="`#${project.id}`"
                  class="group relative inline-flex py-1.5 text-sm font-medium transition-colors lg:w-full lg:py-2"
                  :class="
                    activeProjectId === project.id ? 'text-accent' : 'text-muted hover:text-ink'
                  "
                  :aria-current="activeProjectId === project.id ? 'location' : undefined"
                  @click="activeProjectId = project.id"
                >
                  {{ project.title }}
                  <span
                    aria-hidden="true"
                    class="absolute inset-x-0 bottom-0 h-0.5 origin-left rounded-full bg-accent transition-transform duration-300 ease-out"
                    :class="
                      activeProjectId === project.id
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100'
                    "
                  />
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        <ol class="space-y-7 lg:col-start-1 lg:row-start-1">
          <BaseCard
            v-for="project in projects"
            :id="project.id"
            :key="project.id"
            as="li"
            padding="lg"
            class="scroll-mt-24"
            :aria-labelledby="`${project.id}-title`"
          >
            <div class="flex items-start justify-between gap-4">
              <h2
                :id="`${project.id}-title`"
                class="text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
              >
                {{ project.title }}
              </h2>
              <span
                class="mt-1 shrink-0 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-soft-ink"
              >
                {{ project.status }}
              </span>
            </div>

            <ul class="mt-3 flex flex-wrap gap-2" aria-label="Skills and technologies">
              <li
                v-for="tag in project.tags"
                :key="tag"
                class="rounded-full border border-line bg-canvas px-3 py-1 text-xs font-medium text-muted"
              >
                {{ tag }}
              </li>
            </ul>

            <p class="mt-5 text-base leading-7 text-muted">{{ project.description }}</p>

            <ProjectMediaGrid
              v-if="project.media?.length"
              class="mt-6 sm:mt-8"
              :media="project.media"
            />
          </BaseCard>
        </ol>
      </div>
    </section>
  </PageContainer>
</template>
