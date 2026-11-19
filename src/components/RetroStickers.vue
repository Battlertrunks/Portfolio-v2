<script setup lang="ts">
const layout = {
  left: [
    { kind: 'terminal', x: 43, y: 15, tilt: -13 },
    { kind: 'keyboard', x: 56, y: 45, tilt: 11 },
    { kind: 'floppy', x: 44, y: 76, tilt: -16 },
  ],
  right: [
    { kind: 'javascript', x: 54, y: 23, tilt: 13 },
    { kind: 'mouse', x: 47, y: 52, tilt: -12 },
    { kind: 'cursor', x: 56, y: 84, tilt: 10 },
  ],
} as const

function jitter(value: number, range: number) {
  return value + (Math.random() * 2 - 1) * range
}

const rails = Object.entries(layout).map(([side, stickers]) => ({
  side,
  stickers: stickers.map(({ kind, x, y, tilt }) => ({
    kind,
    style: {
      '--x': `${jitter(x, 5)}%`,
      '--y': `${jitter(y, 4)}%`,
      '--tilt': `${jitter(tilt, 5)}deg`,
    },
  })),
}))
</script>

<template>
  <div class="sticker-background" aria-hidden="true">
    <div v-for="rail in rails" :key="rail.side" class="rail" :class="rail.side">
      <span
        v-for="sticker in rail.stickers"
        :key="sticker.kind"
        class="sticker"
        :class="sticker.kind"
        :style="sticker.style"
      >
        <span v-if="sticker.kind === 'terminal'">&gt;_</span>
        <span v-else-if="sticker.kind === 'javascript'">JS</span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.sticker-background {
  --sticker-edge: #e1d6bd;
  --plastic: #c6baa4;
  --plastic-shadow: #817969;
  --sticker-shadow: #03070e;
  --outline: 0 0 0 2px var(--sticker-edge), 3px 5px 0 1px var(--sticker-shadow);
  position: absolute;
  z-index: -1;
  inset: 0;
  display: none;
  overflow: clip;
  pointer-events: none;
  user-select: none;
}

@media (width >= 80rem) {
  .sticker-background {
    display: grid;
    grid-template-columns: minmax(0, 1fr) var(--container-5xl) minmax(0, 1fr);
  }
}

.rail {
  position: relative;
  width: min(100%, 16rem);
}

.rail::before {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, var(--color-control) 1px, transparent 1px) 50% 0 / 16px 16px;
  mask-image: radial-gradient(ellipse at center, #000 25%, transparent 72%);
  opacity: 0.22;
  content: '';
}

.left {
  grid-column: 1;
  justify-self: end;
}

.right {
  grid-column: 3;
  justify-self: start;
}

.sticker {
  position: absolute;
  top: var(--y);
  left: clamp(3.25rem, var(--x), 100% - 3.25rem);
  translate: -50% -50%;
  rotate: var(--tilt);
  opacity: 0.72;
}

.terminal {
  width: 4.5rem;
  padding: 0.3rem;
  border-radius: 0.45rem;
  background: var(--plastic);
  box-shadow:
    inset 0 -3px var(--plastic-shadow),
    var(--outline);
}

.terminal span {
  display: block;
  padding: 0.32rem 0.42rem;
  border-radius: 0.2rem;
  background: repeating-linear-gradient(#112827 0 2px, #162e2d 2px 4px);
  box-shadow: inset 0 0 0 1px #081b1b;
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
  background: #ddba57;
  box-shadow:
    inset 0 -3px #aa8636,
    var(--outline);
  color: #282012;
  font: 900 1.3rem/1 var(--font-sans);
}

.keyboard {
  width: 5rem;
  height: 2.15rem;
  border-radius: 0.25rem;
  background: var(--plastic);
  box-shadow:
    inset 0 -3px var(--plastic-shadow),
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
    repeating-linear-gradient(to right, transparent 0 5px, var(--plastic-shadow) 5px 7px),
    repeating-linear-gradient(#ece0c9 0 4px, var(--plastic-shadow) 4px 6px);
}

.keyboard::after {
  inset: auto 19px 7px;
  height: 4px;
  border-radius: 1px;
  background: #eee2cb;
  box-shadow: 0 1px var(--plastic-shadow);
}

.mouse {
  width: 2.25rem;
  height: 3.1rem;
  margin-top: 0.45rem;
  border-radius: 45% 45% 42% 42%;
  background: var(--plastic);
  box-shadow:
    inset -3px -4px var(--plastic-shadow),
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
  border-bottom: 2px solid var(--plastic-shadow);
  border-radius: 45% 45% 0 0;
  background: linear-gradient(90deg, #ded3bb 47%, var(--plastic-shadow) 47% 53%, #ded3bb 53%);
  content: '';
}

.floppy {
  width: 3.25rem;
  aspect-ratio: 1;
  border-radius: 0.25rem 0.7rem 0.25rem 0.25rem;
  background: #807797;
  box-shadow:
    inset 0 -3px #524963,
    var(--outline);
}

.floppy::before {
  position: absolute;
  inset: 0 0.75rem auto 0.55rem;
  height: 0.95rem;
  border-radius: 0 0 0.12rem 0.12rem;
  background: linear-gradient(90deg, #b4b5ba 60%, #494451 60% 82%, #b4b5ba 82%);
  content: '';
}

.floppy::after {
  position: absolute;
  inset: auto 0.32rem 0.3rem;
  height: 1.5rem;
  border-radius: 0.12rem;
  background: linear-gradient(
    to bottom,
    #d9a4a2 25%,
    #ece0c9 25% 64%,
    #b9ab9e 64% 70%,
    #ece0c9 70%
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
  background: var(--sticker-edge);
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
</style>
