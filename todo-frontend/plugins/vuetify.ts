import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

// eslint-disable-next-line no-undef
export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // ... config
  })
  app.vueApp.use(vuetify)
})
