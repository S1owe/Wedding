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
      <span class="venue__veil" />
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
  filter: saturate(0.72) brightness(0.98) contrast(1.04);
}

.venue__veil {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(250, 247, 244, 0.7) 0%, rgba(250, 247, 244, 0.48) 44%, rgba(250, 247, 244, 0.24) 78%, rgba(250, 247, 244, 0.2) 100%),
    linear-gradient(180deg, rgba(250, 247, 244, 0.3) 0%, rgba(250, 247, 244, 0.04) 36%, rgba(250, 247, 244, 0.26) 62%, rgba(246, 236, 232, 0.5) 100%);
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
}

.venue__region {
  margin: 28px 0 0;
  font-size: 9.5px;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: color.$soft-text;
}

.venue__note {
  margin-top: 24px;
}

.venue__card {
  padding: clamp(26px, 3vw, 36px);
  border: 1px solid color.$line;
  background: rgba(250, 247, 244, 0.86);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  @media all and (max-width: 900px) {
    max-width: 420px;
  }
}

.venue__card-icon {
  font-size: 18px;
  color: color.$accent;
}

.venue__card-label {
  margin: 20px 0 0;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: color.$soft-text;
}

.venue__card-city {
  margin: 12px 0 0;
  font-family: font.$heading;
  font-size: clamp(24px, 3vw, 32px);
  line-height: 1.12;
  color: color.$ink;
}

.venue__card-region {
  margin: 8px 0 0;
  font-size: 13px;
  color: color.$body-text;
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
  border: 1px solid color.$line;
  border-radius: 2px;
  background: transparent;
  font-family: inherit;
  font-size: 9.5px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: color.$soft-text;
  cursor: pointer;
  transition: color transition.$fast, border-color transition.$fast;

  svg {
    font-size: 13px;
  }

  &:hover {
    color: color.$ink;
    border-color: color.$accent-soft;
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
  color: color.$accent;
}

.venue__fact-title {
  margin: 18px 0 0;
  font-family: font.$heading;
  font-size: 19px;
  color: color.$ink;
}

.venue__fact-line {
  margin: 8px 0 0;
  font-size: 13px;
  line-height: 1.7;
  color: color.$ink;
}
</style>
