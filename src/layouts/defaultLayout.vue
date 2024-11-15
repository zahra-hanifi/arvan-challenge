<script setup>
import Header from '../components/layout/Header.vue'
import { getCurrentInstance, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth.js'

const { proxy } = getCurrentInstance()
const axios = proxy.$axios
const { setToken } = useAuthStore()

function getCurrentUserInfo() {
  axios.get('/user').then((response) => {
    const user = response.data.user
    setToken(user)
  })
}

onMounted(() => {
  getCurrentUserInfo()
})
</script>

<template>
  <div>
    <Header />

    <main class="pt-[53px] sm:pt-[64px] overflow-x-hidden">
      <slot />
    </main>
  </div>
</template>
