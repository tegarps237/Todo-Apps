import axios from 'axios'

// eslint-disable-next-line no-undef
export default defineNuxtPlugin(() => {
  return {
    provide: {
      axios
    }
  }
})
