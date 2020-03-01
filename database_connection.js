const environment = "development"
const config = require("./knexfile")[process.env.NODE_ENV || environment]
const knex = require("knex")(config)

module.exports = knex