module.exports = ({ env }) => {
  const serverConfig = {
    port: 1337, // We do not change the port as we are behind a proxy
    proxy: true,
  }

  // console.log('env/production/server.js serverConfig', serverConfig)

  return serverConfig
};