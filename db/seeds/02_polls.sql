exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('polls').del()
    .then(function () {
      // Inserts seed entries
      return knex('polls').insert([
        {creator_id: 1, admin_link: 'admin1234567890', user_link: 'user123456789'},
        {creator_id: 2, admin_link: 'admin2345678901', user_link: 'user234567890'},
        {creator_id: 3, admin_link: 'admin3456789012', user_link: 'user345678901'}
      ]);
    });
};