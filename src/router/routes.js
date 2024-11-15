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
        meta: { layout: 'empty' },
      },
    ],
  },
]

export default routes
