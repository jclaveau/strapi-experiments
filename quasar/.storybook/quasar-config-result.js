const QuasarConfFile = require('@quasar/app-vite/lib/quasar-config-file')
const getQuasarCtx = require('@quasar/app-vite/lib/helpers/get-quasar-ctx')
const extensionRunner = require('@quasar/app-vite/lib/app-extension/extensions-runner')

// This code is taken from @quasar/app/bin/quasar-inspect
async function getQuasarConfig () {

  const mode = 'spa'
  const debug = true
  const cmd = 'dev'

  const hostname = 9000
  const port = 9000
  // const port = ctx.mode.spa
  // ? 8000
  // : (ctx.mode.pwa ? 9000 : 9090)

  const ctx = getQuasarCtx({
    mode: mode,
    target: mode === 'cordova' || mode === 'capacitor'
      ? 'android'
      : void 0,
    debug: debug,
    dev: cmd === 'dev',
    prod: cmd === 'build'
  })

  await extensionRunner.registerExtensions(ctx)

  const quasarConfFile = new QuasarConfFile({
    ctx,
    port: port,
    host: hostname
  })

  const quasarConf = await quasarConfFile.read()
  if (quasarConf.error !== void 0) {
    fatal(quasarConf.error, 'FAIL')
  }

  const generateConfig = require(`@quasar/app-vite/lib/modes/${mode}/${mode}-config`)

  const cfgEntries = []
  let threadList = Object.keys(generateConfig)

  for (const name of threadList) {
    cfgEntries.push({
      name,
      object: await generateConfig[ name ](quasarConf)
    })
  }

  return cfgEntries
}

module.exports = getQuasarConfig;
