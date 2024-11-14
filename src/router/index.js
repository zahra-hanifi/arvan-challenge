import { createRouter, createWebHistory } from 'vue-router'

const index = [
  {
    path: '/',
    name: 'IndexPage',
    component: () => import('../pages/index.vue'),
  },
  {
    path: '/auth/register',
    name: 'RegisterPage',
    component: () => import('../pages/auth/register.vue'),
    meta: {
      layout: 'empty',
      title: 'Register'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: index,
})

export default router
