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
      <img class="hero__img" src="/images/hero-rings.jpg" alt="" fetchpriority="high">
      <span class="hero__veil" />
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
  background: color.$cream;
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
  object-position: center 42%;
  display: block;
}

// Вуаль сфокусирована на центре, где лежит текст: под именами она плотная,
// а к краям сходит почти на нет — так фотография остаётся яркой,
// но тёмная типографика всё равно читается.
.hero__veil {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 64% 54% at 50% 45%, rgba(250, 247, 244, 0.82) 0%, rgba(250, 247, 244, 0.46) 58%, rgba(250, 247, 244, 0) 100%),
    linear-gradient(180deg, rgba(250, 247, 244, 0.46) 0%, rgba(250, 247, 244, 0.06) 40%, rgba(246, 236, 232, 0.44) 100%);
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
  color: color.$soft-text;

  i {
    width: 40px;
    height: 1px;
    background: color.$line;
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
  color: color.$accent;
}

.hero__names {
  font-family: font.$heading;
  font-weight: 400;
  font-size: clamp(42px, 9.5vw, 104px);
  line-height: 1;
  letter-spacing: -0.02em;
  color: color.$ink;

  i {
    font-style: italic;
    font-weight: 400;
    color: color.$accent-soft;
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
  font-weight: 400;
  letter-spacing: 0.42em;
  text-indent: 0.42em;
  color: color.$ink;
}

.hero__tagline {
  margin: 18px 0 0;
  max-width: 34ch;
  color: color.$body-text;
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
  color: color.$soft-text;

  &::after {
    content: '';
    display: block;
    width: 1px;
    height: 46px;
    margin: 14px auto 0;
    background: linear-gradient(180deg, rgba(63, 54, 64, 0.3), transparent);
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
  color: color.$ink;

  em {
    font-style: normal;
    font-size: 15px;
    line-height: 1.6;
    color: color.$accent-soft;
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
    color: color.$soft-text;
  }
}
</style>
