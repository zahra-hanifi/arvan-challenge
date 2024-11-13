<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from './layouts/defaultLayout.vue'
import Empty from './layouts/empty.vue'

const route = useRoute()

const layout = computed(() => {
  if (route.meta.layout === 'empty') {
    return Empty
  } else {
    return DefaultLayout
  }
})
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
