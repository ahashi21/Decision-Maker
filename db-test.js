const knex = require('knex');
const knexConfig = require('./knexfile'); // Use a relative path to knexfile.js

const environment = process.env.NODE_ENV || 'development';
const db = knex(knexConfig[environment]);

db.raw('SELECT 1')
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });