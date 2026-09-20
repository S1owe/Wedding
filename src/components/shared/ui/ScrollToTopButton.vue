<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import ArrowUpIcon from '@icons/ArrowUpIcon.vue';

const isVisible = ref(false);

const handleScroll = () => {
  isVisible.value = window.scrollY > 480;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <transition name="fadeFast">
    <button
      v-if="isVisible"
      type="button"
      class="scroll-to-top"
      aria-label="Наверх"
      @click="scrollToTop"
    >
      <ArrowUpIcon />
    </button>
  </transition>
</template>

<style scoped lang="scss">
@use "@/style/variables/color.scss" as color;
@use "@/style/variables/transition.scss" as transition;

.scroll-to-top {
  position: fixed;
  right: 28px;
  bottom: 28px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid color.$hairline;
  background: color.$paper;
  box-shadow: 0 16px 32px -18px rgba(47, 42, 46, 0.4);
  color: color.$ink;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 60;
  transition: transform transition.$fast, border-color transition.$fast, color transition.$fast;

  &:hover {
    transform: translateY(-3px);
    border-color: color.$accent-pink;
    color: color.$accent-pink;
  }

  @media all and (max-width: 599px) {
    right: 18px;
    bottom: 18px;
    width: 40px;
    height: 40px;
  }
}
</style>
