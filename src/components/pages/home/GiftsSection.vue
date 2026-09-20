<script setup lang="ts">
import ChapterMark from '@ui/ChapterMark.vue';
import EnvelopeIcon from '@icons/EnvelopeIcon.vue';
</script>

<template>
  <section id="gifts" class="band band--mist gifts">
    <div class="shell">
      <ChapterMark index="05" label="О подарках" />

      <div class="editorial">
        <div>
          <span v-reveal class="eyebrow">Дорогие гости</span>
          <h2 v-reveal="60" class="display">Лучший подарок — вы рядом.</h2>
        </div>

        <div v-reveal="120" class="gifts__note">
          <EnvelopeIcon class="gifts__icon" />

          <p class="gifts__text">
            Мы будем рады любому вашему вниманию. Но если захочется порадовать нас чем-то
            большим — лучшим подарком станут тёплые пожелания в конверте: они помогут нам
            исполнить наши общие мечты.
          </p>

          <hr class="hairline gifts__rule">

          <p class="gifts__aside serif-note">
            А ещё на празднике вас ждут денежные конкурсы — будет весело.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/style/variables/color.scss" as color;

.gifts__note {
  padding: clamp(28px, 4vw, 44px);
  border: 1px solid color.$line;
  background: color.$cream;
}

.gifts__icon {
  font-size: 20px;
  color: color.$accent;
}

.gifts__text {
  margin: 22px 0 0;
  font-size: 15px;
  line-height: 1.85;
  color: color.$body-text;
}

.gifts__rule {
  margin: 26px 0;
}

.gifts__aside {
  margin: 0;
}
</style>
