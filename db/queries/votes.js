const db = require('../connection');

const castVote = (userId, choiceId) => {
  const query = {
    text: 'INSERT INTO votes (user_id, choice_id) VALUES ($1, $2) RETURNING *;',
    values: [userId, choiceId],
  };
  return db.query(query)
    .then(data => data.rows[0]);
};

const countVotes = (pollId) => {
  const query = {
    text: 'SELECT choice_id, COUNT(*) as vote_count FROM votes WHERE poll_id = $1 GROUP BY choice_id;',
    values: [pollId],
  };
  return db.query(query)
    .then(data => data.rows);
};

const fetchUserVotes = (userId) => {
  return db.query('SELECT * FROM votes WHERE user_id = $1;', [userId])
    .then(data => data.rows);
};

const updateVote = (voteId, newChoiceId) => {
  const query = {
    text: 'UPDATE votes SET choice_id = $2 WHERE id = $1 RETURNING *;',
    values: [voteId, newChoiceId],
  };
  return db.query(query)
    .then(data => data.rows[0]);
};

const deleteVote = (voteId) => {
  return db.query('DELETE FROM votes WHERE id = $1;', [voteId]);
};

module.exports = {
  castVote,
  countVotes,
  fetchUserVotes,
  updateVote,
  deleteVote,
};