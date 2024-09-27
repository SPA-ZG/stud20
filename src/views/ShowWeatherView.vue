<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import WeatherSearchComponent from '@/components/WeatherSearchComponent.vue';
import ShowWeatherComponent from '@/components/ShowWeatherComponent.vue'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <WeatherSearchComponent/>
  <ShowWeatherComponent/>    
</template>

<style scoped>
</style>
