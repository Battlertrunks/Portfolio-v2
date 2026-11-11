<script setup lang="ts">
import BaseCard from '@/components/BaseCard.vue'

interface ChainEntry {
  readonly id: string
  readonly title: string
  readonly subtitle?: string
  readonly period?: string
  readonly level?: string
  readonly body: string
  readonly tags?: readonly string[]
}

interface Props {
  entries: readonly ChainEntry[]
  label: string
}

defineProps<Props>()
</script>

<template>
  <ol class="relative space-y-8" :aria-label="label">
    <span
      aria-hidden="true"
      class="absolute inset-y-0 left-[11px] w-px origin-top animate-spine-grow bg-gradient-to-b from-accent via-accent/45 to-transparent"
    />
    <span
      aria-hidden="true"
      class="pointer-events-none absolute inset-y-0 left-[11px] w-px animate-spine-flow bg-[linear-gradient(to_bottom,transparent_12%,var(--color-accent-strong)_46%,var(--color-accent-strong)_54%,transparent_88%)] [background-size:100%_50%] [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_65%,transparent)]"
    />
    <span
      aria-hidden="true"
      class="pointer-events-none absolute inset-y-0 left-[11px] w-px animate-spine-flow-drift bg-[linear-gradient(to_bottom,transparent_20%,rgb(45_212_191/0.55)_48%,rgb(45_212_191/0.55)_52%,transparent_80%)] [background-size:100%_33.333%] [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_65%,transparent)]"
    />

    <li
      v-for="(entry, entryIndex) in entries"
      :key="entry.id"
      class="group/node relative pl-12 sm:pl-14"
    >
      <span
        aria-hidden="true"
        class="absolute top-6 left-0 z-10 flex h-6 w-6 animate-node-pop items-center justify-center rounded-full border border-accent/30 bg-surface transition-colors group-hover/node:border-accent/60"
        :style="{ animationDelay: `${entryIndex * 160}ms` }"
      >
        <span
          class="h-1.5 w-1.5 animate-node-glow rounded-full bg-accent"
          :style="{ animationDelay: `${entryIndex * 160 + 500}ms` }"
        />
      </span>
      <svg
        aria-hidden="true"
        focusable="false"
        class="absolute top-8 left-6 h-4 w-6 animate-branch-draw text-control/40 transition-colors group-hover/node:text-accent sm:w-8"
        viewBox="0 0 32 16"
        fill="none"
        :style="{ animationDelay: `${entryIndex * 160 + 160}ms` }"
      >
        <path
          class="[stroke-dasharray:1]"
          d="M0 8C8 8 8 4 16 4S24 12 32 8"
          stroke="currentColor"
          stroke-width="1.25"
          stroke-linecap="round"
          pathLength="1"
        />
      </svg>

      <BaseCard
        as="article"
        padding="lg"
        class="animate-node-rise transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_10px_30px_-14px_var(--color-accent)]"
        :style="{ animationDelay: `${entryIndex * 160 + 80}ms` }"
      >
        <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 class="text-lg font-semibold text-ink">{{ entry.title }}</h3>
          <span v-if="entry.period" class="text-xs font-medium text-muted/80 tabular-nums">
            {{ entry.period }}
          </span>
        </div>

        <div v-if="entry.subtitle || entry.level" class="mt-1 flex flex-wrap items-center gap-2">
          <p v-if="entry.subtitle" class="text-sm font-medium text-accent-strong">
            {{ entry.subtitle }}
          </p>
          <span
            v-if="entry.level"
            class="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-semibold text-accent-soft-ink"
          >
            {{ entry.level }}
          </span>
        </div>

        <p class="mt-4 text-sm leading-6 text-muted">{{ entry.body }}</p>

        <ul v-if="entry.tags?.length" class="mt-4 flex flex-wrap gap-2">
          <li
            v-for="tag in entry.tags"
            :key="tag"
            class="rounded-full border border-line bg-canvas px-3 py-1 text-xs text-ink"
          >
            {{ tag }}
          </li>
        </ul>
      </BaseCard>
    </li>
  </ol>
</template>
