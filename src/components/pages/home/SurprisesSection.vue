<script setup lang="ts">
import { ref } from 'vue';
import SectionHeading from '@ui/SectionHeading.vue';
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
  <section v-chapter="'surprises'" class="section surprises">
    <div v-reveal class="section-panel">
      <SectionHeading eyebrow="Есть идея?" title="Ваши сюрпризы" />
      <p class="section__text">
        У вас есть отдельное пожелание, сюрприз или конкурс для нас?
        Свяжитесь с нашим ведущим, чтобы обсудить все детали!
      </p>

      <button type="button" class="surprises__contact" @click="copyContact">
        <span>{{ SURPRISES_CONTACT }}</span>
        <CheckIcon v-if="isCopied" />
        <CopyIcon v-else />
      </button>
      <p class="surprises__hint">{{ isCopied ? 'Скопировано!' : 'Нажмите, чтобы скопировать' }}</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/style/variables/color.scss" as color;
@use "@/style/variables/transition.scss" as transition;

.surprises {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.surprises .section-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.surprises__contact {
  margin-top: 36px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 13px 30px;
  border: 1px solid color.$accent-pink;
  border-radius: 999px;
  font-family: inherit;
  font-size: 15px;
  font-weight: 500;
  color: color.$accent-pink;
  background: transparent;
  cursor: pointer;
  transition: background transition.$fast, color transition.$fast;

  &:hover {
    background: color.$accent-pink;
    color: color.$white;
  }

  svg {
    font-size: 15px;
  }
}

.surprises__hint {
  margin-top: 16px;
  font-size: 12.5px;
  color: color.$muted-text;
}
</style>
