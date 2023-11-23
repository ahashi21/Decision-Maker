exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('votes').del()
    .then(function () {
      // Inserts seed entries
      return knex('votes').insert([
        {user_id: 1, poll_id: 1, choice_id: 1, rank: 1},
        {user_id: 2, poll_id: 1, choice_id: 2, rank: 2},
        {user_id: 3, poll_id: 2, choice_id: 3, rank: 1},
        {user_id: 1, poll_id: 3, choice_id: 5, rank: 2}
      ]);
    });
};