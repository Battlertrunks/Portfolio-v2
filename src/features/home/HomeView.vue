<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BaseCard from '@/components/BaseCard.vue'
import PageContainer from '@/components/PageContainer.vue'
import SectionHeading from '@/components/SectionHeading.vue'

const principles = [
  {
    title: 'Backend-first design',
    description:
      'I start with the data model and API contract, then build the interface around behavior the server can guarantee.',
  },
  {
    title: 'Types across the boundary',
    description:
      'Strict TypeScript and shared contracts keep the client and server honest about request and response shapes.',
  },
  {
    title: 'Agentic Engineering Focus',
    description:
      'I focus building applications agentically, ensuring that each component and feature serves a clear purpose and contributes to the overall system behavior.',
  },
] as const
</script>

<template>
  <PageContainer>
    <section class="py-16 sm:py-24" aria-labelledby="hero-title">
      <p class="text-sm font-semibold tracking-widest text-accent uppercase">
        Full-stack developer
      </p>
      <h1
        id="hero-title"
        class="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-ink sm:text-5xl"
      >
        Hi, I'm Gavin. I build dependable full-stack applications, with a focus on the backend.
      </h1>
      <p class="mt-6 max-w-2xl text-lg leading-8 text-muted">
        I work where data, APIs, and interfaces meet: modeling the domain, designing clear
        contracts, and building the accessible UI that sits on top.
      </p>
      <div class="mt-8 flex flex-wrap gap-3">
        <BaseButton to="/projects" size="lg">View projects</BaseButton>
        <BaseButton to="/about" variant="secondary" size="lg">About me</BaseButton>
      </div>
    </section>

    <section aria-labelledby="principles-title" class="pb-16 sm:pb-24">
      <SectionHeading
        heading-id="principles-title"
        eyebrow="How I work"
        title="Principles I build by"
        description="The standards I bring to the systems I work on."
      />
      <ul class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <BaseCard v-for="principle in principles" :key="principle.title" as="li">
          <h3 class="text-lg font-semibold text-ink">{{ principle.title }}</h3>
          <p class="mt-2 text-sm leading-6 text-muted">{{ principle.description }}</p>
        </BaseCard>
      </ul>
    </section>

    <section aria-labelledby="cta-title" class="pb-16 sm:pb-24">
      <div class="rounded-xl border border-line bg-accent-soft p-6 sm:p-10">
        <h2 id="cta-title" class="text-2xl font-bold tracking-tight text-ink">
          Let's build something dependable.
        </h2>
        <p class="mt-3 max-w-xl leading-7 text-accent-soft-ink">
          I am committed to building dependable full-stack applications that prioritize clear data modeling, robust API design, and accessible user interfaces.
        </p>
        <div class="mt-6">
          <BaseButton to="/about">More about me</BaseButton>
        </div>
      </div>
    </section>
  </PageContainer>
</template>
