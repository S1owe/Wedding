<script setup lang="ts">
import SectionHeading from '@ui/SectionHeading.vue';
import HeartIcon from '@icons/HeartIcon.vue';
</script>

<template>
  <section v-chapter="'love'" class="section greeting on-photo">
    <SectionHeading eyebrow="Добро пожаловать" title="Дорогие гости" />
    <p class="section__text">
      Мы рады пригласить вас на самое важное событие в нашей жизни — день нашей свадьбы!
      Пусть этот день наполнится теплом, радостью и любовью.
      Будем счастливы видеть каждого из вас!
    </p>
    <HeartIcon class="greeting__icon" />
  </section>
</template>

<style scoped lang="scss">
@use "@/style/variables/color.scss" as color;
@use "@/style/variables/font.scss" as font;

.greeting {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 70vh;
  justify-content: center;
}

.greeting__tagline {
  font-family: font.$heading;
  font-style: italic;
  font-size: clamp(18px, 3vw, 24px);
  color: color.$white;
  text-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
  margin: 0 0 40px;
}

.greeting__icon {
  margin-top: 36px;
  font-size: 16px;
  color: color.$light-pink;
}
</style>
