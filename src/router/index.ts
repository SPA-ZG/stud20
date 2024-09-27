import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'weather',
      component: () => import('../views/WeatherView.vue')
    },
    {
      path: '/show-weather',
      name: 'showWeather',
      component: () => import('../views/ShowWeatherView.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'error not found',
      component: () => import('../views/ErrorNotFoundView.vue')
    }
  ]
})

export default router
