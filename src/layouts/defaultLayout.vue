<script setup>
import Header from '../components/general/Header.vue'
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

    <main>
      <slot />
    </main>
  </div>
</template>
