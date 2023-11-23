exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('choices').del()
    .then(function () {
      // Inserts seed entries
      return knex('choices').insert([
        {poll_id: 1, option: 'Option 1 for Poll 1', description: 'Description 1'},
        {poll_id: 1, option: 'Option 2 for Poll 1', description: 'Description 2'},
        {poll_id: 2, option: 'Option 1 for Poll 2', description: 'Description 1'},
        {poll_id: 2, option: 'Option 2 for Poll 2', description: 'Description 2'},
        {poll_id: 3, option: 'Option 1 for Poll 3', description: 'Description 1'},
        {poll_id: 3, option: 'Option 2 for Poll 3', description: 'Description 2'}
      ]);
    });
};