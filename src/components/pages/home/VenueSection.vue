<script setup lang="ts">
import { computed } from 'vue';
import SectionHeading from '@ui/SectionHeading.vue';
import {
  VENUE_REGION,
  VENUE_CITY,
  VENUE_LAT,
  VENUE_LON,
  VENUE_ROUTE_URL,
} from '@/data/weddingConfig';

const mapEmbedUrl = computed(
  () => `https://yandex.ru/map-widget/v1/?ll=${VENUE_LON}%2C${VENUE_LAT}&z=12&pt=${VENUE_LON},${VENUE_LAT},pm2rdl`,
);
</script>

<template>
  <section v-chapter="'venue'" class="section venue on-photo">
    <SectionHeading eyebrow="Где мы будем" title="Место свадьбы" />

    <p class="venue__region">{{ VENUE_REGION }}</p>
    <p class="venue__city">{{ VENUE_CITY }}</p>
    <p class="section__text venue__note">
      Небольшой уютный город на юге России встретит гостей теплом и гостеприимством —
      будем рады разделить этот день именно здесь.
    </p>

    <a class="venue__route-button" :href="VENUE_ROUTE_URL" target="_blank" rel="noopener noreferrer">
      Построить маршрут
    </a>
  </section>
</template>

<style scoped lang="scss">
@use "@/style/variables/color.scss" as color;
@use "@/style/variables/font.scss" as font;
@use "@/style/variables/transition.scss" as transition;

.venue {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  justify-content: center;
}

.venue__region {
  margin: 40px 0 0;
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.75);
}

.venue__city {
  margin: 10px 0 0;
  font-family: font.$heading;
  font-style: italic;
  font-size: clamp(30px, 5vw, 42px);
  color: color.$white;
  text-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
}

.venue__note {
  max-width: 380px;
}

.venue__route-button {
  margin-top: 30px;
  display: inline-flex;
  align-items: center;
  padding: 13px 30px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  color: color.$white;
  background: transparent;
  cursor: pointer;
  transition: background transition.$fast, color transition.$fast;

  &:hover {
    background: color.$white;
    color: color.$ink;
  }
}

.venue__map {
  margin-top: 48px;
  width: min(100%, 720px);
  aspect-ratio: 16 / 8;
  overflow: hidden;
  padding: 8px;

  @media all and (max-width: 599px) {
    aspect-ratio: 4 / 5;
  }
}

.venue__map-frame {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 2px;
  display: block;
  filter: grayscale(0.25) sepia(0.06) saturate(1.05) contrast(1.02);
}
</style>
