const db = require('../connection');

const createChoice = (pollId, description) => {
  const query = {
    text: 'INSERT INTO choices (poll_id, description) VALUES ($1, $2) RETURNING *;',
    values: [pollId, description],
  };
  return db.query(query)
    .then(data => data.rows[0]);
};

const getChoicesForPoll = (pollId) => {
  return db.query('SELECT * FROM choices WHERE poll_id = $1;', [pollId])
    .then(data => data.rows);
};

const updateChoice = (choiceId, description) => {
  const query = {
    text: 'UPDATE choices SET description = $2 WHERE id = $1 RETURNING *;',
    values: [choiceId, description],
  };
  return db.query(query)
    .then(data => data.rows[0]);
};

const deleteChoice = (choiceId) => {
  return db.query('DELETE FROM choices WHERE id = $1;', [choiceId]);
};

module.exports = {
  createChoice,
  getChoicesForPoll,
  updateChoice,
  deleteChoice,
};