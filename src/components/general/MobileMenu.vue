<script setup>
const model = defineModel()
</script>

<template>
  <div
    class="bg-[#373a3c] flex flex-col items-center gap-y-4 p-4 transform ease-in-out transition-all duration-300 text-white fixed top-[53px] right-0 w-full -z-10"
    :class="
      model ? 'translate-y-0 opacity-100 z-10' : '-translate-y-full opacity-0'
    "
  >
    <!--todo Replace 'username' with the logged in username -->
    <span class="text-lg font-medium">Welcome username</span>

    <button class="text-[#5bc0de] text-base">Logout</button>
  </div>
</template>
