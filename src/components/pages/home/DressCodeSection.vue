<script setup lang="ts">
import ChapterMark from '@ui/ChapterMark.vue';
import dressCode from '@/data/dressCode';
</script>

<template>
  <section id="dresscode" class="band band--paper dress-code">
    <div class="shell">
      <ChapterMark index="06" label="Дресс-код" />

      <div class="editorial">
        <div>
          <span v-reveal class="eyebrow">Pastel · optional</span>
          <h2 v-reveal="60" class="display">Мягкие оттенки.<br>Чистые линии.</h2>

          <p v-reveal="120" class="lede">
            Дресс-код не обязателен, но нам будет особенно приятно увидеть вас в образах
            из этой палитры — пастельных и неярких. Просим оставить белый цвет невесте
            и отказаться от активных принтов.
          </p>

          <div v-reveal="180" class="dress-code__advice">
            <div>
              <p class="dress-code__advice-title">Для неё</p>
              <p class="dress-code__advice-text">
                Платье миди или макси, костюм, сдержанные украшения.
              </p>
            </div>
            <div>
              <p class="dress-code__advice-title">Для него</p>
              <p class="dress-code__advice-text">
                Светлая рубашка или поло, лёгкий костюм без галстука.
              </p>
            </div>
          </div>
        </div>

        <div v-reveal="120" class="dress-code__card-wrap">
          <span class="dress-code__card-shadow" aria-hidden="true" />

          <div class="dress-code__card">
            <p class="dress-code__card-label">Палитра вечера</p>

            <ul class="dress-code__palette">
              <li v-for="color in dressCode" :key="color.hex" class="dress-code__swatch">
                <span class="dress-code__chip" :style="{ background: color.hex }" />
                <span class="dress-code__name">{{ color.name }}</span>
              </li>
            </ul>

            <p class="dress-code__hint serif-note">
              <i aria-hidden="true">✳</i>
              Главное — образ, в котором вы чувствуете себя собой.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/style/variables/color.scss" as color;

.dress-code__advice {
  margin-top: 44px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 28px;
  max-width: 460px;

  > div {
    border-top: 1px solid color.$line-on-light;
    padding-top: 16px;
  }

  @media all and (max-width: 520px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 20px;
  }
}

.dress-code__advice-title {
  margin: 0;
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: color.$wine;
}

.dress-code__advice-text {
  margin: 10px 0 0;
  font-size: 13px;
  line-height: 1.7;
  color: color.$muted-text;
}

.dress-code__card-wrap {
  position: relative;
  padding: 0 20px 20px 0;
}

// Смещённый «двойник» карточки — редакционная глубина без тени.
.dress-code__card-shadow {
  position: absolute;
  right: 0;
  bottom: 0;
  width: calc(100% - 34px);
  height: calc(100% - 34px);
  background: color.$paper-shade;
}

.dress-code__card {
  position: relative;
  padding: clamp(26px, 3.4vw, 40px);
  background: color.$paper-bright;
  border: 1px solid color.$line-on-light;
}

.dress-code__card-label {
  margin: 0;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: color.$muted-text;
}

.dress-code__palette {
  list-style: none;
  margin: 28px 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 6px;

  @media all and (max-width: 420px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 10px;
  }
}

.dress-code__swatch {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
}

.dress-code__chip {
  display: block;
  height: clamp(86px, 13vw, 128px);
  border: 1px solid rgba(11, 12, 18, 0.08);
}

.dress-code__name {
  font-size: 8.5px;
  color: color.$muted-text;
  text-align: center;
  // Длинные названия («Champagne») чуть выходят в межколоночный зазор —
  // это лучше, чем обрезать их многоточием.
  white-space: nowrap;
  overflow: visible;
}

.dress-code__hint {
  margin: 30px 0 0;
  display: flex;
  gap: 10px;
  color: color.$ink;

  i {
    font-style: normal;
    color: color.$wine;
    font-size: 12px;
    line-height: 1.7;
  }
}
</style>
