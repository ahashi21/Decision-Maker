const express = require('express');
const router = express.Router();
const PollHelper = require('../helpers/poll-helpers');

router.post('/polls', async (req, res) => {
  const { email, choices } = req.body;

  try {
    const { adminLink, userLink } = await PollHelper.createPoll(email, choices);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error!' });
  }
});

module.exports = router;