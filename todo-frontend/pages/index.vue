<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="5">
        <Registration />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import Registration from '~/components/Pages/Auth/Registration.vue'

// eslint-disable-next-line no-undef
definePageMeta({
  layout: 'auth'
})
</script>
