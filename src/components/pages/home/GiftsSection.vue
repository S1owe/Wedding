<script setup lang="ts">
import SectionHeading from '@ui/SectionHeading.vue';
import EnvelopeIcon from '@icons/EnvelopeIcon.vue';
</script>

<template>
  <section v-chapter="'timeline'" class="section gifts">
    <div v-reveal class="section-panel gifts-panel">
      <EnvelopeIcon class="gifts__icon" />
      <SectionHeading title="О подарках" />
      <p class="section__text">
        Дорогие гости! Мы будем рады любому вашему вниманию и подарку.
        Но если вы захотите порадовать нас, лучшим подарком станут ваши тёплые пожелания
        в конвертах, которые помогут нам исполнить наши общие мечты.
        А ещё на нашем празднике вас ждут увлекательные денежные конкурсы!
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/style/variables/color.scss" as color;

.gifts {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.gifts-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 3px solid color.$accent-pink;
  box-shadow: 0 40px 80px -32px rgba(233, 55, 113, 0.28);
}

.gifts__icon {
  font-size: 30px;
  color: color.$accent-pink;
  margin-bottom: 24px;
}
</style>
