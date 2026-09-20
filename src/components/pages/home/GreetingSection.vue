<script setup lang="ts">
import ChapterMark from '@ui/ChapterMark.vue';
import { COUPLE_SHORT, WEDDING_DATE_LABEL } from '@/data/weddingConfig';
</script>

<template>
  <section id="story" class="band band--cream story">
    <div class="shell">
      <ChapterMark index="01" label="Наша история" />

      <div class="editorial">
        <div class="story__text">
          <span v-reveal class="eyebrow">Дорогие родные и друзья</span>

          <h2 v-reveal="60" class="display">Этот день не случится без вас.</h2>

          <p v-reveal="120" class="story__lead">
            Мы рады пригласить вас на самое важное событие в нашей жизни — день нашей свадьбы.
            Пусть он наполнится теплом, радостью и любовью.
          </p>

          <p v-reveal="180" class="lede">
            Нам хочется запомнить не идеальные декорации, а взгляды, голоса и тепло людей рядом.
            Приходите красивыми, оставайтесь до финальных титров — и будем счастливы видеть
            каждого из вас.
          </p>

          <div v-reveal="240" class="story__sign">
            <hr class="hairline">
            <span>С любовью,</span>
            <p class="story__sign-names">{{ COUPLE_SHORT }}</p>
          </div>
        </div>

        <figure v-reveal="120" class="story__figure">
          <span class="story__frame" aria-hidden="true" />
          <div class="story__photo">
            <img src="/images/story-bouquet.jpg" alt="Букет невесты из пудровых роз и гортензии" loading="lazy">
          </div>
          <figcaption class="story__caption">
            <span>{{ WEDDING_DATE_LABEL }}</span>
            <span>Один день · одна история</span>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/style/variables/color.scss" as color;
@use "@/style/variables/font.scss" as font;

.story__lead {
  margin: 30px 0 0;
  max-width: 42ch;
  font-family: font.$heading;
  font-size: clamp(17px, 2.1vw, 21px);
  line-height: 1.62;
  color: color.$ink;
}

.story__sign {
  margin-top: 44px;
  max-width: 260px;

  span {
    display: block;
    margin-top: 18px;
    font-size: 11.5px;
    color: color.$soft-text;
  }
}

.story__sign-names {
  margin: 6px 0 0;
  font-family: font.$heading;
  font-style: italic;
  font-size: clamp(20px, 2.6vw, 26px);
  color: color.$accent;
}

.story__figure {
  position: relative;
  margin: 0;
  padding: 22px 0 0 22px;

  @media all and (max-width: 900px) {
    max-width: 440px;
  }
}

// Тонкая винная рамка со сдвигом — редакционный приём вместо тени.
.story__frame {
  position: absolute;
  top: 0;
  left: 0;
  width: 46%;
  height: 34%;
  border-top: 1px solid color.$accent-soft;
  border-left: 1px solid color.$accent-soft;
}

.story__photo {
  position: relative;
  overflow: hidden;
  background: color.$cream-deep;
  aspect-ratio: 3 / 4;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 1.4s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover img {
    transform: scale(1.03);
  }
}

.story__caption {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 2px 0;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: color.$soft-text;
}

@media (prefers-reduced-motion: reduce) {
  .story__photo:hover img {
    transform: none;
  }
}
</style>
