import { createRouter, createWebHistory } from 'vue-router'

const index = [
  {
    path: '/',
    name: 'IndexPage',
    component: import('../pages/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: index,
})

export default router
