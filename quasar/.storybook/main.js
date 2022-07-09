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


    // Plugins
    const quasarVitePluginNames = quasarConfig[0].object.plugins.map(plugin => {
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
    config.plugins = [...config.plugins, ...quasarConfig[0].object.plugins]

    const updatedConfig =  mergeConfig(config, {
      resolve: {
        alias: {
          ...quasarConfig[0].object.resolve.alias
        },
      },
    });

    return updatedConfig
  },
}