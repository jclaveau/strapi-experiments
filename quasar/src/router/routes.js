const routes = [
  {
    path: '/',
    name: 'root',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // {
      //   path: '',
      //   name: 'home',
      //   component: () => import('pages/Home.vue'),
      //   meta: {
      //     // TODO this avoids an error while navigating between
      //     // the home button and the tabs. Fix it!
      //     page: {
      //       related: {}
      //     },
      //   },

      // },
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
