<script setup lang="ts">
import { ref } from 'vue';
import ChapterMark from '@ui/ChapterMark.vue';
import CopyIcon from '@icons/CopyIcon.vue';
import CheckIcon from '@icons/CheckIcon.vue';
import { SURPRISES_CONTACT } from '@/data/weddingConfig';

const isCopied = ref(false);
let resetTimer: ReturnType<typeof setTimeout> | undefined;

const copyContact = async () => {
  try {
    await navigator.clipboard.writeText(SURPRISES_CONTACT);
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
  <section id="surprises" class="band band--sage surprises">
    <div class="shell">
      <ChapterMark index="07" label="Сюрпризы" />

      <div class="editorial">
        <div>
          <span v-reveal class="eyebrow">Есть идея?</span>
          <h2 v-reveal="60" class="display">Ваш сюрприз<br>мы сохраним в тайне.</h2>
        </div>

        <div v-reveal="120" class="surprises__panel">
          <p class="lede surprises__text">
            Если у вас есть отдельное пожелание, номер или конкурс для нас — напишите нашему
            ведущему. Он поможет вписать это в вечер так, чтобы для нас это осталось сюрпризом.
          </p>

          <button type="button" class="surprises__contact" @click="copyContact">
            <span>{{ SURPRISES_CONTACT }}</span>
            <CheckIcon v-if="isCopied" />
            <CopyIcon v-else />
          </button>

          <p class="surprises__hint">
            {{ isCopied ? 'Скопировано' : 'Нажмите, чтобы скопировать' }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/style/variables/color.scss" as color;
@use "@/style/variables/font.scss" as font;
@use "@/style/variables/transition.scss" as transition;

.surprises__panel {
  padding: clamp(28px, 4vw, 44px);
  border: 1px solid color.$line;
  background: color.$cream;
}

.surprises__text {
  margin-top: 0;
}

.surprises__contact {
  margin-top: 30px;
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 18px 22px;
  border: 1px solid color.$line;
  border-radius: 2px;
  background: transparent;
  font-family: font.$heading;
  font-size: clamp(17px, 2.2vw, 22px);
  color: color.$ink;
  cursor: pointer;
  transition: border-color transition.$fast, background transition.$fast;

  svg {
    font-size: 16px;
    color: color.$soft-text;
    flex: none;
  }

  &:hover {
    border-color: color.$accent-soft;
    background: rgba(140, 84, 100, 0.04);
  }
}

.surprises__hint {
  margin: 14px 0 0;
  font-size: 9.5px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: color.$soft-text;
}
</style>
