const routes = [
  {
    path: '/',
    redirect: '/articles',
    component: import('../pages/index.vue'),
    children: [
      {
        name: 'Articles',
        path: 'articles',
        component: () => import('../pages/articles/index.vue'),
        meta: { title: 'Articles' },
      },
      {
        name: 'CreatArticle',
        path: 'articles/create',
        component: () => import('../pages/articles/create.vue'),
        meta: { title: 'Articles' },
      },
    ],
  },
  {
    path: '/auth',
    children: [
      {
        name: 'Register',
        path: 'register',
        component: () => import('../pages/auth/register.vue'),
        meta: { layout: 'empty', title: 'Register' },
      },
      {
        name: 'Login',
        path: 'login',
        component: () => import('../pages/auth/login.vue'),
        meta: { layout: 'empty', title: 'Login' },
      },
    ],
  },
]

export default routes
