<script setup lang="ts">
import NodalChain from '@/components/NodalChain.vue'
import PageContainer from '@/components/PageContainer.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { educationNodes, experienceNodes } from '@/features/experience/experience.data'
</script>

<template>
  <PageContainer>
    <section class="py-16 sm:pb-24" aria-labelledby="employment-title">
      <SectionHeading
        heading-id="employment-title"
        eyebrow="Professional experience"
        title="Where I've put it to work."
        description="My professional journey and experience as a Software Developer"
      />

      <NodalChain label="Roles held at DocNetwork" :entries="experienceNodes" class="mt-10" />
    </section>

    <section class="pb-16 sm:pb-24" aria-labelledby="education-title">
      <SectionHeading
        heading-id="education-title"
        eyebrow="Schooling"
        title="Where I learned the fundamentals."
        description="The path of study that led into professional work."
      />

      <NodalChain label="Education path" :entries="educationNodes" class="mt-10" />
    </section>
  </PageContainer>
</template>
