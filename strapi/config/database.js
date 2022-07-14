const path = require('path');
console.log('config/database.js env', process.env)

module.exports = ({ env }) => {
  const client = env("DATABASE_CLIENT", "sqlite")

  let dbConfig
  if (client == 'sqlite') {
    dbConfig = {
      connection: {
        client: 'sqlite',
        connection: {
          filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
        },
        useNullAsDefault: true,
      },
    }
  }
  else if (client == 'postgres' || client == 'mysql') {
    const defaultPort = client == 'postgres' ? 5432 : 3306
    let dbConnectionConfig

    if (process.env.DATABASE_URL == null) {
      // Strapi must be built to avoid https://github.com/strapi/strapi/issues/12010
      // but running `yarn build` after `docker build` passes Heroku's threshold.
      // Then, running `strapi build` during `docker build` accesses the config
      // with DATABASE_URL missing which leads to failing build.
      dbConnectionConfig = {
        host: env("DATABASE_HOST", "127.0.0.1"),
        port: env.int("DATABASE_PORT", defaultPort),
        database: env("DATABASE_NAME", "strapi"),
        user: env("DATABASE_USERNAME", "strapi"),
        password: env("DATABASE_PASSWORD", "strapi"),
      }
    }
    else {
      // Heroku
      const parse = require('pg-connection-string').parse;
      dbConnectionConfig = parse(process.env.DATABASE_URL);
      dbConnectionConfig.ssl = {
        rejectUnauthorized: false
      }
    }

    dbConfig = {
      connection: {
        client: env("DATABASE_CLIENT", client),
        connection: dbConnectionConfig,
        debug: false,
      },
    }
  }
  else {
    console.log('config/database.js', process.env)
    throw new Error(`Unhandled db client type in dev mode: ${client}`)
  }

  // process.env.NODE_ENV != 'production' &&
  console.log('config/database.js', dbConfig)
  return dbConfig
};
