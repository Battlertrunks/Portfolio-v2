<script setup lang="ts">
const kinds = [
  'terminal',
  'keyboard',
  'floppy',
  'javascript',
  'mouse',
  'cursor',
  'monitor',
  'cassette',
  'chip',
  'code',
] as const

const stickersPerGutter = kinds.length / 2

const shuffledKinds = kinds
  .map((kind) => ({ kind, order: Math.random() }))
  .sort((a, b) => a.order - b.order)
  .map(({ kind }) => kind)

function scatter(stickers: (typeof kinds)[number][]) {
  // Spread the stickers across the width of each gutter in a random vertical order.
  return stickers
    .map((kind, index) => ({
      kind,
      x: (index + 0.15 + Math.random() * 0.7) / stickers.length,
      order: Math.random(),
    }))
    .sort((a, b) => a.order - b.order)
    .map(({ kind, x }, index) => ({
      kind,
      style: {
        '--x': x,
        '--y': (index + Math.random()) / stickers.length,
        '--row': index,
        '--tilt': `${Math.random() * 52 - 26}deg`,
        '--scale': 0.65 + Math.random() * 0.23,
      },
    }))
}

const gutters = [
  { side: 'left', stickers: scatter(shuffledKinds.slice(0, stickersPerGutter)) },
  { side: 'right', stickers: scatter(shuffledKinds.slice(stickersPerGutter)) },
]
</script>

<template>
  <div class="sticker-background" aria-hidden="true">
    <div v-for="gutter in gutters" :key="gutter.side" class="gutter" :class="gutter.side">
      <span
        v-for="sticker in gutter.stickers"
        :key="sticker.kind"
        class="sticker"
        :class="sticker.kind"
        :style="sticker.style"
      >
        <span v-if="sticker.kind === 'terminal'">&gt;_</span>
        <span v-else-if="sticker.kind === 'javascript'">JS</span>
        <span v-else-if="sticker.kind === 'code'">{&nbsp;}</span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.sticker-background {
  --sticker-edge: color-mix(in oklab, var(--color-control), var(--color-accent) 26%);
  --sticker-shell: color-mix(in oklab, var(--color-surface), var(--color-muted) 35%);
  --sticker-shade: color-mix(in oklab, var(--color-line), var(--color-canvas) 30%);
  --sticker-highlight: color-mix(in oklab, var(--color-muted), var(--color-accent) 22%);
  --sticker-accent: color-mix(in oklab, var(--color-surface), var(--color-accent) 44%);
  --sticker-shadow: color-mix(in oklab, black, var(--color-canvas) 48%);
  --outline: 0 0 0 2px var(--sticker-edge), 3px 5px 0 1px var(--sticker-shadow);
  position: absolute;
  z-index: -1;
  inset: 0;
  display: none;
  container-type: size;
  overflow: clip;
  pointer-events: none;
  user-select: none;
}

@media (width >= 80rem) {
  .sticker-background {
    display: block;
  }
}

.gutter {
  --rows: 5;
  position: absolute;
  inset-block: 0;
  width: calc((100% - var(--container-5xl)) / 2);
}

.gutter::before {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, var(--color-control) 1px, transparent 1px) 50% 0 / 16px 16px;
  mask-image: radial-gradient(ellipse at center, #000 25%, transparent 72%);
  opacity: 0.22;
  content: '';
}

.left {
  left: 0;
}

.right {
  right: 0;
}

.sticker {
  --inline-inset: 2.875rem;
  --block-inset: 3rem;
  --row-gap: 4.25rem;
  --reserved-height: calc(2 * var(--block-inset) + (var(--rows) - 1) * var(--row-gap));
  position: absolute;
  /* Reserve room for the rotated artwork and a minimum gap between stickers. */
  top: calc(
    var(--block-inset) + var(--row) * var(--row-gap) + (100% - var(--reserved-height)) * var(--y)
  );
  left: calc(var(--inline-inset) + (100% - 2 * var(--inline-inset)) * var(--x));
  translate: -50% -50%;
  rotate: var(--tilt);
  scale: var(--scale);
  opacity: 0.82;
}

.terminal {
  width: 4.5rem;
  padding: 0.3rem;
  border-radius: 0.45rem;
  background: var(--sticker-shell);
  box-shadow:
    inset 0 -3px var(--sticker-shade),
    var(--outline);
}

.terminal span {
  display: block;
  padding: 0.32rem 0.42rem;
  border-radius: 0.2rem;
  background: repeating-linear-gradient(var(--color-surface) 0 2px, var(--sticker-shade) 2px 4px);
  box-shadow: inset 0 0 0 1px var(--color-canvas);
  color: var(--color-accent-strong);
  font: bold 1rem/1.25 var(--font-mono);
}

.javascript {
  display: grid;
  width: 3rem;
  aspect-ratio: 1;
  place-items: end;
  padding: 0.22rem 0.28rem;
  border-radius: 0.25rem;
  background: var(--sticker-accent);
  box-shadow:
    inset 0 -3px var(--color-accent-soft),
    var(--outline);
  color: var(--color-accent-soft-ink);
  font: 900 1.3rem/1 var(--font-sans);
}

.keyboard {
  width: 5rem;
  height: 2.15rem;
  border-radius: 0.25rem;
  background: var(--sticker-shell);
  box-shadow:
    inset 0 -3px var(--sticker-shade),
    var(--outline);
}

.keyboard::before,
.keyboard::after {
  position: absolute;
  content: '';
}

.keyboard::before {
  inset: 5px 5px auto;
  height: 16px;
  background:
    repeating-linear-gradient(to right, transparent 0 5px, var(--sticker-shade) 5px 7px),
    repeating-linear-gradient(var(--sticker-highlight) 0 4px, var(--sticker-shade) 4px 6px);
}

.keyboard::after {
  inset: auto 19px 7px;
  height: 4px;
  border-radius: 1px;
  background: var(--sticker-highlight);
  box-shadow: 0 1px var(--sticker-shade);
}

.mouse {
  width: 2.25rem;
  height: 3.1rem;
  margin-top: 0.45rem;
  border-radius: 45% 45% 42% 42%;
  background: var(--sticker-shell);
  box-shadow:
    inset -3px -4px var(--sticker-shade),
    var(--outline);
}

.mouse::before {
  position: absolute;
  top: -1.2rem;
  left: 50%;
  width: 1rem;
  height: 1.2rem;
  border-top: 3px solid var(--sticker-edge);
  border-left: 3px solid var(--sticker-edge);
  border-top-left-radius: 0.8rem;
  content: '';
}

.mouse::after {
  position: absolute;
  inset: 0 0 58%;
  border-bottom: 2px solid var(--sticker-shade);
  border-radius: 45% 45% 0 0;
  background: linear-gradient(
    90deg,
    var(--sticker-edge) 47%,
    var(--sticker-shade) 47% 53%,
    var(--sticker-edge) 53%
  );
  content: '';
}

.floppy {
  width: 3.25rem;
  aspect-ratio: 1;
  border-radius: 0.25rem 0.7rem 0.25rem 0.25rem;
  background: var(--sticker-shell);
  box-shadow:
    inset 0 -3px var(--sticker-shade),
    var(--outline);
}

.floppy::before {
  position: absolute;
  inset: 0 0.75rem auto 0.55rem;
  height: 0.95rem;
  border-radius: 0 0 0.12rem 0.12rem;
  background: linear-gradient(
    90deg,
    var(--sticker-highlight) 60%,
    var(--sticker-shade) 60% 82%,
    var(--sticker-highlight) 82%
  );
  content: '';
}

.floppy::after {
  position: absolute;
  inset: auto 0.32rem 0.3rem;
  height: 1.5rem;
  border-radius: 0.12rem;
  background: linear-gradient(
    to bottom,
    var(--sticker-accent) 25%,
    var(--sticker-highlight) 25% 64%,
    var(--sticker-edge) 64% 70%,
    var(--sticker-highlight) 70%
  );
  content: '';
}

.cursor {
  width: 2.4rem;
  height: 2.8rem;
  filter: drop-shadow(3px 4px 0 var(--sticker-shadow));
}

.cursor::before {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--sticker-highlight), var(--sticker-edge));
  clip-path: polygon(
    8% 0,
    18% 0,
    18% 9%,
    29% 9%,
    29% 18%,
    40% 18%,
    40% 27%,
    51% 27%,
    51% 36%,
    62% 36%,
    62% 45%,
    73% 45%,
    73% 54%,
    84% 54%,
    84% 64%,
    52% 64%,
    66% 92%,
    47% 100%,
    32% 72%,
    8% 91%
  );
  content: '';
}

.monitor {
  width: 3.3rem;
  height: 2.45rem;
  margin-top: -0.2rem;
  border-radius: 0.4rem;
  background: var(--sticker-shell);
  box-shadow:
    inset 0 -3px var(--sticker-shade),
    var(--outline);
}

.monitor::before {
  position: absolute;
  inset: 0.3rem 0.35rem 0.55rem;
  border-radius: 0.3rem;
  background: repeating-linear-gradient(var(--color-surface) 0 2px, var(--sticker-shade) 2px 4px);
  box-shadow: inset 0 -1px var(--sticker-accent);
  content: '';
}

.monitor::after {
  position: absolute;
  inset: 100% 0.75rem auto;
  height: 0.42rem;
  border-radius: 0 0 0.2rem 0.2rem;
  background: var(--sticker-edge);
  content: '';
}

.cassette {
  width: 3.85rem;
  height: 2.45rem;
  border-radius: 0.25rem;
  background: var(--sticker-shell);
  box-shadow:
    inset 0 -3px var(--sticker-shade),
    var(--outline);
}

.cassette::before {
  position: absolute;
  inset: 0.35rem 0.45rem auto;
  height: 0.9rem;
  border-radius: 0.15rem;
  background:
    radial-gradient(circle at 24% center, var(--sticker-highlight) 3px, transparent 3.5px),
    radial-gradient(circle at 76% center, var(--sticker-highlight) 3px, transparent 3.5px),
    var(--color-surface);
  content: '';
}

.cassette::after {
  position: absolute;
  inset: auto 0.85rem 0.25rem;
  height: 0.65rem;
  clip-path: polygon(16% 0, 84% 0, 100% 100%, 0 100%);
  background: var(--sticker-accent);
  content: '';
}

.chip {
  width: 3.25rem;
  height: 2.6rem;
  background: repeating-linear-gradient(to bottom, var(--sticker-edge) 0 3px, transparent 3px 7px)
    center / 100% 1.55rem no-repeat;
}

.chip::before {
  position: absolute;
  inset: 0 0.45rem;
  border-radius: 0.25rem;
  background:
    radial-gradient(circle at 50% 0, var(--sticker-shade) 0.3rem, transparent 0.33rem),
    var(--sticker-shell);
  box-shadow: var(--outline);
  content: '';
}

.chip::after {
  position: absolute;
  inset: 0.68rem 1rem;
  border-radius: 0.15rem;
  background: var(--color-accent-soft);
  box-shadow: inset 0 0 0 1px var(--sticker-accent);
  content: '';
}

.code {
  display: grid;
  place-items: center;
  padding: 0.3rem 0.5rem;
  border-radius: 0.55rem;
  background: var(--color-surface);
  box-shadow: var(--outline);
  color: var(--sticker-highlight);
  font: bold 1.1rem/1.25 var(--font-mono);
}

@container (height < 23rem) {
  .gutter {
    --rows: 3;
  }

  .sticker:nth-child(n + 4) {
    display: none;
  }
}

@container (height < 14.5rem) {
  .sticker {
    display: none;
  }
}
</style>
