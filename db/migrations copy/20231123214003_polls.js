exports.up = function(knex) {
  return knex.schema.createTable('polls', function(table) {
    table.increments('id').primary();
    table.integer('creator_id').unsigned().notNullable();
    table.string('admin_link', 255).notNullable();
    table.string('user_link', 255).notNullable();
    table.foreign('creator_id').references('id').inTable('users').onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('polls');
};