const express = require('express');
const router = express.Router();
const PollHelper = require('../helpers/poll-helper');

router.post('/polls', async (req, res) => {
  try {
    const { email, choices } = req.body;
    const { adminLink, userLink } = await PollHelper.createPoll(email, choices);
    res.redirect('/'); // To be replaced with mailgun integration and redirect to "success" page
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error!' });
  }
});

module.exports = router;