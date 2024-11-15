import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Arvan Challenge` || 'Arvan Challenge'

  if (to.path.includes('auth')) {
    if (!localStorage.getItem('token')) {
      next()
    } else {
      next({ name: 'IndexPage' })
    }
  } else {
    if (!localStorage.getItem('token')) {
      next({ name: 'login' })
    } else {
      next()
    }
  }
})

export default router
