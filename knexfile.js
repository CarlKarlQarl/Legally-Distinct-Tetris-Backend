// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: "postgres:///tetris_backend_db1"
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname + "/migrations"
    }
  }
};
