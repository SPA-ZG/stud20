<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import WeatherSearchComponent from '@/components/WeatherSearchComponent.vue'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <WeatherSearchComponent/>
</template>

<style scoped>
.body-div {
    height: 100%;
    display: flex;
    flex-direction: column;
}
.content {
    flex: 1;
}
</style>
