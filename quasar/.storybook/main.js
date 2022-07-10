// use `mergeConfig` to recursively merge Vite options
const { mergeConfig } = require('vite');
const currentQuasarConfig = require('./quasar-config-result');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
  ],
  "framework": "@storybook/vue3",
  "core": {
    "builder": "@storybook/builder-vite"
  },
  "features": {
    interactionsDebugger: true,
    "storyStoreV7": true
  },
  async viteFinal(config, { configType }) {
    // https://github.com/storybookjs/builder-vite#migration-from-webpack--cra
    const quasarConfig = await currentQuasarConfig()
    const quasarViteConfig = quasarConfig[0].object
    // console.log('quasarConfig', quasarViteConfig.server)
    // console.log('config', config.server)

    // Plugins
    const quasarVitePluginNames = quasarViteConfig.plugins.map(plugin => {
      if (Array.isArray(plugin)) {
        // Nothing to do here for now
      }
      else {
        return plugin.name
      }
    })

    // We must remove Vue plugins from Storybook before injecting Quasar's ones
    config.plugins = config.plugins.filter(pluginConfig => {
      return pluginConfig.name == null || ! quasarVitePluginNames.includes(pluginConfig.name)
    })
    config.plugins = [...config.plugins, ...quasarViteConfig.plugins]

    const updatedConfig =  mergeConfig(config, {
      resolve: {
        alias: {
          ...quasarViteConfig.resolve.alias
        },
      },
      server: {
        ...quasarViteConfig.server
      },
    });

    return updatedConfig
  },
}