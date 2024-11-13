<script setup>
import Header from '../components/general/Header.vue'
</script>

<template>
  <div>
    <Header />

    <main>
      <slot />
    </main>
  </div>
</template>
