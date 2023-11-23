const db = require('../connection');

const createUser = (email) => {
  // Assuming 'email' is unique for each user
  const query = {
    text: 'INSERT INTO users (email) VALUES ($1) RETURNING *;',
    values: [email],
  };
  return db.query(query)
    .then(data => data.rows[0]);
};

const getUserById = (userId) => {
  return db.query('SELECT * FROM users WHERE id = $1;', [userId])
    .then(data => data.rows[0]);
};

const updateUser = (userId, newEmail) => {
  // This example only updates the email, but you can extend it to update other fields
  const query = {
    text: 'UPDATE users SET email = $2 WHERE id = $1 RETURNING *;',
    values: [userId, newEmail],
  };
  return db.query(query)
    .then(data => data.rows[0]);
};

const deleteUser = (userId) => {
  return db.query('DELETE FROM users WHERE id = $1;', [userId]);
};

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};