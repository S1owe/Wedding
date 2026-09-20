<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { GROOM_NAME, BRIDE_NAME, WEDDING_DATE_LABEL } from '@/data/weddingConfig';

const emit = defineEmits<{ complete: [] }>();

const isOpen = ref(false);
const isClosing = ref(false);

const groomInitial = computed(() => GROOM_NAME.charAt(0));
const brideInitial = computed(() => BRIDE_NAME.charAt(0));

interface Petal {
  left: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

const petals: Petal[] = [
  { left: 10, size: 9, delay: 0, duration: 2600, color: '#f4d9de' },
  { left: 24, size: 13, delay: 120, duration: 3000, color: '#dcebf4' },
  { left: 37, size: 8, delay: 260, duration: 2400, color: '#e0d5e8' },
  { left: 50, size: 11, delay: 60, duration: 2800, color: '#e9c7cd' },
  { left: 63, size: 9, delay: 220, duration: 2500, color: '#dbe4d6' },
  { left: 76, size: 13, delay: 40, duration: 3200, color: '#dcebf4' },
  { left: 88, size: 10, delay: 180, duration: 2700, color: '#f4d9de' },
  { left: 45, size: 8, delay: 320, duration: 2900, color: '#ecdfc8' },
];

let autoOpenTimer: ReturnType<typeof setTimeout> | undefined;
let closeTimer: ReturnType<typeof setTimeout> | undefined;
let completeTimer: ReturnType<typeof setTimeout> | undefined;

const openEnvelope = () => {
  if (isOpen.value) return;
  isOpen.value = true;

  closeTimer = setTimeout(() => {
    isClosing.value = true;
  }, 2000);

  completeTimer = setTimeout(() => {
    emit('complete');
  }, 2700);
};

onMounted(() => {
  document.body.classList.add('no-scroll');
  autoOpenTimer = setTimeout(openEnvelope, 2800);
});

onBeforeUnmount(() => {
  document.body.classList.remove('no-scroll');
  clearTimeout(autoOpenTimer);
  clearTimeout(closeTimer);
  clearTimeout(completeTimer);
});
</script>

<template>
  <div class="envelope-loader" :class="{ 'envelope-loader--closing': isClosing }">
    <div class="envelope-loader__scene">
      <div
        class="envelope"
        :class="{ 'envelope--open': isOpen }"
        role="button"
        tabindex="0"
        aria-label="Открыть приглашение"
        @click="openEnvelope"
        @keydown.enter="openEnvelope"
        @keydown.space.prevent="openEnvelope"
      >
        <div class="envelope__shadow" />

        <div class="envelope__body">
          <div class="envelope__letter">
            <span class="envelope__letter-label">Приглашение</span>
            <p class="envelope__letter-names">{{ groomInitial }}<i>&amp;</i>{{ brideInitial }}</p>
            <p class="envelope__letter-date">{{ WEDDING_DATE_LABEL }}</p>
          </div>

          <div class="envelope__pocket" />

          <div class="envelope__flap">
            <span class="envelope__flap-face envelope__flap-face--front" />
            <span class="envelope__flap-face envelope__flap-face--back" />
          </div>

          <div class="envelope__seal">
            <span>{{ groomInitial }}&amp;{{ brideInitial }}</span>
          </div>
        </div>
      </div>

      <p class="envelope-loader__hint">
        {{ isOpen ? 'Открываем приглашение...' : 'Нажмите на конверт' }}
      </p>
    </div>

    <div class="envelope-loader__petals" :class="{ 'envelope-loader__petals--active': isOpen }" aria-hidden="true">
      <span
        v-for="(petal, index) in petals"
        :key="index"
        class="petal"
        :style="{
          left: petal.left + '%',
          width: petal.size + 'px',
          height: petal.size + 'px',
          background: petal.color,
          animationDelay: petal.delay + 'ms',
          animationDuration: petal.duration + 'ms',
        }"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/style/variables/color.scss" as color;
@use "@/style/variables/font.scss" as font;

.envelope-loader {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background: color.$paper;
  transition: opacity 0.7s ease, visibility 0.7s ease;

  &--closing {
    opacity: 0;
    visibility: hidden;
  }
}

.envelope-loader__scene {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  perspective: 1600px;
}

.envelope-loader__hint {
  font-family: font.$body;
  font-size: 11px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: color.$muted-text;
  opacity: 0.85;
  animation: pulse 2s ease-in-out infinite;
}

.envelope {
  position: relative;
  width: min(82vw, 320px);
  height: min(51vw, 198px);
  cursor: pointer;
  transform-style: preserve-3d;
  animation: envelopeSway 6s ease-in-out infinite;
}

.envelope--open {
  animation: none;
  transform: rotateY(0deg) rotateX(0deg);
}

.envelope__shadow {
  position: absolute;
  left: 10%;
  right: 10%;
  bottom: -22px;
  height: 20px;
  border-radius: 50%;
  background: radial-gradient(closest-side, rgba(47, 42, 46, 0.22), transparent 72%);
  transition: transform 1s ease, opacity 1s ease;
}

.envelope--open .envelope__shadow {
  transform: scaleX(1.2);
  opacity: 0.55;
}

.envelope__body {
  position: absolute;
  inset: 0;
  border-radius: 4px;
  background: color.$paper;
  border: 1px solid color.$hairline;
  box-shadow: 0 34px 64px -26px rgba(47, 42, 46, 0.38);
  transform-style: preserve-3d;
}

.envelope__letter {
  position: absolute;
  left: 11%;
  right: 11%;
  top: 13%;
  height: 76%;
  background: color.$white;
  border-top: 3px solid color.$sky-blue;
  border-radius: 2px;
  box-shadow: 0 10px 24px rgba(47, 42, 46, 0.16);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  text-align: center;
  padding: 10px;
  z-index: 1;
  transform: translateY(0) scale(1);
  transition: transform 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.4s,
              box-shadow 1.1s ease 0.4s,
              z-index 0s 0.4s;
}

.envelope__letter-label {
  font-size: 9px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: color.$muted-text;
}

.envelope__letter-names {
  font-family: font.$heading;
  font-style: italic;
  font-size: clamp(16px, 3.6vw, 20px);
  color: color.$ink;
  margin: 0;

  i {
    color: color.$accent-pink;
    padding: 0 6px;
    font-style: italic;
  }
}

.envelope__letter-date {
  font-size: 10.5px;
  letter-spacing: 0.12em;
  color: color.$muted-text;
  margin: 0;
}

.envelope__pocket {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: color.$paper-shade;
  border-radius: 4px;
  clip-path: polygon(0 100%, 0 44%, 50% 76%, 100% 44%, 100% 100%);
}

.envelope__flap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 56%;
  transform-origin: top center;
  transform-style: preserve-3d;
  z-index: 3;
  transition: transform 1s cubic-bezier(0.65, 0, 0.35, 1);
}

.envelope__flap-face {
  position: absolute;
  inset: 0;
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  border-radius: 4px 4px 0 0;
  backface-visibility: hidden;
}

.envelope__flap-face--front {
  background: color.$paper;
  border-bottom: 1px solid color.$hairline;
}

.envelope__flap-face--back {
  background: color.$paper-shade;
  transform: rotateX(180deg);
}

.envelope__seal {
  position: absolute;
  top: 42%;
  left: 50%;
  width: 38px;
  height: 38px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: color.$accent-pink;
  color: color.$white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: font.$heading;
  font-style: italic;
  font-size: 12.5px;
  z-index: 4;
  box-shadow: 0 8px 18px rgba(233, 55, 113, 0.35), inset 0 -3px 6px rgba(0, 0, 0, 0.15);
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.envelope--open {
  .envelope__flap {
    transform: rotateX(180deg);
  }

  .envelope__letter {
    transform: translateY(-64%) scale(1.04);
    z-index: 5;
    box-shadow: 0 26px 48px rgba(47, 42, 46, 0.22);
  }

  .envelope__seal {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.4);
  }
}

.envelope-loader__petals {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.envelope-loader__petals--active {
  opacity: 1;
}

.petal {
  position: absolute;
  bottom: 40%;
  border-radius: 60% 40% 60% 40%;
  opacity: 0;
  animation-name: petalFloat;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
}

@keyframes envelopeSway {
  0%, 100% { transform: rotateY(-5deg) rotateX(2deg); }
  50% { transform: rotateY(5deg) rotateX(-1deg); }
}

@keyframes petalFloat {
  0% { opacity: 0; transform: translateY(0) rotate(0deg) scale(0.6); }
  16% { opacity: 0.9; }
  100% { opacity: 0; transform: translateY(-230px) rotate(230deg) scale(1); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.45; }
  50% { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .envelope {
    animation: none;
  }
}
</style>
