// knexfile.js
module.exports = {
    development: {
      client: "postgresql",
      connection: 'postgres://davidp@localhost:5432/caan', //TO DO: set env variable.
      migrations: {
        tableName: "knex_migrations"
      }
    },

    production: {
      client: "postgresql",
      connection: '',
      migrations: {
        tableName: "knex_migrations"
      }
    }
};