<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const items = ref([
  {
    id: 'Articles',
    title: 'All Articles',
    route: '/articles',
  },
  {
    id: 'CreatArticle',
    title: 'New Article',
    route: '/articles/create',
  },
])
const route = useRoute()
</script>

<template>
  <div
    class="w-[200px] h-full bg-blue min-h-[calc(100vh-64px)] flex flex-col gap-y-4 py-4 fixed"
  >
    <span class="text-white text-[22px] px-4">Post</span>

    <div class="flex flex-col">
      <template v-for="item in items" :key="item.id">
        <router-link
          :to="item.route"
          class="px-8 py-2.5 text-lg text-white"
          :class="{ 'bg-[#ffffff33]': route.name === item.id }"
        >
          {{ item.title }}
        </router-link>
      </template>
    </div>
  </div>
</template>
