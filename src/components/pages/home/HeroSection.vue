<script setup lang="ts">
import { GROOM_NAME, BRIDE_NAME, WEDDING_DATE_LABEL } from '@/data/weddingConfig';
</script>

<template>
  <section v-chapter="'hero'" class="hero">
    <p class="hero__eyebrow">Приглашение на свадьбу</p>
    <h1 class="hero__names">{{ GROOM_NAME }}<i>&amp;</i>{{ BRIDE_NAME }}</h1>

    <div class="hero__date-row">
      <span class="hero__date-line" />
      <span class="hero__date">{{ WEDDING_DATE_LABEL }}</span>
      <span class="hero__date-line" />
    </div>

    <p class="hero__message">Приглашаем вас разделить с нами этот особенный день</p>

    <div class="hero__scroll-cue">
      <span />
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/style/variables/color.scss" as color;
@use "@/style/variables/font.scss" as font;

.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 64px 24px 48px;
}

.hero__eyebrow {
  letter-spacing: 0.34em;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 600;
  color: color.$accent-pink;
  margin: 0 0 20px;
}

.hero__names {
  font-family: font.$heading;
  font-style: italic;
  font-weight: 500;
  font-size: clamp(36px, 9vw, 64px);
  color: color.$white;
  letter-spacing: 0.01em;
  text-shadow: 0 4px 30px rgba(0, 0, 0, 0.25);

  i {
    color: color.$accent-pink;
    font-style: italic;
    padding: 0 16px;
  }
}

.hero__date-row {
  margin-top: 30px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.hero__date-line {
  width: 32px;
  height: 1px;
  background: rgba(255, 255, 255, 0.5);
}

.hero__date {
  font-family: font.$heading;
  font-style: italic;
  font-size: clamp(19px, 3.8vw, 25px);
  letter-spacing: 0.06em;
  color: color.$white;
}

.hero__message {
  margin-top: 28px;
  max-width: 380px;
  font-size: 16px;
  line-height: 1.8;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.85);
}

.hero__scroll-cue {
  margin-top: 56px;
  width: 1px;
  height: 46px;
  background: rgba(255, 255, 255, 0.35);
  position: relative;
  overflow: hidden;

  span {
    position: absolute;
    left: 0;
    top: -40%;
    width: 100%;
    height: 40%;
    background: color.$white;
    animation: scrollCue 2s ease-in-out infinite;
  }
}

@keyframes scrollCue {
  0% { top: -40%; }
  100% { top: 100%; }
}

@media (prefers-reduced-motion: reduce) {
  .hero__scroll-cue span {
    animation: none;
  }
}
</style>
