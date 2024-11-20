import { createPinia } from 'pinia'

// eslint-disable-next-line no-undef
export default defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia()
  nuxtApp.vueApp.use(pinia)
  nuxtApp.provide('pinia', pinia)
})
