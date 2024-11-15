<script setup>
import { mdiMenu } from '@mdi/js'
import CIcon from './CIcon.vue'
import MobileMenu from './MobileMenu.vue'
import CBtn from './CBtn.vue'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth.js'

const isMobileMenuVisible = ref(false)
const router = useRouter()
const user = computed(() => {
  return useAuthStore().user
})

function toggleMenuVisibility() {
  isMobileMenuVisible.value = !isMobileMenuVisible.value
}

function logout() {
  localStorage.removeItem('token')
  router.push('/auth/login')
}
</script>

<template>
  <header
    class="bg-grey-800 py-2.5 px-5 flex items-center justify-between text-white fixed to-0 left-0 right-0 max-h-[53px] sm:max-h-[unset]"
  >
    <div class="flex items-center gap-x-5">
      <span class="text-[22px]">Arvan Challenge</span>

      <span class="text-base hidden sm:block">
        Welcome {{ user.username }}
      </span>
    </div>

    <CBtn color="primary-outlined" class="hidden sm:block" @click="logout">
      Logout
    </CBtn>

    <button class="sm:hidden" @click="toggleMenuVisibility">
      <CIcon :icon="mdiMenu" :size="32" />
    </button>
  </header>

  <transition name="fade">
    <MobileMenu v-model="isMobileMenuVisible" />
  </transition>
</template>
