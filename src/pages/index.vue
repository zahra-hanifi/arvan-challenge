<script setup>
import Sidebar from '../components/layout/Sidebar.vue'
</script>

<template>
  <div class="flex">
    <Sidebar class="hidden md:flex" />

    <div class="md:ml-[200px] w-full overflow-x-auto pr-4">
      <router-view />
    </div>
  </div>
</template>
