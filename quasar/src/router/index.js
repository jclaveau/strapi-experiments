import { route } from 'quasar/wrappers';
import {
  createRouter, createMemoryHistory, createWebHistory, createWebHashHistory,
} from 'vue-router';
import routes from './routes';
import axios from 'axios';
/* eslint no-unused-vars: 0 */
import { pascalCase } from "change-case";

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

  await axios.get('/bo/api/navigation/render/main-navigation?type=RFR')
    .then(function(response) {
      // TODO retry https://stackoverflow.com/a/38225011/2714285

      // console.log('response', response.data)

      const pages = Object.values(response.data.pages)
      for (let i=0; i < pages.length; i+=1) {
        const page = pages[i]
        // console.log('page', page)
        /* eslint no-underscore-dangle: 0 */
        // const component = pascalCase(page.related.contentType.replace(/^\w+::\w+\./, ''))
        // const component = camelCase(page.related.contentType)
        // console.log('component', component)
        // https://router.vuejs.org/guide/advanced/dynamic-routing.html#adding-nested-routes
        const newRoute = {
          name: page.id,
          path: page.path,
          component: () => import(`../pages/Page.vue`),
          // component: () => import('pages/NotImplemented.vue')
          // props: true,
          meta: {
            page,
          },
        }

        // console.log('Pages newRoute', newRoute)
        Router.addRoute(page.parent ?? 'root', newRoute)
      }

    })
    .catch(function (error) {
      console.error('Loading dynamic routes failed', error);
    })

  await axios.get('/bo/api/posts')
    .then(function(response) {
      // TODO retry https://stackoverflow.com/a/38225011/2714285

      for (let i=0; i<response.data.data.length; i+=1) {
        const post = response.data.data[i]
        // https://router.vuejs.org/guide/advanced/dynamic-routing.html#adding-nested-routes

        // console.log('post', post)
        const newRoute = {
          name: post.attributes.slug,
          path: `/posts/${post.attributes.slug}`,
          component: () => import('pages/Post.vue'),
          // component: () => import('pages/NotImplemented.vue')
          meta: {
            post,
          },
        }

        // console.log('Posts newRoute', newRoute)
        Router.addRoute('root', newRoute)
      }

      // console.log('routes', Router.getRoutes())
    })
    .catch(function (error) {
      console.error('Loading dynamic routes failed', error);
    })

  // console.log('routes', Router.getRoutes())
  return Router;
});
