// quasar serve -h
// https://github.com/chimurai/http-proxy-middleware
module.exports = [
  {
    path: '/bo',
    rule: {
      target: 'http://localhost:1337',
      changeOrigin: true,
      pathRewrite: {'^/bo' : ''},
    }
  },
]
