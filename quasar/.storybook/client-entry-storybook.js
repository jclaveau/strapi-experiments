/**
 * This file is a copy of .quasar/client-entry.js Vue app object injected.
 * As client-entry.js is generated from template, you may have to patch it
 * if you change quasar.conf.js
 */

import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'

// We load Quasar stylesheet file
import 'quasar/dist/quasar.sass'
import 'src/css/app.scss'

console.info('[Quasar] Running SPA for Storybook.')

const publicPath = ``


export async function start ({ app, router, store, storeKey }, bootFiles) {

  let hasRedirected = false
  const getRedirectUrl = url => {
    try { return router.resolve(url).href }
    catch (err) {}

    return Object(url) === url
      ? null
      : url
  }

  const redirect = url => {
    hasRedirected = true

    if (typeof url === 'string' && /^https?:\/\//.test(url)) {
      window.location.href = url
      return
    }

    const href = getRedirectUrl(url)

    // continue if we didn't fail to resolve the url
    if (href !== null) {
      window.location.href = href
      // window.location.reload()
    }
  }

  const urlPath = window.location.href.replace(window.location.origin, '')

  for (let i = 0; hasRedirected === false && i < bootFiles.length; i++) {
    try {
      await bootFiles[i]({
        app,
        router,
        store,
        ssrContext: null,
        redirect,
        urlPath,
        publicPath
      })
    }
    catch (err) {
      if (err && err.url) {
        redirect(err.url)
        return
      }

      console.error('[Quasar] boot error:', err)
      return
    }
  }

  if (hasRedirected === true) {
    return
  }

  // App mounting is handled by Storybook
  // app.mount('#q-app')
}
