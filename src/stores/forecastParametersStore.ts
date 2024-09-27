import { ForecastParameters } from "@/assets/ForecastParameters";
import { defineStore } from "pinia";

export const forecastParametersStore = defineStore('location_store', {
    state: () => ({
      currentParameters: new ForecastParameters(0, 0, new Date()) as ForecastParameters
    }),
    actions: {
        setCurrentParameters(parameters: any) {
            this.currentParameters = parameters;
        }
    },
    getters: {
        getCurrentParameters: (state) => (): any => {
            return state.currentParameters;
        }
    }
});