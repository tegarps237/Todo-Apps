<template>
  <div
    class="bg-[#ffffff] py-6 px-12 rounded-lg"
  >
    <p class="text-center mt-4 mb-8 text-3xl font-bold">
      TODO App
    </p>
    <v-form @submit.prevent="userAuth">
      <v-row>
        <v-col cols="12">
          <v-alert
            v-if="userStore.error"
            closable
            :text="userStore.error"
            type="error"
            variant="tonal"
            density="comfortable"
          />
        </v-col>
        <v-col v-if="type === 'Registration'" cols="12">
          <v-text-field
            v-model="fullName"
            label="Full Name"
            variant="outlined"
            density="compact"
            type="text"
            hide-details
            small
            clearable
            required
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="email"
            label="Email"
            variant="outlined"
            density="compact"
            type="email"
            hide-details
            small
            clearable
            required
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="password"
            label="Password"
            variant="outlined"
            density="compact"
            type="password"
            hide-details
            small
            clearable
            required
          />
        </v-col>
        <v-col cols="12">
          <v-btn
            type="submit"
            elevation="0"
            color="#121212"
            :loading="isButtonLoading"
            :disabled="isButtonLoading"
            block
          >
            {{ type === 'Registration' ? 'Register' : 'Login' }}
          </v-btn>
          <p v-if="type === 'Registration'" class="text-center mt-2">
            Already have an account? login <span class="cursor-pointer text-blue-600 hover:underline" @click="type = 'Login'">here</span>
          </p>
          <p v-if="type === 'Login'" class="text-center mt-2">
            You don't have an account? register <span class="cursor-pointer text-blue-600 hover:underline" @click="type = 'Registration'">here</span>
          </p>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script setup>
import { computed, ref, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '~/stores/user'

defineComponent({
  name: 'RegistrationComponents'
})

const router = useRouter()

const userStore = useUserStore()
const fullName = ref('')
const email = ref('')
const password = ref('')
const type = ref('Registration')

const isButtonLoading = computed(() => userStore.isButtonAuthLoading)

const userAuth = async () => {
  const apiToUse = type.value === 'Registration' ? userStore.register(email.value, password.value, fullName.value) : userStore.login(email.value, password.value)
  await apiToUse
    .then(() => {
      router.push('/todo')
    })
}
</script>
