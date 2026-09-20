<script setup lang="ts">
import ChapterMark from '@ui/ChapterMark.vue';
import timeline from '@/data/timeline';

const pad = (value: number) => String(value).padStart(2, '0');
</script>

<template>
  <section id="program" class="band band--cream program">
    <div class="shell">
      <ChapterMark index="04" label="Программа" />

      <div class="editorial program__grid">
        <div class="program__intro">
          <span v-reveal class="eyebrow">Сценарий дня</span>
          <h2 v-reveal="60" class="display">Шесть сцен.<br>Один день.</h2>
          <p v-reveal="120" class="lede">
            Мы не просим приходить строго по расписанию — но так вам будет проще спланировать
            дорогу, наряд и силы до самого вечера.
          </p>
        </div>

        <ol class="program__list">
          <li
            v-for="(stage, index) in timeline"
            :key="stage.id"
            v-reveal="index * 70"
            class="program__item"
          >
            <span class="program__index">{{ pad(index + 1) }}</span>
            <span class="program__time">{{ stage.time }}</span>

            <span class="program__body">
              <span class="program__title">{{ stage.title }}</span>
              <span class="program__note">{{ stage.note }}</span>
            </span>

            <span class="program__dot" aria-hidden="true" />
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/style/variables/color.scss" as color;
@use "@/style/variables/font.scss" as font;
@use "@/style/variables/transition.scss" as transition;

.program__grid {
  align-items: start;
}

.program__intro {
  position: sticky;
  top: 110px;

  @media all and (max-width: 900px) {
    position: static;
  }
}

.program__list {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid color.$line;
}

.program__item {
  display: grid;
  grid-template-columns: 34px 62px minmax(0, 1fr) 10px;
  align-items: baseline;
  gap: 16px;
  padding: 26px 0;
  border-bottom: 1px solid color.$line;
  transition: background transition.$fast;

  &:hover {
    background: rgba(63, 54, 64, 0.025);
  }

  @media all and (max-width: 520px) {
    grid-template-columns: 26px 52px minmax(0, 1fr);
    gap: 12px;

    .program__dot {
      display: none;
    }
  }
}

.program__index {
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.18em;
  color: color.$soft-text;
}

.program__time {
  font-family: font.$heading;
  font-size: clamp(19px, 2.4vw, 25px);
  color: color.$ink;
  font-variant-numeric: tabular-nums;
}

.program__body {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.program__title {
  font-family: font.$heading;
  font-size: clamp(17px, 2vw, 21px);
  color: color.$ink;
}

.program__note {
  font-size: 12.5px;
  line-height: 1.6;
  color: color.$body-text;
}

.program__dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: color.$accent-soft;
  align-self: center;
}
</style>
