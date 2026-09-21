<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { createTimeline, animate, stagger, svg, utils } from 'animejs';
import type { Timeline } from 'animejs';
import { BRIDE_NAME, GROOM_NAME, WEDDING_DATE_SPACED } from '@/data/weddingConfig';

const emit = defineEmits<{
  /** Сайт пора показать — занавес начинает расходиться. */
  reveal: [];
  /** Анимация закончилась, прелоадер можно размонтировать. */
  finished: [];
}>();

const root = ref<HTMLElement | null>(null);

const groomInitial = computed(() => GROOM_NAME.charAt(0));
const brideInitial = computed(() => BRIDE_NAME.charAt(0));

// Заголовок разбираем на буквы, чтобы проявлять его посимвольно.
// Пробелы заменяем на неразрывные — иначе пустые span схлопнутся.
const eyebrowChars = 'Приглашение на свадьбу'.split('').map((c) => (c === ' ' ? ' ' : c));

interface Petal {
  left: number;
  size: number;
  hue: string;
  drift: number;
  duration: number;
  delay: number;
}

// Лепестки заданы вручную, а не случайно: так композиция стабильна
// и не «прыгает» между перезагрузками.
const petals: Petal[] = [
  { left: 8, size: 13, hue: '#f4d9de', drift: 34, duration: 7200, delay: 0 },
  { left: 19, size: 8, hue: '#dcebf4', drift: -26, duration: 8400, delay: 900 },
  { left: 31, size: 11, hue: '#e0d5e8', drift: 18, duration: 6600, delay: 1800 },
  { left: 43, size: 7, hue: '#ecdfc8', drift: -30, duration: 9000, delay: 400 },
  { left: 56, size: 12, hue: '#e9c7cd', drift: 24, duration: 7800, delay: 2300 },
  { left: 68, size: 9, hue: '#dbe4d6', drift: -20, duration: 8200, delay: 1300 },
  { left: 79, size: 14, hue: '#f4d9de', drift: 30, duration: 6900, delay: 2900 },
  { left: 90, size: 8, hue: '#d3e3f0', drift: -16, duration: 8800, delay: 600 },
];

const isSkipVisible = ref(false);
let timeline: Timeline | null = null;
let petalAnimations: ReturnType<typeof animate>[] = [];
let skipTimer: ReturnType<typeof setTimeout> | undefined;
let failsafeTimer: ReturnType<typeof setTimeout> | undefined;
let hasRevealed = false;
let hasFinished = false;

const doReveal = () => {
  if (hasRevealed) return;
  hasRevealed = true;
  emit('reveal');
};

// Скролл на время вступления гасим событиями, а не `overflow: hidden`:
// последний убрал бы полосу прокрутки, из-за чего вьюпорт стал бы шире
// и `position: fixed` прелоадер разъехался бы с контентом сайта.
const blockScroll = (event: Event) => {
  if (event.cancelable) event.preventDefault();
};

const lockScroll = () => {
  window.addEventListener('wheel', blockScroll, { passive: false });
  window.addEventListener('touchmove', blockScroll, { passive: false });
};

const unlockScroll = () => {
  window.removeEventListener('wheel', blockScroll);
  window.removeEventListener('touchmove', blockScroll);
};

const doFinish = () => {
  if (hasFinished) return;
  hasFinished = true;
  clearTimeout(failsafeTimer);
  unlockScroll();
  emit('finished');
};

/** Досрочное завершение: быстро убираем занавес и отдаём сайт. */
const skip = () => {
  if (hasFinished) return;
  isSkipVisible.value = false;
  timeline?.pause();

  const scope = root.value;
  if (!scope) {
    doReveal();
    doFinish();
    return;
  }

  animate(scope.querySelectorAll('.intro__stage, .intro__petals, .intro__progress'), {
    opacity: 0,
    duration: 280,
    ease: 'outQuad',
  });

  doReveal();

  animate(scope.querySelectorAll('.intro__curtain--top'), {
    translateY: ['0%', '-100%'],
    duration: 620,
    delay: 140,
    ease: 'inOutQuart',
    onComplete: doFinish,
  });

  animate(scope.querySelectorAll('.intro__curtain--bottom'), {
    translateY: ['0%', '100%'],
    duration: 620,
    delay: 140,
    ease: 'inOutQuart',
  });
};

const buildTimeline = () => {
  const scope = root.value;
  if (!scope) return;

  const q = (sel: string) => scope.querySelectorAll(sel);

  // Лепестки живут своей петлёй, независимо от основного таймлайна:
  // у каждого свой снос в сторону, скорость и задержка.
  const petalNodes = q('.intro__petal');
  petalAnimations = petals.flatMap((petal, index) => {
    const node = petalNodes[index];
    if (!node) return [];

    return animate(node, {
      keyframes: {
        '0%': { translateY: '16vh', translateX: '0px', rotate: '0deg', opacity: 0 },
        '14%': { opacity: 0.7 },
        '76%': { opacity: 0.7 },
        '100%': {
          translateY: '-86vh',
          translateX: `${petal.drift}px`,
          rotate: `${petal.drift * 5}deg`,
          opacity: 0,
        },
      },
      duration: petal.duration,
      delay: petal.delay,
      ease: 'linear',
      loop: true,
    });
  });

  timeline = createTimeline({
    defaults: { ease: 'outQuart' },
  });

  timeline
    // Полоска прогресса тянется всё время, пока идёт вступление.
    .add('.intro__progress-bar', { scaleX: [0, 1], duration: 3400, ease: 'inOutQuad' }, 0)

    // Надпись проявляется по буквам.
    .add(
      q('.intro__char'),
      {
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 620,
        delay: stagger(24),
      },
      120,
    )

    // Тонкое кольцо обводится вокруг монограммы.
    .add(
      svg.createDrawable('.intro__ring-path'),
      { draw: ['0 0', '0 1'], duration: 1250, ease: 'inOutSine' },
      320,
    )

    // Инициалы поднимаются одна за другой.
    .add(
      q('.intro__initial'),
      {
        opacity: [0, 1],
        translateY: [26, 0],
        scale: [0.9, 1],
        duration: 820,
        delay: stagger(120),
      },
      560,
    )

    // Линейки расходятся от даты в стороны.
    .add('.intro__rule', { scaleX: [0, 1], duration: 900 }, 1250)

    // Дата «садится» из разреженного трекинга в нормальный.
    .add(
      '.intro__date',
      {
        opacity: [0, 1],
        letterSpacing: ['0.9em', '0.34em'],
        duration: 950,
      },
      1350,
    )

    // Едва заметный «вдох» всей композиции перед уходом.
    .add('.intro__stage', { scale: [1, 1.03], duration: 1100, ease: 'inOutSine' }, 2300)

    .call(() => {
      isSkipVisible.value = false;
    }, 3150)

    // Композиция уходит вверх и растворяется.
    .add(
      '.intro__stage',
      { opacity: [1, 0], translateY: [0, -24], duration: 640, ease: 'inQuad' },
      3250,
    )
    .add(
      q('.intro__petals, .intro__progress'),
      { opacity: [1, 0], duration: 640, ease: 'inQuad' },
      3250,
    )

    // Занавес расходится — за ним уже готовый сайт.
    .call(doReveal, 3820)
    .add(
      '.intro__curtain--top',
      { translateY: ['0%', '-100%'], duration: 1150, ease: 'inOutQuart' },
      3820,
    )
    .add(
      '.intro__curtain--bottom',
      { translateY: ['0%', '100%'], duration: 1150, ease: 'inOutQuart' },
      3820,
    )
    .call(doFinish, 4980);
};

onMounted(() => {
  lockScroll();

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    // Без движения: короткая пауза, чтобы шрифты успели примениться, и сразу сайт.
    skipTimer = setTimeout(() => {
      doReveal();
      doFinish();
    }, 400);
    return;
  }

  utils.set('.intro__stage, .intro__petals', { opacity: 1 });
  buildTimeline();

  skipTimer = setTimeout(() => {
    isSkipVisible.value = true;
  }, 1400);

  // Страховка: прелоадер перекрывает весь сайт, поэтому он обязан уйти,
  // даже если анимация не стартовала (ошибка, зависший движок и т. п.).
  // anime останавливает движок в скрытой вкладке — отмеряем время только
  // тогда, когда страница действительно видна.
  let visibleMs = 0;
  const tick = () => {
    if (document.visibilityState === 'visible') visibleMs += 500;
    if (visibleMs >= 9000) {
      doReveal();
      doFinish();
      return;
    }
    failsafeTimer = setTimeout(tick, 500);
  };
  failsafeTimer = setTimeout(tick, 500);
});

onBeforeUnmount(() => {
  clearTimeout(skipTimer);
  clearTimeout(failsafeTimer);
  timeline?.revert();
  petalAnimations.forEach((a) => a.revert());
  petalAnimations = [];
  unlockScroll();
});
</script>

<template>
  <div ref="root" class="intro">
    <span class="intro__curtain intro__curtain--top" />
    <span class="intro__curtain intro__curtain--bottom" />

    <div class="intro__petals" aria-hidden="true">
      <span
        v-for="(petal, index) in petals"
        :key="index"
        class="intro__petal"
        :data-drift="petal.drift"
        :data-duration="petal.duration"
        :data-delay="petal.delay"
        :style="{
          left: petal.left + '%',
          width: petal.size + 'px',
          height: petal.size + 'px',
          background: petal.hue,
        }"
      />
    </div>

    <div class="intro__stage">
      <p class="intro__eyebrow">
        <span v-for="(char, index) in eyebrowChars" :key="index" class="intro__char">{{ char }}</span>
      </p>

      <div class="intro__monogram">
        <svg class="intro__ring" viewBox="0 0 200 200" aria-hidden="true">
          <circle class="intro__ring-path" cx="100" cy="100" r="88" />
        </svg>

        <p class="intro__initials">
          <span class="intro__initial">{{ groomInitial }}</span>
          <i class="intro__initial intro__initial--amp">&amp;</i>
          <span class="intro__initial">{{ brideInitial }}</span>
        </p>
      </div>

      <div class="intro__rule-row">
        <span class="intro__rule intro__rule--left" />
        <span class="intro__date">{{ WEDDING_DATE_SPACED }}</span>
        <span class="intro__rule intro__rule--right" />
      </div>
    </div>

    <div class="intro__progress" aria-hidden="true">
      <span class="intro__progress-bar" />
    </div>

    <transition name="fadeFast">
      <button v-if="isSkipVisible" type="button" class="intro__skip" @click="skip">
        Пропустить
      </button>
    </transition>
  </div>
</template>

<style scoped lang="scss">
@use "@/style/variables/color.scss" as color;
@use "@/style/variables/font.scss" as font;
@use "@/style/variables/transition.scss" as transition;

.intro {
  position: fixed;
  inset: 0;
  z-index: 100;
  overflow: hidden;
  overscroll-behavior: none;
}

// Фон даёт не сам слой, а две «шторы»: в финале они расходятся
// и открывают уже отрисованный сайт.
.intro__curtain {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 1;
  background: color.$cream;
  will-change: transform;

  &--top {
    top: 0;
    // 50.5% на каждую половину — страховка от щели из-за дробной высоты вьюпорта.
    height: 50.5%;
    box-shadow: 0 1px 0 color.$cream;
  }

  &--bottom {
    bottom: 0;
    height: 50.5%;
    box-shadow: 0 -1px 0 color.$cream;
  }
}

.intro__petals {
  position: absolute;
  inset: 0;
  z-index: 2;
  opacity: 0;
  pointer-events: none;
}

.intro__petal {
  position: absolute;
  bottom: 0;
  display: block;
  border-radius: 62% 38% 58% 42%;
  opacity: 0;
  filter: blur(0.3px);
  will-change: transform, opacity;
}

.intro__stage {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 34px;
  padding: 24px;
  opacity: 0;
  will-change: transform, opacity;
}

.intro__eyebrow {
  margin: 0;
  display: flex;
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.34em;
  text-transform: uppercase;
  color: color.$accent;
}

.intro__char {
  display: inline-block;
  opacity: 0;
  white-space: pre;
  will-change: transform, opacity;
}

.intro__monogram {
  position: relative;
  width: min(48vw, 200px);
  height: min(48vw, 200px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.intro__ring {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  // Круг рисуется от «трёх часов», поворот отправляет старт наверх.
  transform: rotate(-90deg);
  overflow: visible;
}

.intro__ring-path {
  fill: none;
  stroke: color.$accent-soft;
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
}

.intro__initials {
  margin: 0;
  display: flex;
  align-items: baseline;
  font-family: font.$heading;
  font-size: clamp(34px, 9vw, 52px);
  line-height: 1;
  color: color.$ink;
}

.intro__initial {
  display: inline-block;
  opacity: 0;
  will-change: transform, opacity;

  &--amp {
    font-style: italic;
    color: color.$accent-soft;
    padding: 0 0.18em;
  }
}

.intro__rule-row {
  display: flex;
  align-items: center;
  gap: 18px;
}

.intro__rule {
  display: block;
  width: clamp(28px, 9vw, 64px);
  height: 1px;
  background: color.$line;
  transform: scaleX(0);
  will-change: transform;

  &--left {
    transform-origin: right center;
  }

  &--right {
    transform-origin: left center;
  }
}

.intro__date {
  font-family: font.$heading;
  font-size: clamp(11px, 2.4vw, 14px);
  letter-spacing: 0.34em;
  text-indent: 0.34em;
  white-space: nowrap;
  color: color.$body-text;
  opacity: 0;
}

.intro__progress {
  position: absolute;
  left: 50%;
  bottom: clamp(40px, 9vh, 88px);
  z-index: 3;
  width: min(42vw, 180px);
  height: 1px;
  transform: translateX(-50%);
  background: color.$line-soft;
}

.intro__progress-bar {
  display: block;
  width: 100%;
  height: 100%;
  background: color.$accent-soft;
  transform: scaleX(0);
  transform-origin: left center;
  will-change: transform;
}

.intro__skip {
  position: absolute;
  right: clamp(18px, 4vw, 40px);
  bottom: clamp(18px, 4vw, 36px);
  z-index: 4;
  padding: 10px 4px;
  border: none;
  background: none;
  font-family: font.$body;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: color.$soft-text;
  cursor: pointer;
  transition: color transition.$fast;

  &:hover {
    color: color.$ink;
  }
}
</style>
