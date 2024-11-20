// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// eslint-disable-next-line no-undef
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  pages: true,
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  css: ['@/assets/css/main.css', '@/assets/css/custom-vuetify.css'],

  runtimeConfig: {
    public: {
      apiBase: 'https://api.themoviedb.org/3',
      apiKey: process.env.API_KEY
    }
  },

  modules: [
    '@nuxtjs/eslint-module',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    }
  ],

  build: {
    transpile: ['vuetify']
  },

  vite: {
    vue: {
      template: {
        transformAssetUrls
      }
    }
  }
})
