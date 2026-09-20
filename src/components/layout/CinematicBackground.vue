<script setup lang="ts">
import { activeChapter, type ChapterId } from '@/composables/useChapterBackground';

interface Layer {
  id: ChapterId;
  src: string;
  variant: 'scene' | 'texture';
  scrim?: 'dark' | 'light';
  /** Лёгкое размытие сцены — для «дорогого» вида. Урюпинск намеренно исключён (остаётся чётким). */
  soft?: boolean;
}

const layers: Layer[] = [
  { id: 'hero', src: '/images/hero-couple.jpg', variant: 'scene', scrim: 'dark', soft: true },
  { id: 'love', src: '/images/band-sunset.jpg', variant: 'scene', scrim: 'dark', soft: true },
  { id: 'venue', src: '/images/venue-uryupinsk.jpg', variant: 'scene', scrim: 'dark' },
  { id: 'timeline', src: '/images/band-park.jpg', variant: 'texture' },
  { id: 'dresscode', src: '/images/dresscode-photo.jpg', variant: 'scene', scrim: 'light', soft: true },
  { id: 'surprises', src: '/images/surprises-photo.jpg', variant: 'scene', scrim: 'light', soft: true },
];
</script>

<template>
  <div class="cinematic-bg" aria-hidden="true">
    <div class="cinematic-bg__gradient" />

    <div
      v-for="layer in layers"
      :key="layer.id"
      class="cinematic-bg__layer"
      :class="[
        `cinematic-bg__layer--${layer.variant}`,
        { 'is-active': activeChapter === layer.id, 'is-soft': layer.soft },
      ]"
    >
      <img :src="layer.src" alt="" class="cinematic-bg__img">
      <div v-if="layer.scrim === 'dark'" class="cinematic-bg__scrim cinematic-bg__scrim--dark" />
      <div v-else-if="layer.scrim === 'light'" class="cinematic-bg__scrim cinematic-bg__scrim--light" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/style/variables/color.scss" as color;

.cinematic-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  background: color.$paper;
}

.cinematic-bg__gradient {
  position: absolute;
  inset: -10%;
  background:
    radial-gradient(ellipse at 15% 20%, rgba(251, 187, 211, 0.6), transparent 55%),
    radial-gradient(ellipse at 85% 15%, rgba(124, 178, 222, 0.5), transparent 55%),
    radial-gradient(ellipse at 20% 85%, rgba(173, 209, 235, 0.55), transparent 55%),
    radial-gradient(ellipse at 88% 80%, rgba(233, 55, 113, 0.16), transparent 55%),
    color.$paper;
  background-size: 180% 180%;
  animation: auroraFlow 26s ease-in-out infinite;
}

.cinematic-bg__layer {
  position: absolute;
  inset: 0;
  opacity: 0;
  overflow: hidden;
  transition: opacity 1.6s ease;
}

.cinematic-bg__layer.is-active {
  opacity: 1;
}

.cinematic-bg__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

// Лёгкое размытие для «дорогого», редакторского вида — фото становится
// мягким атмосферным фоном, а не резкой фотографией. Урюпинск (venue) не размыт.
.cinematic-bg__layer--scene.is-soft .cinematic-bg__img {
  filter: blur(6px);
  transform: scale(1.06);
}

.cinematic-bg__layer--texture .cinematic-bg__img {
  filter: blur(24px) saturate(1.05);
  opacity: 0.4;
  transform: scale(1.12);
}

.cinematic-bg__scrim {
  position: absolute;
  inset: 0;
}

.cinematic-bg__scrim--dark {
  background: linear-gradient(
    180deg,
    rgba(20, 16, 18, 0.42) 0%,
    rgba(20, 16, 18, 0.38) 50%,
    rgba(20, 16, 18, 0.56) 100%
  );
}

.cinematic-bg__scrim--light {
  background: linear-gradient(
    180deg,
    rgba(255, 250, 247, 0.25) 0%,
    rgba(255, 250, 247, 0.1) 45%,
    rgba(255, 250, 247, 0.35) 100%
  );
}

@keyframes auroraFlow {
  0% { background-position: 0% 0%, 100% 0%, 0% 100%, 100% 100%; }
  50% { background-position: 100% 40%, 10% 60%, 90% 10%, 20% 70%; }
  100% { background-position: 0% 0%, 100% 0%, 0% 100%, 100% 100%; }
}

@media (prefers-reduced-motion: reduce) {
  .cinematic-bg__gradient {
    animation: none;
  }
}
</style>
