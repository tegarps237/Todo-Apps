/* eslint-disable no-undef */
import { useUserStore } from '~/stores/user'

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore()

  if (!userStore.user) {
    userStore.initAuth()
      .then(() => {
        if (userStore.user) {
          navigateTo('/todo')
        } else {
          navigateTo('/')
        }
      })
  }
})
