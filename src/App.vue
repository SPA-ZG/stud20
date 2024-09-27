<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import WeatherView from './views/WeatherView.vue';
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
</script>

<template>
  <title>Simple weather app</title>
  <div class="wrapper">
    <HeaderComponent/>
    <body>
      <div class="body-div">
        <div class="content">
          <RouterView/>
        </div>
      </div>
    </body>
    <FooterComponent/>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
}
</style>
