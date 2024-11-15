import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
    ? `${to.meta.title} | Arvan Challenge`
    : 'Arvan Challenge'

  if (to.path.includes('auth')) {
    if (!localStorage.getItem('token')) {
      next()
    } else {
      next({ name: 'Articles' })
    }
  } else {
    if (!localStorage.getItem('token')) {
      next({ name: 'Login' })
    } else {
      next()
    }
  }
})

export default router
