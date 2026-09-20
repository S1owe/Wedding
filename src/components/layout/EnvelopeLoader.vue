<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { GROOM_NAME, BRIDE_NAME, WEDDING_DATE_SPACED } from '@/data/weddingConfig';

const emit = defineEmits<{ complete: [] }>();

const isOpen = ref(false);
const isClosing = ref(false);

const groomInitial = computed(() => GROOM_NAME.charAt(0));
const brideInitial = computed(() => BRIDE_NAME.charAt(0));

let autoOpenTimer: ReturnType<typeof setTimeout> | undefined;
let closeTimer: ReturnType<typeof setTimeout> | undefined;
let completeTimer: ReturnType<typeof setTimeout> | undefined;

const openEnvelope = () => {
  if (isOpen.value) return;
  isOpen.value = true;

  closeTimer = setTimeout(() => {
    isClosing.value = true;
  }, 1900);

  completeTimer = setTimeout(() => {
    emit('complete');
  }, 2600);
};

onMounted(() => {
  document.body.classList.add('no-scroll');
  autoOpenTimer = setTimeout(openEnvelope, 2600);
});

onBeforeUnmount(() => {
  document.body.classList.remove('no-scroll');
  clearTimeout(autoOpenTimer);
  clearTimeout(closeTimer);
  clearTimeout(completeTimer);
});
</script>

<template>
  <div class="loader" :class="{ 'loader--closing': isClosing }">
    <div class="loader__scene">
      <p class="loader__over">Приглашение на свадьбу</p>

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
        <div class="envelope__body">
          <div class="envelope__letter">
            <span class="envelope__letter-label">Save the date</span>
            <p class="envelope__letter-names">{{ groomInitial }}<i>&amp;</i>{{ brideInitial }}</p>
            <p class="envelope__letter-date">{{ WEDDING_DATE_SPACED }}</p>
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

      <p class="loader__hint">{{ isOpen ? 'Открываем…' : 'Нажмите на конверт' }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/style/variables/color.scss" as color;
@use "@/style/variables/font.scss" as font;

.loader {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background: color.$cream;
  transition: opacity 0.7s ease, visibility 0.7s ease;

  // Мягкое кремовое свечение вокруг конверта.
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(ellipse at 50% 46%, rgba(246, 236, 232, 0.9), transparent 62%);
  }

  &--closing {
    opacity: 0;
    visibility: hidden;
  }
}

.loader__scene {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  perspective: 1600px;
}

.loader__over {
  margin: 0;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.34em;
  text-transform: uppercase;
  color: color.$accent;
}

.loader__hint {
  margin: 0;
  font-size: 9px;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: color.$soft-text;
  animation: loaderPulse 2s ease-in-out infinite;
}

.envelope {
  position: relative;
  width: min(80vw, 300px);
  height: min(50vw, 186px);
  cursor: pointer;
  transform-style: preserve-3d;
  animation: envelopeSway 6s ease-in-out infinite;
}

.envelope--open {
  animation: none;
  transform: rotateY(0deg) rotateX(0deg);
}

.envelope__body {
  position: absolute;
  inset: 0;
  border-radius: 2px;
  background: color.$blush;
  box-shadow: 0 30px 60px -28px rgba(63, 54, 64, 0.3);
  transform-style: preserve-3d;
}

.envelope__letter {
  position: absolute;
  left: 10%;
  right: 10%;
  top: 12%;
  height: 78%;
  background: color.$cream;
  border-top: 2px solid color.$accent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;
  padding: 10px;
  z-index: 1;
  transform: translateY(0) scale(1);
  transition: transform 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.4s,
              box-shadow 1.1s ease 0.4s,
              z-index 0s 0.4s;
}

.envelope__letter-label {
  font-size: 8px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: color.$soft-text;
}

.envelope__letter-names {
  margin: 0;
  font-family: font.$heading;
  font-size: clamp(17px, 3.6vw, 22px);
  color: color.$ink;

  i {
    font-style: italic;
    color: color.$accent;
    padding: 0 0.16em;
  }
}

.envelope__letter-date {
  margin: 0;
  font-size: 9px;
  letter-spacing: 0.22em;
  color: color.$soft-text;
}

.envelope__pocket {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: color.$cream-deep;
  border-radius: 2px;
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
  border-radius: 2px 2px 0 0;
  backface-visibility: hidden;
}

.envelope__flap-face--front {
  background: color.$blush;
}

.envelope__flap-face--back {
  background: color.$cream-deep;
  transform: rotateX(180deg);
}

.envelope__seal {
  position: absolute;
  top: 42%;
  left: 50%;
  width: 40px;
  height: 40px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: color.$accent;
  color: color.$cream;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: font.$heading;
  font-size: 12px;
  letter-spacing: 0.04em;
  z-index: 4;
  box-shadow: inset 0 -3px 7px rgba(63, 54, 64, 0.35);
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.envelope--open {
  .envelope__flap {
    transform: rotateX(180deg);
  }

  .envelope__letter {
    transform: translateY(-64%) scale(1.04);
    z-index: 5;
    box-shadow: 0 24px 44px rgba(63, 54, 64, 0.22);
  }

  .envelope__seal {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.4);
  }
}

@keyframes envelopeSway {
  0%, 100% { transform: rotateY(-5deg) rotateX(2deg); }
  50% { transform: rotateY(5deg) rotateX(-1deg); }
}

@keyframes loaderPulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .envelope,
  .loader__hint {
    animation: none;
  }
}
</style>
