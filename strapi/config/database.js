const path = require('path');

module.exports = ({ env }) => {
  const client = env("DATABASE_CLIENT", "sqlite")

  let dbConfig
  if (client == 'sqlite') {
    dbConfig = {
      connection: {
        client: 'sqlite',
        connection: {
          filename: path.join(__dirname, '..', env('DATABASE_FILENAME', 'tests/data.db')),
        },
        useNullAsDefault: true,
      },
    }
  }
  else if (client == 'postgres' || client == 'mysql') {
    const defaultPort = client == 'postgres' ? 5432 : 3306

    dbConfig = {
      connection: {
        client: env("DATABASE_CLIENT", client),
        connection: {
          host: env("DATABASE_HOST", "127.0.0.1"),
          port: env.int("DATABASE_PORT", defaultPort),
          database: env("DATABASE_NAME", "strapi"),
          user: env("DATABASE_USERNAME", "strapi"),
          password: env("DATABASE_PASSWORD", "strapi"),
        },
        debug: false,
      },
    }
  }
  else {
    console.log('config/database.js', process.env)
    throw new Error(`Unhandled db client type in dev mode: ${client}`)
  }

  process.env != 'production' && console.log('config/database.js', dbConfig)
  return dbConfig
};
