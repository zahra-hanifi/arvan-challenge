<script setup>
import { getCurrentInstance, ref } from 'vue'
import CTable from '../../components/general/CTable.vue'
import CBtn from '../../components/general/CBtn.vue'
import CSkeleton from '../../components/general/CSkeleton.vue'

const { proxy } = getCurrentInstance()
const axios = proxy.$axios
const pagination = ref({
  page: 1,
  itemsPerPage: 10,
  totalItems: 10,
})
const articlesList = ref(null)
const headers = ref([
  {
    text: '#',
    value: 'counter',
  },
  {
    text: 'Title',
    value: 'title',
  },
  {
    text: 'Author',
    value: 'author',
  },
  {
    text: 'Tags',
    value: 'tags',
  },
  {
    text: 'Excerpt',
    value: 'excerpt',
  },
  {
    text: 'Created',
    value: 'created',
  },
  {
    text: '',
    value: 'action',
  },
])
const loading = ref(false)

function getAllArticles() {
  loading.value = true
  axios
    .get('/articles', {
      params: {
        page: pagination.value.page,
      },
    })
    .then((response) => {
      articlesList.value = response.data.articles
      pagination.value.totalItems = response.data.articlesCount
    })
    .finally(() => {
      loading.value = false
    })
}

function paginate(page) {
  pagination.value.page = page
  getAllArticles()
}

function formattedDate(created) {
  const date = new Date(created)
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

getAllArticles()
</script>

<template>
  <div class="py-6 px-8 flex flex-col gap-y-7 w-full">
    <h1 class="text-[40px] font-normal">All Posts</h1>

    <CTable
      :items-count="pagination.totalItems"
      :items="articlesList"
      :page="pagination.page"
      :headers="headers"
      :loading="loading"
      @paginate="paginate"
    >
      <template #loading>
        <div class="flex flex-col gap-y-4">
          <CSkeleton v-for="n in 10" :key="n" class="rounded h-10 w-full" />
        </div>
      </template>

      <template #title="{ item }">
        <div class="w-56 truncate">{{ item.title }}</div>
      </template>

      <template #author="{ item }">
        <span class="whitespace-nowrap">{{ item.author.username }}</span>
      </template>

      <template #tags="{ item }">
        <div class="flex flex-wrap">
          <span v-for="(tag, index) in item.tagList" :key="index">
            {{ tag }}

            <span v-if="index !== item.tagList.length - 1"> , </span>
          </span>
        </div>
      </template>

      <template #excerpt="{ item }">
        <div class="w-56 truncate">{{ item.description }}</div>
      </template>

      <template #created="{ item }">
        {{ formattedDate(item.createdAt) }}
      </template>

      <template #action="{ item }">
        <CBtn wrapper-class="!bg-dark-blue !border-dark-blue">... </CBtn>
      </template>
    </CTable>
  </div>
</template>
