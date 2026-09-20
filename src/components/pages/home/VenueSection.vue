<script setup lang="ts">
import { ref } from 'vue';
import ChapterMark from '@ui/ChapterMark.vue';
import RouteIcon from '@icons/RouteIcon.vue';
import BedIcon from '@icons/BedIcon.vue';
import ClockIcon from '@icons/ClockIcon.vue';
import MapPinIcon from '@icons/MapPinIcon.vue';
import CopyIcon from '@icons/CopyIcon.vue';
import CheckIcon from '@icons/CheckIcon.vue';
import venueFacts from '@/data/venueFacts';
import type { VenueFactIcon } from '@/types/wedding';
import { VENUE_CITY, VENUE_REGION, VENUE_ROUTE_URL } from '@/data/weddingConfig';

const factIcons: Record<VenueFactIcon, typeof RouteIcon> = {
  route: RouteIcon,
  bed: BedIcon,
  clock: ClockIcon,
};

const isCopied = ref(false);
let resetTimer: ReturnType<typeof setTimeout> | undefined;

const copyAddress = async () => {
  try {
    await navigator.clipboard.writeText(`${VENUE_CITY}, ${VENUE_REGION}`);
  } catch {
    return;
  }

  isCopied.value = true;
  clearTimeout(resetTimer);
  resetTimer = setTimeout(() => {
    isCopied.value = false;
  }, 2000);
};
</script>

<template>
  <section id="venue" class="band band--photo venue">
    <div class="venue__media" aria-hidden="true">
      <img class="venue__img" src="/images/venue-uryupinsk.jpg" alt="" loading="lazy">
      <span class="venue__scrim" />
    </div>

    <div class="shell venue__shell">
      <ChapterMark index="03" label="Место" />

      <div class="venue__top">
        <div class="venue__title-block">
          <span v-reveal class="eyebrow">Место действия</span>
          <h2 v-reveal="60" class="display venue__title">{{ VENUE_CITY.replace('г. ', '') }}</h2>
          <p v-reveal="100" class="venue__region">{{ VENUE_REGION }}</p>
          <p v-reveal="140" class="lede venue__note">
            Небольшой уютный город на юге России встретит гостей теплом и гостеприимством —
            будем рады разделить этот день именно здесь.
          </p>
        </div>

        <aside v-reveal="180" class="venue__card">
          <MapPinIcon class="venue__card-icon" />
          <p class="venue__card-label">Адрес</p>
          <p class="venue__card-city">{{ VENUE_CITY.replace('г. ', '') }}</p>
          <p class="venue__card-region">{{ VENUE_REGION }}</p>

          <a class="btn btn--solid venue__route" :href="VENUE_ROUTE_URL" target="_blank" rel="noopener noreferrer">
            Построить маршрут
            <RouteIcon />
          </a>

          <button type="button" class="venue__copy" @click="copyAddress">
            <CheckIcon v-if="isCopied" />
            <CopyIcon v-else />
            {{ isCopied ? 'Адрес скопирован' : 'Скопировать адрес' }}
          </button>
        </aside>
      </div>

      <hr v-reveal class="hairline venue__rule">

      <ul class="venue__facts">
        <li v-for="(fact, index) in venueFacts" :key="fact.id" v-reveal="index * 90" class="venue__fact">
          <component :is="factIcons[fact.icon]" class="venue__fact-icon" />
          <h3 class="venue__fact-title">{{ fact.title }}</h3>
          <p v-for="line in fact.lines" :key="line" class="venue__fact-line">{{ line }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/style/variables/color.scss" as color;
@use "@/style/variables/font.scss" as font;
@use "@/style/variables/transition.scss" as transition;

.venue {
  position: relative;
  isolation: isolate;
}

.venue__media {
  position: absolute;
  inset: 0;
  z-index: -1;
}

// Аэрофотоснимок Урюпинска остаётся резким — только приглушаем цвет,
// чтобы он читался как атмосферный фон, а не как самостоятельная картинка.
.venue__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: saturate(0.42) brightness(1.05) contrast(1.02);
}

.venue__scrim {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(11, 12, 18, 0.9) 0%, rgba(11, 12, 18, 0.58) 45%, rgba(11, 12, 18, 0.92) 100%),
    radial-gradient(ellipse at 34% 42%, rgba(6, 7, 11, 0.05), rgba(6, 7, 11, 0.58) 100%);
}

.venue__top {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.65fr);
  gap: clamp(32px, 6vw, 80px);
  align-items: end;

  @media all and (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
    align-items: start;
  }
}

.venue__title {
  font-size: clamp(46px, 9vw, 110px);
  color: color.$paper-bright;
}

.venue__region {
  margin: 18px 0 0;
  font-size: 9.5px;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(232, 225, 214, 0.6);
}

.venue__note {
  margin-top: 24px;
  color: rgba(211, 204, 191, 0.88);
}

.venue__card {
  padding: clamp(26px, 3vw, 36px);
  border: 1px solid color.$line-on-dark;
  background: rgba(11, 12, 18, 0.72);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  @media all and (max-width: 900px) {
    max-width: 420px;
  }
}

.venue__card-icon {
  font-size: 18px;
  color: rgba(232, 225, 214, 0.7);
}

.venue__card-label {
  margin: 20px 0 0;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: color.$smoke;
}

.venue__card-city {
  margin: 12px 0 0;
  font-family: font.$heading;
  font-size: clamp(24px, 3vw, 32px);
  line-height: 1.12;
  color: color.$paper-bright;
}

.venue__card-region {
  margin: 8px 0 0;
  font-size: 13px;
  color: color.$smoke;
}

.venue__route {
  margin-top: 26px;
  width: 100%;
}

.venue__copy {
  margin-top: 12px;
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border: 1px solid color.$line-on-dark;
  border-radius: 2px;
  background: transparent;
  font-family: inherit;
  font-size: 9.5px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: color.$smoke;
  cursor: pointer;
  transition: color transition.$fast, border-color transition.$fast;

  svg {
    font-size: 13px;
  }

  &:hover {
    color: color.$paper-bright;
    border-color: rgba(221, 214, 201, 0.4);
  }
}

.venue__rule {
  margin: clamp(48px, 7vw, 90px) 0 0;
}

.venue__facts {
  list-style: none;
  margin: 44px 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(28px, 4vw, 56px);

  @media all and (max-width: 780px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 34px;
  }
}

.venue__fact-icon {
  font-size: 17px;
  color: rgba(232, 225, 214, 0.62);
}

.venue__fact-title {
  margin: 18px 0 0;
  font-family: font.$heading;
  font-size: 19px;
  color: color.$paper-bright;
}

.venue__fact-line {
  margin: 8px 0 0;
  font-size: 13px;
  line-height: 1.7;
  color: color.$smoke;
}
</style>
