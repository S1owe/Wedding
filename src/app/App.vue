<script setup lang="ts">
import dataManagement from "@/app/composables/dataManagement";

let {

} = dataManagement();
</script>

<template>
  <div class="wedding-invitation">
    <h1>Свадьба Ярослава и Александры</h1>
  </div>
</template>

<style lang="scss">
@use "@/style/variables/color.scss" as color;
@use "@/style/variables/transition.scss" as transition;
@use "../style/global";



/* 1. Маленькие компьютеры */
@media all and (max-width: 1599px) {

}

/* 2. Планшеты */
@media all and (max-width: 1199px) {
  .monopoly .mobile-navigation {
    display: flex;
  }
}

@media all and (max-width: 700px) {

}

/* 3. Моб. устройства */
@media all and (max-width: 599px) {

}
</style>
