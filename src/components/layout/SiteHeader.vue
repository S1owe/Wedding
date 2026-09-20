<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import MenuIcon from '@icons/MenuIcon.vue';
import CloseIcon from '@icons/CloseIcon.vue';
import { BRIDE_NAME, GROOM_NAME } from '@/data/weddingConfig';

const links = [
  { href: '#story', label: 'История' },
  { href: '#program', label: 'Программа' },
  { href: '#venue', label: 'Место' },
  { href: '#dresscode', label: 'Дресс-код' },
];

const monogram = computed(() => `${GROOM_NAME.charAt(0)} · ${BRIDE_NAME.charAt(0)}`);

const isScrolled = ref(false);
const isMenuOpen = ref(false);

const onScroll = () => {
  isScrolled.value = window.scrollY > 40;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

onMounted(() => {
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>

<template>
  <header class="site-header" :class="{ 'site-header--solid': isScrolled || isMenuOpen }">
    <div class="site-header__bar">
      <a class="site-header__monogram" href="#top" @click="closeMenu">{{ monogram }}</a>

      <nav class="site-header__nav">
        <a v-for="link in links" :key="link.href" :href="link.href">{{ link.label }}</a>
      </nav>

      <div class="site-header__actions">
        <a class="btn btn--ghost site-header__cta" href="#rsvp" @click="closeMenu">Ответить</a>
        <button
          type="button"
          class="site-header__burger"
          :aria-label="isMenuOpen ? 'Закрыть меню' : 'Открыть меню'"
          :aria-expanded="isMenuOpen"
          @click="isMenuOpen = !isMenuOpen"
        >
          <CloseIcon v-if="isMenuOpen" />
          <MenuIcon v-else />
        </button>
      </div>
    </div>

    <transition name="fadeFast">
      <nav v-if="isMenuOpen" class="site-header__drawer">
        <a v-for="link in links" :key="link.href" :href="link.href" @click="closeMenu">
          {{ link.label }}
        </a>
        <a class="site-header__drawer-cta" href="#rsvp" @click="closeMenu">Ответить</a>
      </nav>
    </transition>
  </header>
</template>

<style scoped lang="scss">
@use "@/style/variables/color.scss" as color;
@use "@/style/variables/font.scss" as font;
@use "@/style/variables/transition.scss" as transition;

.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  border-bottom: 1px solid transparent;
  transition: background transition.$medium, border-color transition.$medium,
              backdrop-filter transition.$medium;

  &--solid {
    background: rgba(11, 12, 18, 0.82);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom-color: color.$line-on-dark;
  }
}

.site-header__bar {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(16px, 4vw, 40px);
  height: 62px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.site-header__monogram {
  font-family: font.$heading;
  font-size: 15px;
  letter-spacing: 0.18em;
  color: color.$paper-bright;
  text-decoration: none;
  white-space: nowrap;
}

.site-header__nav {
  display: flex;
  align-items: center;
  gap: clamp(18px, 3vw, 40px);

  a {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: color.$silver;
    text-decoration: none;
    opacity: 0.72;
    transition: opacity transition.$fast;

    &:hover {
      opacity: 1;
    }
  }

  @media all and (max-width: 860px) {
    display: none;
  }
}

.site-header__actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.site-header__cta {
  padding: 11px 22px;

  @media all and (max-width: 520px) {
    display: none;
  }
}

.site-header__burger {
  display: none;
  width: 38px;
  height: 38px;
  align-items: center;
  justify-content: center;
  border: 1px solid color.$line-on-dark;
  border-radius: 2px;
  background: transparent;
  color: color.$paper-bright;
  font-size: 17px;
  cursor: pointer;

  @media all and (max-width: 860px) {
    display: flex;
  }
}

.site-header__drawer {
  display: flex;
  flex-direction: column;
  padding: 8px clamp(16px, 4vw, 40px) 24px;
  border-top: 1px solid color.$line-on-dark;

  a {
    padding: 15px 0;
    border-bottom: 1px solid color.$line-on-dark;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: color.$silver;
    text-decoration: none;
  }
}

.site-header__drawer-cta {
  color: color.$paper-bright !important;
  border-bottom: none !important;
}
</style>
