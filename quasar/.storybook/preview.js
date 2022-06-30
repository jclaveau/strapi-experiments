import './storybook.scss'
import { app as StorybookApp } from '@storybook/vue3'
import { useArgs } from '@storybook/client-api'

import createQuasarApp from '../.quasar/app.js'
import quasarUserOptions from '../.quasar/quasar-user-options' // lang / iconset
import { start } from './client-entry-storybook.js'


createQuasarApp((quasarRootComponent) => {

  if (quasarRootComponent.name == 'App') {
    // Default behaviour: no Wrapper added by Quasar(e.g. while vueDevtools enabled))
    return StorybookApp
  }
  else if (quasarRootComponent.name == 'AppWrapper') {
    const propsDiff = Object.keys(quasarRootComponent).filter(value => ! [
      'name',
      'setup',
    ].includes(value));

    if (propsDiff.length) {
      console.warn(
        `SB: Some hooks/props are not handled by Storybook's preview.js: ${propsDiff}`
      )
    }

    let defaultStorybookSetup = StorybookApp._component.setup
    StorybookApp._component.setup = function(props) {
      // Triggers the hooks added by Quasar like e.g. devtools connection
      quasarRootComponent.setup(props)

      return defaultStorybookSetup(props)
    }
  }
  else {
    console.warn(
      `SB: Unhandled quasar root component in preview.js : ${quasarRootComponent.name}`
    )
  }

  return StorybookApp
}, quasarUserOptions)
  .then(({
    app,
    store, // storeKey,
    router
  }) => {

    // router must be used before boot files to avoid "[Vue warn]: Failed to resolve component: router-view" in SB
    // TODO ensure this works always. Does vueRouterMode: 'history' in config impact it?
    app.use(router)

    return Promise.all([
      import('boot/i18n'),
      import('boot/axios'),
    ])
    .then(bootFiles => {

      const boot = bootFiles
        .map(entry => {
          return entry.default
        })
        .filter(entry => typeof entry === 'function')

      start({app}, boot)
    })
  })


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  // (storyFn, context) => withConsole()(storyFn)(context),  // => Warning! withConsole doesn't support @storybook/vue3. Use setConsoleOptions instead
  // Makes updateArgs available in all stories
  // https://craigbaldwin.com/blog/updating-args-storybook-vue/
  (story, context) => {
    const [_, updateArgs] = useArgs()
    return story({ ...context, updateArgs })
  },
  () => ({ template: '<story />' }),
]
