<script setup lang="ts">
import BaseCard from '@/components/BaseCard.vue'
import PageContainer from '@/components/PageContainer.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { projects } from '@/features/projects/projects.data'
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

      <ul class="mt-10 grid gap-5 md:grid-cols-2">
        <BaseCard v-for="project in projects" :key="project.title" as="li" class="flex flex-col">
          <div class="flex items-start justify-between gap-4">
            <h2 class="text-xl font-semibold text-ink">{{ project.title }}</h2>
            <span
              class="shrink-0 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-strong"
            >
              {{ project.status }}
            </span>
          </div>
          <p class="mt-3 flex-1 text-sm leading-6 text-muted">{{ project.description }}</p>
          <ul class="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
            <li
              v-for="tag in project.tags"
              :key="tag"
              class="rounded-full border border-line px-3 py-1 text-xs font-medium text-muted"
            >
              {{ tag }}
            </li>
          </ul>
        </BaseCard>
      </ul>

      <p class="mt-8 text-sm text-muted">Detailed case studies are on the way.</p>
    </section>
  </PageContainer>
</template>
