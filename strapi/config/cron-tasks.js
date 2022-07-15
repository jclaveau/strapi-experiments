const axios = require('axios');

module.exports = {
  // https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/optional/cronjobs.html#creating-a-cron-job
  '* */10 * * * *': ({ strapi }) => {
    //   console.log(" ~ file: cron.js ~ executing action ~Every 13min");
    const randomDelay = Math.random() * 1 * 0;
    console.log(`Calling ${process.env.STRAPI_WEBSITE_URL} in ${randomDelay}s from common conf`);

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
  // '*/10 * * * * *': () => {
  //   console.log(" ~ file: cron.js ~ executing action ~Every 10sec");
  // },
  // '* */15 * * * *': ({ strapi }) => {
  //   console.log(" ~ file: cron.js ~ executing action ~Every 5min");
  //   // axios
  //   //   .get('https://example.com/todos')
  // },
  // '* * */5 * * *': () => {
  //   console.log(" ~ file: cron.js ~ executing action ~Every 5hour");
  // },
};