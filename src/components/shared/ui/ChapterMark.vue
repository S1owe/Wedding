<script setup lang="ts">
defineProps<{
  /** Порядковый номер главы, например «01». */
  index: string;
  label: string;
}>();
</script>

<template>
  <p v-reveal class="chapter-mark">
    <span>{{ index }}</span>
    <i>/</i>
    <span>{{ label }}</span>
  </p>
</template>
