<script setup lang="ts">
import { ForecastParameters } from '@/assets/ForecastParameters';
import DropdownMenuComponent from './DropdownMenuComponent.vue';
import { forecastParametersStore } from '@/stores/forecastParametersStore';

</script>
<script lang="ts">
export default {
    methods: {
        handleSearchEvent(numberOfDaysSelected:number) {
            let currentParameters = forecastParametersStore().currentParameters;
            this.$router.push({ path: '/show-weather', query: { lat: currentParameters.lat, lon: currentParameters.lon, date: currentParameters.date.toDateString(), days_ahead: numberOfDaysSelected }});
            this.$emit("searchEvent");
        }
    }
}
</script>

<template>
        
    <DropdownMenuComponent @searchEvent="handleSearchEvent"/>
        
</template>

<style scoped>

</style>