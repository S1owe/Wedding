<script setup lang="ts">
import { ref } from 'vue';
import ShareIcon from '@icons/ShareIcon.vue';
import CheckIcon from '@icons/CheckIcon.vue';
import ArrowRightIcon from '@icons/ArrowRightIcon.vue';
import {
  BRIDE_NAME,
  GROOM_NAME,
  WEDDING_DATE_SPACED,
  WEDDING_DATE_LONG,
} from '@/data/weddingConfig';

const isShared = ref(false);
let resetTimer: ReturnType<typeof setTimeout> | undefined;

const shareInvitation = async () => {
  const url = window.location.origin + window.location.pathname;
  const title = `Приглашение на свадьбу — ${GROOM_NAME} и ${BRIDE_NAME}`;

  // Нативный share там, где он есть; иначе — тихо копируем ссылку.
  if (navigator.share) {
    try {
      await navigator.share({ title, url });
      return;
    } catch {
      return;
    }
  }

  try {
    await navigator.clipboard.writeText(url);
  } catch {
    return;
  }

  isShared.value = true;
  clearTimeout(resetTimer);
  resetTimer = setTimeout(() => {
    isShared.value = false;
  }, 2000);
};
</script>

<template>
  <footer class="site-footer">
    <section class="site-footer__hero">
      <div class="site-footer__media" aria-hidden="true">
        <img class="site-footer__img" src="/images/hero-rings.jpg" alt="" loading="lazy">
        <span class="site-footer__veil" />
      </div>

      <div class="site-footer__content">
        <p class="site-footer__eyebrow">До встречи в августе</p>

        <p class="site-footer__names">{{ GROOM_NAME }}<i>&amp;</i>{{ BRIDE_NAME }}</p>

        <p class="site-footer__date">{{ WEDDING_DATE_SPACED }}</p>

        <div class="site-footer__actions">
          <button type="button" class="btn btn--solid" @click="shareInvitation">
            <CheckIcon v-if="isShared" />
            <ShareIcon v-else />
            {{ isShared ? 'Ссылка скопирована' : 'Поделиться приглашением' }}
          </button>
          <a class="btn btn--ghost" href="#rsvp">
            Ответить
            <ArrowRightIcon />
          </a>
        </div>
      </div>
    </section>

    <div class="site-footer__bar">
      <div class="shell site-footer__bar-inner">
        <p class="site-footer__signature">{{ WEDDING_DATE_LONG }}</p>
        <p class="site-footer__credit">Сделано с любовью для наших гостей</p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@use "@/style/variables/color.scss" as color;
@use "@/style/variables/font.scss" as font;

.site-footer__hero {
  position: relative;
  min-height: 74svh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(80px, 12vw, 150px) clamp(20px, 5vw, 64px);
  background: color.$cream;
  overflow: hidden;
}

.site-footer__media {
  position: absolute;
  inset: 0;
}

.site-footer__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 40%;
  display: block;
}

.site-footer__veil {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 52% at 50% 48%, rgba(250, 247, 244, 0.84) 0%, rgba(250, 247, 244, 0.48) 58%, rgba(250, 247, 244, 0) 100%),
    linear-gradient(180deg, rgba(246, 236, 232, 0.5) 0%, rgba(250, 247, 244, 0.08) 45%, rgba(250, 247, 244, 0.5) 100%);
}

.site-footer__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.site-footer__eyebrow {
  margin: 0 0 22px;
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: color.$accent;
}

.site-footer__names {
  margin: 0;
  font-family: font.$heading;
  font-size: clamp(34px, 7vw, 76px);
  line-height: 1.04;
  letter-spacing: -0.02em;
  color: color.$ink;

  i {
    font-style: italic;
    color: color.$accent-soft;
    padding: 0 0.18em;
  }
}

.site-footer__date {
  margin: 20px 0 0;
  font-size: clamp(12px, 2vw, 15px);
  font-weight: 300;
  letter-spacing: 0.4em;
  text-indent: 0.4em;
  color: color.$ink;
}

.site-footer__actions {
  margin-top: 36px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}

.site-footer__bar {
  background: color.$blush;
  border-top: 1px solid color.$line;
  padding: 26px 0;
}

.site-footer__bar-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.site-footer__signature,
.site-footer__credit {
  margin: 0;
  font-size: 9.5px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: color.$soft-text;
}
</style>
