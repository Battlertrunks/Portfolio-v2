<script setup lang="ts">
import { computed, useTemplateRef, type ComponentPublicInstance } from 'vue';
import { RouterLink } from 'vue-router';

interface Props {
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  to?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  to: undefined,
});

const button = useTemplateRef<HTMLButtonElement>('button');
const link = useTemplateRef<ComponentPublicInstance>('link');

/** Focuses the rendered button or navigation link. */
function focus(): void {
  const anchor: Node | undefined = link.value?.$el;
  const control = button.value ?? (anchor instanceof HTMLAnchorElement ? anchor : null);
  control?.focus();
}

defineExpose({ focus });

const classes = computed(() => [
  'inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
  props.variant === 'primary'
    ? 'bg-accent text-on-accent hover:bg-accent-strong'
    : 'border border-control bg-surface text-ink hover:border-accent hover:text-accent',
  props.size === 'lg' ? 'px-5 py-3 text-base' : 'px-4 py-2.5 text-sm',
]);
</script>

<template>
  <RouterLink v-if="to" ref="link" :to="to" :class="classes">
    <slot />
  </RouterLink>
  <button v-else ref="button" :type="type" :class="classes">
    <slot />
  </button>
</template>
