const parse = require('pg-connection-string').parse;

let config;
if (process.env.DATABASE_URL == null) {
  config = {
    host: '0.0.0.0',
    port: 1337,
    user: 'lalala',
    password: 'lalala',
  }
}
else {
  config = parse(process.env.DATABASE_URL);
}

module.exports = ({ env }) => ({
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
});
