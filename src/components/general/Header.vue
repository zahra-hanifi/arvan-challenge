<script setup>
import { mdiMenu } from '@mdi/js'
import CIcon from './CIcon.vue'
import MobileMenu from './MobileMenu.vue'
import { ref } from 'vue'

const isMobileMenuVisible = ref(false)

function toggleMenuVisibility() {
  isMobileMenuVisible.value = !isMobileMenuVisible.value
}
</script>

<template>
  <header
    class="bg-grey-800 py-2.5 px-5 flex items-center justify-between text-white fixed to-0 left-0 right-0 max-h-[53px] sm:max-h-[unset]"
  >
    <div class="flex items-center gap-x-5">
      <span class="text-[22px]">Arvan Challenge</span>

      <!--todo Replace 'username' with the logged in username -->
      <span class="text-base hidden sm:block">Welcome username </span>
    </div>

    <button
      class="px-[18px] py-2.5 rounded border border-[#5bc0de] text-[#5bc0de] text-base hidden sm:block"
    >
      Logout
    </button>

    <button class="sm:hidden" @click="toggleMenuVisibility">
      <CIcon :icon="mdiMenu" :size="32" />
    </button>
  </header>

  <transition name="fade">
    <MobileMenu v-model="isMobileMenuVisible" />
  </transition>
</template>
