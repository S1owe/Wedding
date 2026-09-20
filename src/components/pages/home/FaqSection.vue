<script setup lang="ts">
import { ref } from 'vue';
import ChapterMark from '@ui/ChapterMark.vue';
import ChevronDownIcon from '@icons/ChevronDownIcon.vue';
import faq from '@/data/faq';

const openId = ref<number | null>(faq[0]?.id ?? null);

const toggle = (id: number) => {
  openId.value = openId.value === id ? null : id;
};

const pad = (value: number) => String(value).padStart(2, '0');
</script>

<template>
  <section id="faq" class="band band--paper faq">
    <div class="shell">
      <ChapterMark index="08" label="Важные детали" />

      <div class="editorial">
        <div>
          <span v-reveal class="eyebrow">Перед торжеством</span>
          <h2 v-reveal="60" class="display">Возможно,<br>вы хотели спросить</h2>
        </div>

        <ul class="faq__list">
          <li
            v-for="(item, index) in faq"
            :key="item.id"
            v-reveal="index * 70"
            class="faq__item"
            :class="{ 'faq__item--open': openId === item.id }"
          >
            <button
              type="button"
              class="faq__question"
              :aria-expanded="openId === item.id"
              @click="toggle(item.id)"
            >
              <span class="faq__index">{{ pad(index + 1) }}</span>
              <span class="faq__question-text">{{ item.question }}</span>
              <ChevronDownIcon class="faq__chevron" />
            </button>

            <div class="faq__answer-wrap">
              <p class="faq__answer">{{ item.answer }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/style/variables/color.scss" as color;
@use "@/style/variables/font.scss" as font;
@use "@/style/variables/transition.scss" as transition;

.faq__list {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid color.$line-on-light;
}

.faq__item {
  border-bottom: 1px solid color.$line-on-light;
}

.faq__question {
  width: 100%;
  display: grid;
  grid-template-columns: 30px minmax(0, 1fr) 18px;
  align-items: center;
  gap: 14px;
  padding: 22px 0;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
  color: color.$ink;
}

.faq__index {
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.18em;
  color: color.$muted-text;
  opacity: 0.7;
}

.faq__question-text {
  font-family: font.$heading;
  font-size: clamp(16px, 1.9vw, 20px);
}

.faq__chevron {
  font-size: 17px;
  color: color.$muted-text;
  transition: transform transition.$fast;
}

.faq__item--open .faq__chevron {
  transform: rotate(180deg);
}

// Раскрытие через grid-template-rows: анимируется без фиксированной высоты.
.faq__answer-wrap {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.4s transition.$ease-out;
}

.faq__item--open .faq__answer-wrap {
  grid-template-rows: 1fr;
}

.faq__answer {
  overflow: hidden;
  margin: 0;
  padding-left: 44px;
  font-size: 14px;
  line-height: 1.8;
  color: color.$muted-text;

  @media all and (max-width: 520px) {
    padding-left: 0;
  }
}

.faq__item--open .faq__answer {
  padding-bottom: 24px;
}

@media (prefers-reduced-motion: reduce) {
  .faq__answer-wrap {
    transition: none;
  }
}
</style>
