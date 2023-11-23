exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {email: 'alice@example.com'},
        {email: 'bob@example.com'},
        {email: 'charlie@example.com'}
      ]);
    });
};