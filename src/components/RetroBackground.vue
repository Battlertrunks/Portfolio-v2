<script setup lang="ts">
import { onBeforeUnmount, onMounted, useTemplateRef, watch } from 'vue'
import { useRoute } from 'vue-router'

const background = useTemplateRef<HTMLElement>('background')
const route = useRoute()

let activeObject: HTMLElement | null = null
let slot: HTMLElement | null = null
let resizeObserver: ResizeObserver | undefined
let hoveredObject: HTMLElement | undefined
let lastScrollY = 0
let scrollReset: number | undefined

function positionObject() {
  if (!background.value || !slot || !activeObject) return

  const stage = slot.getBoundingClientRect()
  const scene = background.value.getBoundingClientRect()
  activeObject.style.left = `${stage.left - scene.left + stage.width / 2}px`
  activeObject.style.top = `${stage.top - scene.top + stage.height / 2}px`
}

function selectObject() {
  const scene = background.value
  const main = scene?.parentElement?.querySelector('main')
  slot = main?.querySelector<HTMLElement>('[data-retro-object]') ?? null
  const object = slot
    ? scene?.querySelector<HTMLElement>(`.object.${slot.dataset.retroObject}`)
    : null

  // Keep the outgoing model at its old coordinates while the next route takes over.
  clearHover()
  activeObject?.removeAttribute('data-active')
  activeObject = object ?? null
  positionObject()
  activeObject?.setAttribute('data-active', '')

  resizeObserver?.disconnect()
  if (slot && main) {
    resizeObserver?.observe(slot)
    resizeObserver?.observe(main)
  }
}

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
  if (!activeObject) return

  const { clientX, clientY } = event
  const { left, right, top, bottom } = activeObject.getBoundingClientRect()
  const isOverObject = clientX >= left && clientX <= right && clientY >= top && clientY <= bottom
  setHoveredObject(isOverObject ? activeObject : undefined)
}

function clearHover() {
  setHoveredObject()
}

onMounted(() => {
  if (typeof ResizeObserver !== 'undefined') resizeObserver = new ResizeObserver(positionObject)
  selectObject()
  lastScrollY = Math.max(0, window.scrollY)
  window.addEventListener('resize', positionObject)
  window.addEventListener('scroll', updateScrollDirection, { passive: true })
  window.addEventListener('pointermove', updateHover, { passive: true })
  document.documentElement.addEventListener('pointerleave', clearHover)
  window.addEventListener('blur', clearHover)
})

watch(() => route.name, selectObject, { flush: 'post' })

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  window.clearTimeout(scrollReset)
  window.removeEventListener('resize', positionObject)
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
  --front-color: color-mix(in oklab, var(--color-canvas), var(--color-muted) 24%);
  --top-color: color-mix(in oklab, var(--color-canvas), var(--color-muted) 32%);
  --side-color: color-mix(in oklab, var(--color-canvas), var(--color-muted) 17%);
  --edge-color: color-mix(in oklab, var(--color-canvas), var(--color-muted) 40%);
  position: absolute;
  z-index: -1;
  inset: 0;
  overflow: clip;
  pointer-events: none;
  user-select: none;
}

.object {
  --scroll-depth: 1;
  --hover-tilt: 0deg;
  --hover-lift: 0em;
  position: absolute;
  padding: 0.6em;
  font-size: clamp(1rem, 4vw, var(--object-size, 1.25rem));
  perspective: 34em;
  visibility: hidden;
  opacity: 0;
  scale: 0.94;
  translate: -50% calc(-50% + var(--scroll-offset, 0px) * var(--scroll-depth) + 12px);
  transition:
    visibility 260ms,
    opacity 260ms ease,
    scale 350ms ease-out,
    translate 350ms ease-out;
}

.object[data-active] {
  visibility: visible;
  opacity: 1;
  scale: 1;
  translate: -50% calc(-50% + var(--scroll-offset, 0px) * var(--scroll-depth));
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
  --float-distance: 0.35em;
  --float-duration: 6.4s;
  --float-delay: -1.7s;
  --float-turn: 10deg;
}

.terminal {
  --object-size: 1.5rem;
  --pitch: -15deg;
  --yaw: -22deg;
  --roll: -11deg;
  --scroll-depth: 0.7;
  --float-distance: 0.45em;
  --float-duration: 4.3s;
  --float-delay: -5.6s;
  --float-turn: 12deg;
}

.floppy {
  --object-size: 1.65rem;
  --pitch: -17deg;
  --yaw: -22deg;
  --roll: 16deg;
  --scroll-depth: 0.55;
  --float-distance: 0.55em;
  --float-duration: 3.6s;
  --float-delay: -0.8s;
  --float-turn: 15deg;
}

.tower {
  --object-size: 1.45rem;
  --pitch: -12deg;
  --yaw: -32deg;
  --roll: -8deg;
  --scroll-depth: 0.85;
  --float-distance: 0.3em;
  --float-duration: 5.2s;
  --float-delay: -9.4s;
  --float-turn: 13deg;
}

.model,
.cuboid {
  transform-style: preserve-3d;
}

.model {
  transform: translateY(var(--hover-lift)) rotateX(var(--pitch))
    rotateY(calc(var(--yaw) + var(--hover-tilt))) rotateZ(var(--roll));
  transition: transform 280ms ease-out;
  animation: float-in-place var(--float-duration) ease-in-out var(--float-delay) infinite alternate;
}

@keyframes float-in-place {
  from {
    translate: 0 calc(var(--float-distance) * -1);
    rotate: y calc(var(--float-turn, 0deg) * -1);
  }
  to {
    translate: 0 var(--float-distance);
    rotate: y var(--float-turn, 0deg);
  }
}

.object[data-hovered] {
  --front-color: color-mix(in oklab, var(--color-canvas), var(--color-muted) 32%);
  --top-color: color-mix(in oklab, var(--color-canvas), var(--color-muted) 38%);
  --side-color: color-mix(in oklab, var(--color-canvas), var(--color-muted) 23%);
  --edge-color: color-mix(in oklab, var(--color-canvas), var(--color-muted) 49%);
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

@media (prefers-reduced-motion: reduce) {
  .object,
  .object[data-active] {
    translate: -50% -50%;
    scale: 1;
    transition: none;
  }

  .object[data-hovered] {
    --hover-tilt: 0deg;
    --hover-lift: 0em;
  }

  .model {
    animation: none;
  }
}
</style>
