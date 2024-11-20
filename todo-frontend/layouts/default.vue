<template>
  <v-app>
    <v-app-bar scroll-behavior="elevate" color="#212121">
      <div class="flex align-center justify-between px-6 w-100">
        <h5 class="text-xl font-bold">
          TODO App
        </h5>
        <v-btn
          v-if="userStore.user"
          prepend-icon="mdi-logout"
          variant="outlined"
          color="#fff"
          style="text-transform: none;"
          @click="logoutApp"
        >
          Logout
        </v-btn>
      </div>
    </v-app-bar>
    <main class="mt-[65px]">
      <NuxtPage />
    </main>
  </v-app>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const router = useRouter()

const logoutApp = () => {
  userStore.logout()
    .then(() => {
      router.push('/')
    })
}
</script>

<style src="@/assets/css/custom-vuetify.css" />
