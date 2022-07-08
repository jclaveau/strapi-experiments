const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Home.vue')
      },
      {
        path: 'solutions',
        component: () => import('pages/NotImplemented.vue')
      },
      {
        path: 'news',
        component: () => import('pages/NotImplemented.vue')
      },
      {
        path: 'contact',
        component: () => import('pages/NotImplemented.vue')
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
