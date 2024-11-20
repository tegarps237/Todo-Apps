import { NuxtApp } from '#app'

declare module '#app' {
  interface NuxtApp {
    $axios: typeof import('axios').default; // This declares $axios as the type of axios
  }
}