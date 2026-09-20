<script setup lang="ts">
import SectionHeading from '@ui/SectionHeading.vue';
import timeline from '@/data/timeline';
</script>

<template>
  <section v-chapter="'timeline'" class="section timeline-section">
    <div class="section-panel">
      <SectionHeading eyebrow="Как пройдёт день" title="Программа дня" />

      <ol class="timeline">
        <li
          v-for="(stage, index) in timeline"
          :key="stage.id"
          v-reveal="index * 90"
          class="timeline__item"
        >
          <span class="timeline__time">{{ stage.time }}</span>

          <span class="timeline__marker">
            <span class="timeline__dot" />
          </span>

          <span class="timeline__content">
            <span class="timeline__title">{{ stage.title }}</span>
            <span class="timeline__address">{{ stage.address }}</span>
          </span>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/style/variables/color.scss" as color;
@use "@/style/variables/font.scss" as font;

.timeline {
  list-style: none;
  margin: 64px 0 0;
  padding: 0;
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;
}

.timeline__item {
  display: grid;
  grid-template-columns: 64px 20px 1fr;
  column-gap: 22px;
  padding-bottom: 40px;

  &:last-child {
    padding-bottom: 0;

    .timeline__marker::after {
      display: none;
    }
  }
}

.timeline__time {
  font-family: font.$heading;
  font-style: italic;
  font-size: 17px;
  color: color.$ink;
  padding-top: 1px;
  text-align: right;
}

.timeline__marker {
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 5px;

  &::after {
    content: '';
    position: absolute;
    top: 16px;
    bottom: -40px;
    width: 1px;
    background: color.$hairline;
  }
}

.timeline__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: color.$accent-pink;
  flex: none;
}

.timeline__content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.timeline__title {
  font-size: 15.5px;
  font-weight: 500;
  color: color.$ink;
}

.timeline__address {
  font-size: 13.5px;
  font-weight: 300;
  color: color.$muted-text;
}

@media all and (max-width: 480px) {
  .timeline__item {
    grid-template-columns: 52px 18px 1fr;
    column-gap: 14px;
  }

  .timeline__time {
    font-size: 14.5px;
  }
}
</style>
