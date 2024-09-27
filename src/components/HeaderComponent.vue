<script lang="ts">
import { ForecastParameters } from '@/assets/ForecastParameters';
import { forecastParametersStore } from '../stores/forecastParametersStore'

export default {
  data() {
    return {
      location: undefined as unknown as any,
      error: undefined as unknown as any,
      currentDate: undefined as unknown as Date,
      currentDateString: undefined as unknown as string
    };
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.showPosition,
          this.showError
        );
      } else {
        this.error = 'Geolocation is not supported by this browser.';
      }
    },
    getCurrentDate() {
      this.currentDate = new Date();
      const day: number = this.currentDate.getDate();
      const month: number = this.currentDate.getMonth() + 1;
      const year: number = this.currentDate.getFullYear();
      const formattedDay: string = day < 10 ? `0${day}` : `${day}`;
      const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;
      this.currentDateString = `${formattedDay}.${formattedMonth}.${year}.`;
    },
    showPosition(position: any) {
      this.location = {
        latitude: position.coords.latitude.toFixed(2),
        longitude: position.coords.longitude.toFixed(2),
      };
      this.error = null;
      let prognoseParameters = new ForecastParameters(this.location.latitude, this.location.longitude, this.currentDate);
      forecastParametersStore().setCurrentParameters(prognoseParameters);
    },
    showError(error:any) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          this.error = 'User denied the request for Geolocation.';
          break;
        case error.POSITION_UNAVAILABLE:
          this.error = 'Location information is unavailable.';
          break;
        case error.TIMEOUT:
          this.error = 'The request to get user location timed out.';
          break;
        case error.UNKNOWN_ERROR:
          this.error = 'An unknown error occurred.';
          break;
      }
      this.location = null;
    },
  },
  mounted() {
    this.getCurrentDate();
    this.getLocation();
  },
};
</script>

<template>
  <header>
    <div class="title-div">
        <h1>Weather forecast at your location</h1>
    </div>
    <div class="header-div">
      <div class="content-div" v-if="location">
          <p>Your location</p>
          <p>Latitude: {{ location.latitude }}</p>
          <p>Longitude: {{ location.longitude }}</p>
      </div>
      <div class="content-div" v-if="error">
          <p>Error: {{ error }}</p>
      </div>
      <div class="content-div">
        <p>Today is (dd.mm.yyyy):</p>
        <p>{{ currentDateString }}</p>
      </div>
    </div>
  </header>
</template>

<style scoped>
.title-div {
  color: darkgreen  ;
}

.content-div {
    display: block;
    min-width: 250px;
    margin-bottom: 10px;
}

.header-div {
    display: flex;
}

header {
    border-bottom: 1px solid #ccc;
}
</style>
