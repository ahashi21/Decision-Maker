exports.up = function(knex) {
  return knex.schema.createTable('polls', function(table) {
    table.increments('id').primary();
    table.string('creator_email').notNullable();
    table.string('admin_link', 255).notNullable();
    table.string('user_link', 255).notNullable();
    table.string('title', 255).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('polls');
};