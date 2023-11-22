const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const PollHelper = require('../helpers/poll-helpers');

router.get('/polls', async (req, res) => {
  try {
    const polls = await PollHelper.getAllPolls();
    res.json(polls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error!' });
  }
});

module.exports = router;