const ckeditorConfig = require('./plugins/ckeditor')

module.exports = () => {
  return {
    ...ckeditorConfig,
  }
}
