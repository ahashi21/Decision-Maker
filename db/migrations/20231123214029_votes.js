exports.up = function(knex) {
  return knex.schema.createTable('votes', function(table) {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.integer('poll_id').unsigned().notNullable();
    table.integer('choice_id').unsigned().notNullable();
    table.integer('rank').notNullable();
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.foreign('poll_id').references('id').inTable('polls').onDelete('CASCADE');
    table.foreign('choice_id').references('id').inTable('choices').onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('votes');
};