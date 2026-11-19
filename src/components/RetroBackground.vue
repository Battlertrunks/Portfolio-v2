<script setup lang="ts">
import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue'

const background = useTemplateRef<HTMLElement>('background')

function updateScrollOffset() {
  const offset = Math.sin(Math.max(0, window.scrollY) / 220) * 12
  background.value?.style.setProperty('--scroll-offset', `${offset}px`)
}

onMounted(() => {
  updateScrollOffset()
  window.addEventListener('scroll', updateScrollOffset, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', updateScrollOffset))
</script>

<template>
  <div ref="background" class="retro-background" aria-hidden="true">
    <div class="object monitor">
      <div class="model">
        <div class="cuboid monitor-case">
          <div class="face front">
            <div class="screen" />
            <div class="power-light" />
          </div>
          <div class="face top" />
          <div class="face side"><div class="vents" /></div>
        </div>
        <div class="cuboid monitor-stand">
          <div class="face front" />
          <div class="face top" />
          <div class="face side" />
        </div>
      </div>
    </div>

    <div class="object terminal">
      <div class="cuboid model terminal-case">
        <div class="face front">
          <div class="terminal-display">&gt;_</div>
        </div>
        <div class="face top" />
        <div class="face side" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.retro-background {
  --front-color: color-mix(in oklab, var(--color-canvas), var(--color-muted) 14%);
  --top-color: color-mix(in oklab, var(--color-canvas), var(--color-muted) 19%);
  --side-color: color-mix(in oklab, var(--color-canvas), var(--color-muted) 9%);
  --edge-color: color-mix(in oklab, var(--color-canvas), var(--color-muted) 25%);
  position: fixed;
  z-index: -1;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  user-select: none;
}

.object {
  position: absolute;
  font-size: clamp(0.5rem, 1.12vw, 1rem);
  perspective: 34em;
  transition: translate 850ms ease-out;
}

.monitor {
  top: 24%;
  right: clamp(1rem, calc((100% - 75rem) / 2), 12rem);
  translate: 0 var(--scroll-offset, 0px);
}

.terminal {
  top: 70%;
  left: clamp(1rem, calc((100% - 77rem) / 2), 10rem);
  translate: 0 calc(var(--scroll-offset, 0px) * -0.7);
}

.model,
.cuboid {
  transform-style: preserve-3d;
}

.monitor .model {
  transform: rotateX(-13deg) rotateY(-29deg) rotateZ(6deg);
}

.terminal .model {
  transform: rotateX(-15deg) rotateY(-22deg) rotateZ(-11deg);
}

.cuboid {
  position: relative;
  width: var(--width);
  height: var(--height);
}

.face {
  position: absolute;
  border: 1px solid color-mix(in oklab, var(--edge-color) 45%, var(--side-color));
  backface-visibility: hidden;
}

.front {
  inset: 0;
  background: var(--front-color);
  transform: translateZ(calc(var(--depth) / 2));
}

.top {
  inset: 0 0 auto;
  height: var(--depth);
  background: var(--top-color);
  transform: translateZ(calc(var(--depth) / -2)) rotateX(90deg);
  transform-origin: top;
}

.side {
  inset: 0 0 0 auto;
  width: var(--depth);
  background: var(--side-color);
  transform: translateZ(calc(var(--depth) / -2)) rotateY(90deg);
  transform-origin: right;
}

.monitor-case {
  --width: 10em;
  --height: 7.5em;
  --depth: 4.8em;
}

.screen {
  position: absolute;
  inset: 0.65em 0.75em 1.15em;
  border: 0.2em solid var(--side-color);
  border-radius: 0.8em;
  background:
    repeating-linear-gradient(transparent 0 2px, var(--color-canvas) 3px 4px),
    radial-gradient(ellipse at 42% 35%, var(--top-color), var(--color-canvas) 85%);
}

.power-light {
  position: absolute;
  right: 0.9em;
  bottom: 0.35em;
  width: 0.4em;
  height: 0.24em;
  border-radius: 0.1em;
  background: color-mix(in oklab, var(--edge-color), var(--color-accent) 17%);
}

.vents {
  position: absolute;
  inset: 28% 19% 28% 24%;
  background: repeating-linear-gradient(transparent 0 0.46em, var(--color-canvas) 0.46em 0.62em);
}

.monitor-stand {
  --width: 6.5em;
  --height: 0.85em;
  --depth: 3.6em;
  margin-inline: auto;
}

.terminal-case {
  --width: 6.1em;
  --height: 4.8em;
  --depth: 1.1em;
}

.terminal-display {
  position: absolute;
  inset: 0.23em;
  display: grid;
  align-content: center;
  padding-inline-start: 0.27em;
  border-top: 0.16em solid var(--edge-color);
  background: var(--side-color);
  color: var(--edge-color);
  font: 600 1.65em var(--font-mono);
}

@media (max-width: 40rem) {
  .retro-background {
    opacity: 0.7;
  }
}

@media (prefers-reduced-motion: reduce) {
  .object {
    translate: none;
    transition: none;
  }
}
</style>
