<script setup lang="ts">
import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue'

const background = useTemplateRef<HTMLElement>('background')

let objects: HTMLElement[] = []
let hoveredObject: HTMLElement | undefined
let lastScrollY = 0
let scrollReset: number | undefined

function updateScrollDirection() {
  const scrollY = Math.max(0, window.scrollY)
  const delta = scrollY - lastScrollY
  lastScrollY = scrollY

  if (!delta || !background.value) return

  background.value.dataset.scroll = delta > 0 ? 'down' : 'up'
  window.clearTimeout(scrollReset)
  scrollReset = window.setTimeout(() => background.value?.removeAttribute('data-scroll'), 180)
}

function setHoveredObject(object?: HTMLElement) {
  if (object === hoveredObject) return

  hoveredObject?.removeAttribute('data-hovered')
  object?.setAttribute('data-hovered', '')
  hoveredObject = object
}

function updateHover(event: PointerEvent) {
  if (event.pointerType !== 'mouse') return

  const { clientX, clientY } = event
  const object = objects.find((object) => {
    const { left, right, top, bottom } = object.getBoundingClientRect()
    return clientX >= left && clientX <= right && clientY >= top && clientY <= bottom
  })

  setHoveredObject(object)
}

function clearHover() {
  setHoveredObject()
}

onMounted(() => {
  objects = Array.from(background.value?.querySelectorAll<HTMLElement>('.object') ?? [])
  lastScrollY = Math.max(0, window.scrollY)
  window.addEventListener('scroll', updateScrollDirection, { passive: true })
  window.addEventListener('pointermove', updateHover, { passive: true })
  document.documentElement.addEventListener('pointerleave', clearHover)
  window.addEventListener('blur', clearHover)
})

onBeforeUnmount(() => {
  window.clearTimeout(scrollReset)
  window.removeEventListener('scroll', updateScrollDirection)
  window.removeEventListener('pointermove', updateHover)
  document.documentElement.removeEventListener('pointerleave', clearHover)
  window.removeEventListener('blur', clearHover)
})
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

    <div class="object floppy">
      <div class="cuboid model floppy-case">
        <div class="face front">
          <div class="floppy-shutter" />
          <div class="floppy-label" />
        </div>
        <div class="face top" />
        <div class="face side" />
      </div>
    </div>

    <div class="object tower">
      <div class="cuboid model tower-case">
        <div class="face front">
          <div class="drive-bays" />
          <div class="power-light" />
        </div>
        <div class="face top" />
        <div class="face side"><div class="vents" /></div>
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
  --scroll-depth: 1;
  --hover-tilt: 0deg;
  --hover-lift: 0em;
  position: absolute;
  padding: 0.6em;
  font-size: clamp(0.5rem, 1.12vw, 1rem);
  perspective: 34em;
  translate: 0 calc(var(--scroll-offset, 0px) * var(--scroll-depth));
  transition: translate 350ms ease-out;
}

.retro-background[data-scroll='down'] {
  --scroll-offset: -16px;
}

.retro-background[data-scroll='up'] {
  --scroll-offset: 16px;
}

.monitor {
  --pitch: -13deg;
  --yaw: -29deg;
  --roll: 6deg;
  top: 24%;
  right: clamp(1rem, calc((100% - 75rem) / 2), 12rem);
}

.terminal {
  --pitch: -15deg;
  --yaw: -22deg;
  --roll: -11deg;
  --scroll-depth: 0.7;
  top: 70%;
  left: clamp(1rem, calc((100% - 77rem) / 2), 10rem);
}

.floppy {
  --pitch: -17deg;
  --yaw: -22deg;
  --roll: 16deg;
  --scroll-depth: 0.55;
  top: 30%;
  left: clamp(1rem, calc((100% - 76rem) / 2), 10rem);
}

.tower {
  --pitch: -12deg;
  --yaw: -32deg;
  --roll: -8deg;
  --scroll-depth: 0.85;
  top: 66%;
  right: clamp(1rem, calc((100% - 74rem) / 2), 11rem);
}

.model,
.cuboid {
  transform-style: preserve-3d;
}

.model {
  transform: translateY(var(--hover-lift)) rotateX(var(--pitch))
    rotateY(calc(var(--yaw) + var(--hover-tilt))) rotateZ(var(--roll));
  transition: transform 280ms ease-out;
}

.object[data-hovered] {
  --front-color: color-mix(in oklab, var(--color-canvas), var(--color-muted) 21%);
  --top-color: color-mix(in oklab, var(--color-canvas), var(--color-muted) 26%);
  --side-color: color-mix(in oklab, var(--color-canvas), var(--color-muted) 14%);
  --edge-color: color-mix(in oklab, var(--color-canvas), var(--color-muted) 35%);
  --hover-tilt: 8deg;
  --hover-lift: -0.3em;
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
  transition:
    background-color 250ms ease-out,
    border-color 250ms ease-out;
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

.floppy-case {
  --width: 4.4em;
  --height: 4.5em;
  --depth: 0.45em;
}

.floppy-shutter {
  position: absolute;
  inset: 0 0.8em auto 1em;
  height: 1.65em;
  border-radius: 0 0 0.15em 0.15em;
  background: linear-gradient(
    to right,
    var(--edge-color) 56%,
    var(--color-canvas) 56% 80%,
    var(--edge-color) 80%
  );
}

.floppy-label {
  position: absolute;
  inset: 2.2em 0.45em 0.3em;
  border: 1px solid var(--edge-color);
  background: repeating-linear-gradient(var(--side-color) 0 0.4em, var(--front-color) 0.4em 0.48em);
}

.tower-case {
  --width: 3.7em;
  --height: 6.4em;
  --depth: 3.3em;
}

.drive-bays {
  position: absolute;
  inset: 0.65em 0.45em auto;
  height: 1.4em;
  border: 1px solid var(--edge-color);
  background: linear-gradient(
    var(--side-color) 40%,
    var(--color-canvas) 40% 55%,
    var(--side-color) 55%
  );
}

.tower .vents {
  inset: 50% 18% 18%;
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

  .object[data-hovered] {
    --hover-tilt: 0deg;
    --hover-lift: 0em;
  }
}
</style>
