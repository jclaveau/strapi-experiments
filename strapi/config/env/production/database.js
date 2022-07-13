
let config;
if (process.env.DATABASE_URL == null) {
  // Strapi must be built to avoid https://github.com/strapi/strapi/issues/12010
  // but running `yarn build` after `docker build` passes Heroku's threshold.
  // Then, running `strapi build` during `docker build` accesses the config
  // with DATABASE_URL missing which leads to failing build.
  config = {
    host: process.env.DATABASE_HOST || "127.0.0.1",
    port: process.env.DATABASE_PORT || 5432,
    database: process.env.DATABASE_NAME || "strapi",
    user: process.env.DATABASE_USERNAME || "strapi",
    password: process.env.DATABASE_PASSWORD || "strapi",
  }
}
else {
  // Heroku
  const parse = require('pg-connection-string').parse;
  config = parse(process.env.DATABASE_URL);
}

module.exports = ({ env }) => {
  // console.log('env/production/database.js', process.env)
  const dbConfig = {
    connection: {
      client: 'postgres',
      connection: {
        host: config.host,
        port: config.port,
        database: config.database,
        user: config.user,
        password: config.password,
        ssl: {
          rejectUnauthorized: false
        },
      },
      debug: false,
    },
  }

  console.log('env/production/database.js', dbConfig)
  return dbConfig
};
