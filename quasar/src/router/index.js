import { route } from 'quasar/wrappers';
import {
  createRouter, createMemoryHistory, createWebHistory, createWebHashHistory,
} from 'vue-router';
import routes from './routes';
import axios from 'axios';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route( async (/* { store, ssrContext } */) => {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  await axios.get('/bo/api/pages')
    .then(function(response) {
      // TODO retry https://stackoverflow.com/a/38225011/2714285

      for (let i=0; i<response.data.data.length; i+=1) {
        const page = response.data.data[i]
        // https://router.vuejs.org/guide/advanced/dynamic-routing.html#adding-nested-routes
        Router.addRoute('root', {
          path: `/${page.attributes.slug}`,
          component: () => import('pages/NotImplemented.vue')
        })
      }

      // console.log('routes', Router.getRoutes())
    })

  return Router;
});
