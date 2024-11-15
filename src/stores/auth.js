import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('authStore', () => {
  const token = ref('')
  const user = ref({})

  function setToken(payload) {
    token.value = payload.token
    user.value = payload
  }

  return {
    token,
    user,
    setToken,
  }
})
