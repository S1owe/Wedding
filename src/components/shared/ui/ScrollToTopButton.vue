<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import ArrowUpIcon from '@icons/ArrowUpIcon.vue';

const isVisible = ref(false);

const onScroll = () => {
  isVisible.value = window.scrollY > window.innerHeight * 1.2;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
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
  <transition name="fadeMedium">
    <button
      v-if="isVisible"
      type="button"
      class="to-top"
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

.to-top {
  position: fixed;
  right: clamp(16px, 3vw, 32px);
  bottom: clamp(16px, 3vw, 32px);
  z-index: 40;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid color.$line;
  background: rgba(250, 247, 244, 0.86);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: color.$ink;
  font-size: 16px;
  cursor: pointer;
  transition: background transition.$fast, border-color transition.$fast;

  &:hover {
    background: color.$ink;
    color: color.$cream;
    border-color: color.$ink;
  }
}
</style>
