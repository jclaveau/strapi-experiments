const ckeditorConfig = require('./plugins/ckeditor')

console.log('ckeditorConfig', ckeditorConfig)

module.exports = () => {
  return {
    ...ckeditorConfig,
  }
}
