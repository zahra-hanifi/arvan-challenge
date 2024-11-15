const routes = [
  {
    path: '/',
    name: 'IndexPage',
    component: () => import('../pages/index.vue'),
  },
  {
    path: '/auth',
    children: [
      {
        name: 'register',
        path: 'register',
        component: () => import('../pages/auth/register.vue'),
        meta: { layout: 'empty', title: 'Register' },
      },
      {
        name: 'login',
        path: 'login',
        component: () => import('../pages/auth/login.vue'),
        meta: { layout: 'empty', title: 'Login' },
      },
    ],
  },
]

export default routes
