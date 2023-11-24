exports.up = function(knex) {
  return knex.schema.createTable('votes', function(table) {
    table.increments('id').primary();
    table.integer('poll_id').unsigned().notNullable();
    table.integer('choice_id').unsigned().notNullable();
    table.integer('rank').notNullable();
    table.foreign('poll_id').references('id').inTable('polls').onDelete('CASCADE');
    table.foreign('choice_id').references('id').inTable('choices').onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('votes');
};