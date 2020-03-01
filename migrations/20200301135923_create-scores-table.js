
exports.up = function(knex) {
    return knex.schema.createTable("score", table => {
        table.increments()
        table.integer("points")
        table.integer("user_id").references("id").inTable("user")
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("score")
};
