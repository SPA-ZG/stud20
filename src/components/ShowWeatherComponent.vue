<script lang="ts">
import { ForecastParameters } from '@/assets/ForecastParameters';
import { forecastParametersStore } from '@/stores/forecastParametersStore';
import axios, { type AxiosResponse } from 'axios';
import { AsynchronousBackendStorageMock } from '@/assets/AsynchronousBackendStorageMock'

export default {
    data() {
        return {
            lat: Number.parseFloat(this.$route.query.lat as string),
            lon: Number.parseFloat(this.$route.query.lon as string),
            dateString: this.$route.query.date as string, 
            daysAhead: Number.parseInt(this.$route.query.days_ahead as string),
            weatherData: undefined as any
        }
    },
    methods: {
        transformDate(date: string): string {
            const dateObj = new Date(date);
            const year = dateObj.getFullYear();
            const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
            const day = dateObj.getDate().toString().padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;

            return formattedDate;
        },

        addDays(date: string, days: number): string {
            const dateObj = new Date(date);
            dateObj.setDate(dateObj.getDate() + days);
            const year = dateObj.getFullYear();
            const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
            const day = dateObj.getDate().toString().padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;

            return formattedDate;
        },

        async fetchWeatherData() {
            let startDate = this.transformDate(this.dateString);
            let endDate = this.addDays(startDate, this.daysAhead);

            let forecast = await AsynchronousBackendStorageMock.getInstance().getForecast(this.lat, this.lon, startDate, endDate);
            if (forecast === null) {
                try {
                    let urlString = `https://api.open-meteo.com/v1/forecast?latitude=${this.lat}&longitude=${this.lon}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max`
                    var response = await axios.get(urlString);
                } catch (error) {
                    console.error("Error fetching data:", error);
                    return;
                }

                let prognoseParameters = new ForecastParameters(this.lat, this.lon, new Date(this.dateString));
                forecast = response.data;
                await AsynchronousBackendStorageMock.getInstance().storeForecast(forecast);
            }
            
            return forecast;
        }
    },
    computed: {
        averageMaxTemperature() {
            let sum = 0;
            let temperatures = this.weatherData.daily.temperature_2m_max;
            for (let index in temperatures) {
                sum += Number.parseFloat(temperatures[index]);
            }
            return sum / (this.daysAhead + 1);
        },
        averageMinTemperature() {
            let sum = 0;
            let temperatures = this.weatherData.daily.temperature_2m_min;
            for (let index in temperatures) {
                sum += Number.parseFloat(temperatures[index]);
            }
            return sum / (this.daysAhead + 1);
        }
    },
    watch: {
        async $route(newRoute, oldRoute) {
            this.lat = Number.parseFloat(this.$route.query.lat as string),
            this.lon = Number.parseFloat(this.$route.query.lon as string),
            this.dateString = this.$route.query.date as string, 
            this.daysAhead = Number.parseInt(this.$route.query.days_ahead as string),
            this.weatherData = await this.fetchWeatherData();
            if (this.weatherData === null) return;
        }
    },

    async beforeMount() {
        this.weatherData = await this.fetchWeatherData();
        if (this.weatherData === null) return;
    }
}
</script>

<template>
    <div>
        <table class="weather-table">
        <thead>
            <tr v-if="weatherData !== undefined">
                <th>Date {{ weatherData.daily_units.time }}</th>
                <th>Max temperature {{ weatherData.daily_units.temperature_2m_max }}</th>
                <th>Min temperature {{ weatherData.daily_units.temperature_2m_min }}</th>
                <th>Precipitation sum {{ weatherData.daily_units.precipitation_sum }}</th>
                <th>Precipitation probability {{ weatherData.daily_units.precipitation_probability_max }}</th>
                <th>Max wind speed {{ weatherData.daily_units.wind_speed_10m_max }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="weatherData !== undefined" v-for="(index) in daysAhead + 1" :key="index">
                <td class="date-entry">{{ weatherData.daily.time[index - 1] }}</td>
                <td class="weather-entry">{{ weatherData.daily.temperature_2m_max[index - 1] }}</td>
                <td class="weather-entry">{{ weatherData.daily.temperature_2m_min[index - 1] }}</td>
                <td class="weather-entry">{{ weatherData.daily.precipitation_sum[index - 1] }}</td>
                <td class="weather-entry">{{ weatherData.daily.precipitation_probability_max[index - 1] }}</td>
                <td class="weather-entry">{{ weatherData.daily.wind_speed_10m_max[index - 1] }}</td>
            </tr>
        </tbody>
    </table>
    </div>
    <div class="stats-div">
        <p v-if="weatherData !== undefined">Average max. temperature for today and {{ daysAhead }} days ahead is {{ averageMaxTemperature.toFixed(2) }}</p>
        <p v-if="weatherData !== undefined">Average min. temperature for today and {{ daysAhead }} days ahead is {{ averageMinTemperature.toFixed(2) }}</p>
    </div>
    
</template>

<style>
.weather-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.weather-table th, .weather-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.weather-table th {
    background-color: black;
}

.date-entry {
    background-color: black;
}

.weather-entry {
    background-color: rgb(53, 61, 37);
}

.stats-div {
    margin-top: 10px;
}
</style>