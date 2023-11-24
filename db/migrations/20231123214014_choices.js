exports.up = function(knex) {
  return knex.schema.createTable('choices', function(table) {
    table.increments('id').primary();
    table.integer('poll_id').unsigned().notNullable();
    table.string('title', 255).notNullable();
    table.string('description', 255);
    table.foreign('poll_id').references('id').inTable('polls').onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('choices');
};