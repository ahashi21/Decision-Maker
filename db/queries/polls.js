const db = require('../connection');

const createPoll = (title, creatorId) => {
  const query = {
    text: 'INSERT INTO polls (title, creator_id) VALUES ($1, $2) RETURNING *;',
    values: [title, creatorId],
  };
  return db.query(query)
    .then(data => data.rows[0]);
};

const getPolls = (creatorId) => {
  // This example assumes you want to fetch polls based on the creator's ID.
  // You can modify this function to add more filters or fetch all polls.
  return db.query('SELECT * FROM polls WHERE creator_id = $1;', [creatorId])
    .then(data => data.rows);
};

const updatePoll = (pollId, newTitle) => {
  const query = {
    text: 'UPDATE polls SET title = $2 WHERE id = $1 RETURNING *;',
    values: [pollId, newTitle],
  };
  return db.query(query)
    .then(data => data.rows[0]);
};

const deletePoll = (pollId) => {
  return db.query('DELETE FROM polls WHERE id = $1;', [pollId]);
};

module.exports = {
  createPoll,
  getPolls,
  updatePoll,
  deletePoll,
};