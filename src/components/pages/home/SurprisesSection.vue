<script setup lang="ts">
import { ref } from 'vue';
import ChapterMark from '@ui/ChapterMark.vue';
import CopyIcon from '@icons/CopyIcon.vue';
import CheckIcon from '@icons/CheckIcon.vue';
import { SURPRISES_CONTACTS } from '@/data/weddingConfig';
import HeartIcon from "@icons/HeartIcon.vue";

const copiedUrl = ref<string | null>(null);
let resetTimer: ReturnType<typeof setTimeout> | undefined;

const copyContact = async (url: string) => {
  try {
    await navigator.clipboard.writeText(url);
  } catch {
    return;
  }

  copiedUrl.value = url;
  clearTimeout(resetTimer);
  resetTimer = setTimeout(() => {
    copiedUrl.value = null;
  }, 2000);
};
</script>

<template>
  <section id="surprises" class="band band--sage surprises">
    <div class="shell">
      <ChapterMark index="07" label="Сюрпризы" />

      <div class="editorial">
        <div>
          <span v-reveal class="eyebrow">Есть идея?</span>
          <h2 v-reveal="60" class="display">Ваш сюрприз<br>мы сохраним в тайне</h2>
        </div>

        <div v-reveal="120" class="surprises__panel">
          <p class="lede surprises__text">
            Если у вас есть отдельное пожелание, номер, трогательное поздравление или конкурс для нас — напишите напрямую нашему ведущему или организатору. Они помогут деликатно вписать это в программу вечера так, чтобы для нас это осталось настоящим сюрпризом.
          </p>

          <div class="contacts">
            <div v-for="contact in SURPRISES_CONTACTS" :key="contact.url" class="contact-persons">
              <p class="contact-persons__hint">{{ contact.role }} — {{ contact.name }}</p>

              <button type="button" class="contact-persons__contact" @click="copyContact(contact.url)">
                <span>{{ contact.label }}</span>
                <transition name="fade" mode="out-in">
                  <CheckIcon class="contact-icon" v-if="copiedUrl === contact.url" key="check"/>
                  <CopyIcon class="contact-icon" v-else key="copy" />
                </transition>
              </button>
            </div>
          </div>

          <p class="lede surprises__ps">
            P.S. Тамара Растегаева и Иван Попов, это обязательно касается и вас! Мы очень ждем ваши творческие поздравления
            <HeartIcon class="svg-heart"/>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/style/variables/color.scss" as color;
@use "@/style/variables/font.scss" as font;
@use "@/style/variables/transition.scss" as transition;

.surprises__panel {
  padding: clamp(28px, 4vw, 44px);
  border: 1px solid color.$line;
  background: color.$cream;
}

.surprises__text {
  margin-top: 0;
}

.surprises__ps {
  margin-top: 20px;
  font-size: 13px;
  color: color.$soft-text;
  font-style: italic;
}

.svg-heart {
  width: 16px;
  height: auto;
  margin-bottom: -2px;

  :deep(path) {
    fill: color.$accent-soft;
  }
}

.contacts {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  gap: 20px;;
}

.contact-persons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-persons__hint {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: color.$soft-text;
  margin: 0;
}

.contact-persons__contact {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 18px 22px;
  border: 1px solid color.$line;
  border-radius: 2px;
  background: transparent;
  font-family: font.$heading;
  font-size: clamp(17px, 2.2vw, 22px);
  color: color.$ink;
  cursor: pointer;
  transition: border-color transition.$fast, background transition.$fast;

  svg {
    font-size: 16px;
    color: color.$soft-text;
    flex: none;
  }

  &:hover {
    border-color: color.$accent-soft;
    background: rgba(140, 84, 100, 0.04);
  }
}

.contact-icon {
  width: 22px;
  height: auto;

  @media all and (max-width: 520px) {
    width: 20px;
    height: auto;
  }
}
</style>
