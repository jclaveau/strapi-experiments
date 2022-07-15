const axios = require('axios');

module.exports = {
  '* */10 * * * *': ({ strapi }) => {
    //   console.log(" ~ file: cron.js ~ executing action ~Every 13min");
    const randomDelay = Math.random() * 10;
    console.log(`Calling ${process.env.STRAPI_WEBSITE_URL} in ${randomDelay}s from prod conf`);

    setTimeout(() => {
      axios.get(process.env.STRAPI_WEBSITE_URL)
        .then(res => {
          console.log(`statusCode: ${res.status}`);
          // console.log(res);
        })
        .catch(error => {
          console.error(error);
        });
    }, randomDelay * 1000)
  },
};