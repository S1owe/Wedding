<script setup lang="ts">
import ArrowRightIcon from '@icons/ArrowRightIcon.vue';
import ArrowDownIcon from '@icons/ArrowDownIcon.vue';
import { useCountdown } from '@/composables/useCountdown';
import {
  BRIDE_NAME,
  GROOM_NAME,
  HERO_TAGLINE,
  VENUE_CITY,
  WEDDING_DATE_SPACED,
  WEDDING_DAY,
  WEDDING_MONTH_INDEX,
  WEDDING_START_HOUR,
  WEDDING_YEAR,
} from '@/data/weddingConfig';

const { parts } = useCountdown(
  new Date(WEDDING_YEAR, WEDDING_MONTH_INDEX, WEDDING_DAY, WEDDING_START_HOUR, 0, 0),
);
</script>

<template>
  <section id="top" class="hero">
    <div class="hero__media">
      <img class="hero__img" src="/images/hero-couple.jpg" alt="" fetchpriority="high">
      <span class="hero__scrim" />
      <span class="hero__vignette" />
    </div>

    <p class="hero__chapter">
      <span>Глава первая</span>
      <i />
      <span>{{ VENUE_CITY.replace('г. ', '') }}</span>
    </p>

    <div class="hero__content">
      <p class="hero__eyebrow">Приглашение на свадьбу</p>

      <h1 class="hero__names">
        {{ GROOM_NAME }}<i>&amp;</i>{{ BRIDE_NAME }}
      </h1>

      <p class="hero__date">{{ WEDDING_DATE_SPACED }}</p>
      <p class="hero__tagline serif-note">{{ HERO_TAGLINE }}</p>

      <div class="hero__actions">
        <a class="btn btn--solid" href="#rsvp">
          Подтвердить присутствие
          <ArrowRightIcon />
        </a>
        <a class="btn btn--ghost" href="#story">
          Смотреть приглашение
          <ArrowDownIcon />
        </a>
      </div>
    </div>

    <p class="hero__hint" aria-hidden="true">Листайте вниз</p>

    <div class="hero__countdown">
      <span class="hero__count-unit"><b>{{ parts.days }}</b><i>дней</i></span>
      <em>:</em>
      <span class="hero__count-unit"><b>{{ parts.hours }}</b><i>часов</i></span>
      <em>:</em>
      <span class="hero__count-unit"><b>{{ parts.minutes }}</b><i>минут</i></span>
      <em>:</em>
      <span class="hero__count-unit"><b>{{ parts.seconds }}</b><i>секунд</i></span>
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
  padding: 110px clamp(20px, 5vw, 64px) 120px;
  background: color.$ink;
  overflow: hidden;
}

.hero__media {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 38%;
  display: block;
}

// Основной затемняющий слой — гарантирует контраст для белой типографики.
.hero__scrim {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(11, 12, 18, 0.86) 0%, rgba(11, 12, 18, 0.34) 38%, rgba(11, 12, 18, 0.9) 100%);
}

// Виньетка по краям — «киношный» объём.
.hero__vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 45%, transparent 28%, rgba(6, 7, 11, 0.72) 100%);
}

.hero__chapter,
.hero__content,
.hero__hint,
.hero__countdown {
  position: relative;
  z-index: 1;
}

.hero__chapter {
  position: absolute;
  top: 88px;
  left: clamp(20px, 5vw, 64px);
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 0;
  font-size: 9.5px;
  font-weight: 500;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(232, 225, 214, 0.62);

  i {
    width: 40px;
    height: 1px;
    background: rgba(232, 225, 214, 0.34);
  }

  @media all and (max-width: 720px) {
    display: none;
  }
}

.hero__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 900px;
}

.hero__eyebrow {
  margin: 0 0 24px;
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.34em;
  text-transform: uppercase;
  color: rgba(232, 225, 214, 0.72);
}

.hero__names {
  font-family: font.$heading;
  font-weight: 400;
  font-size: clamp(42px, 9.5vw, 104px);
  line-height: 1;
  letter-spacing: -0.02em;
  color: color.$paper-bright;
  text-shadow: 0 10px 46px rgba(6, 7, 11, 0.6);

  i {
    font-style: italic;
    font-weight: 400;
    color: rgba(232, 225, 214, 0.55);
    padding: 0 0.16em;
  }

  @media all and (max-width: 520px) {
    // На узких экранах имена разносим на две строки, чтобы не ломать кегль.
    display: flex;
    flex-direction: column;
    line-height: 1.02;

    i {
      padding: 0.02em 0;
      font-size: 0.7em;
    }
  }
}

.hero__date {
  margin: 26px 0 0;
  font-size: clamp(13px, 2.2vw, 17px);
  font-weight: 300;
  letter-spacing: 0.42em;
  text-indent: 0.42em;
  color: color.$paper-bright;
}

.hero__tagline {
  margin: 18px 0 0;
  max-width: 34ch;
  color: rgba(232, 225, 214, 0.78);
}

.hero__actions {
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}

.hero__hint {
  position: absolute;
  left: clamp(20px, 5vw, 64px);
  bottom: 120px;
  margin: 0;
  writing-mode: vertical-rl;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.34em;
  text-transform: uppercase;
  color: rgba(232, 225, 214, 0.5);

  &::after {
    content: '';
    display: block;
    width: 1px;
    height: 46px;
    margin: 14px auto 0;
    background: linear-gradient(180deg, rgba(232, 225, 214, 0.5), transparent);
  }

  @media all and (max-width: 900px) {
    display: none;
  }
}

.hero__countdown {
  position: absolute;
  right: clamp(20px, 5vw, 64px);
  bottom: 44px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: color.$paper-bright;

  em {
    font-style: normal;
    font-size: 15px;
    line-height: 1.6;
    opacity: 0.4;
  }

  @media all and (max-width: 720px) {
    left: 0;
    right: 0;
    justify-content: center;
    bottom: 28px;
  }
}

.hero__count-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 42px;

  b {
    font-family: font.$heading;
    font-weight: 400;
    font-size: clamp(19px, 2.6vw, 26px);
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }

  i {
    margin-top: 7px;
    font-style: normal;
    font-size: 8px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    opacity: 0.55;
  }
}
</style>
