<script setup lang="ts">
import SectionHeading from '@ui/SectionHeading.vue';
import dressCode from '@/data/dressCode';
</script>

<template>
  <section v-chapter="'dresscode'" class="section dress-code">
    <div class="section-panel">
      <SectionHeading eyebrow="Как одеться" title="Дресс-код" />
      <p class="section__text">
        Дресс-код не обязателен, но мы будем рады видеть вас в пастельных и неярких тонах.
        Для мужчин — светлые рубашки или поло.
      </p>

      <ul class="dress-code__palette">
        <li
          v-for="(color, index) in dressCode"
          :key="color.hex"
          v-reveal="index * 60"
          class="dress-code__swatch"
        >
          <span class="dress-code__square" :style="{ background: color.hex }" />
          <span class="dress-code__name">{{ color.name }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/style/variables/color.scss" as color;

.dress-code {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dress-code .section-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dress-code__palette {
  list-style: none;
  margin: 48px 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 28px 30px;
  max-width: 640px;
}

.dress-code__swatch {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 92px;
}

.dress-code__square {
  width: 56px;
  height: 56px;
  border-radius: 6px;
  border: 1px solid rgba(47, 42, 46, 0.1);
  box-shadow: 0 16px 30px -12px color.$card-shadow;
  transition: transform 0.3s ease;

  .dress-code__swatch:hover & {
    transform: translateY(-4px);
  }
}

.dress-code__name {
  font-size: 12px;
  font-weight: 300;
  text-align: center;
  color: color.$muted-text;
  line-height: 1.35;
}
</style>
