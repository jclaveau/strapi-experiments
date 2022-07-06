module.exports = ({ env }) => {
  const serverConfig = {
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    // Url MUST be absolute to work with a proxy (including port number).
    url: `${env('STRAPI_WEBSITE_URL', '')}${env('STRAPI_URL_PREFIX', '')}`,
    proxy: true,
    app: {
      keys: env.array('APP_KEYS'),
    },
  }

  process.env != 'production' && console.log('config/server.js serverConfig', serverConfig)

  return serverConfig
};
