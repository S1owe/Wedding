<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string;
    title: string;
  }>(),
  { eyebrow: '' },
);
</script>

<template>
  <div v-reveal class="section-heading">
    <span v-if="eyebrow" class="section__eyebrow">{{ eyebrow }}</span>
    <h2 class="section__title">{{ title }}</h2>
    <div class="section__divider" />
  </div>
</template>

<style scoped lang="scss">
.section-heading {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
