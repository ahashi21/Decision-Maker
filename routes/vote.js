const express = require('express');
const router = express.Router();
const PollHelper = require('../helpers/poll-helpers');

router.get('/polls/:userLink', async (req, res) => {
  const { userLink } = req.params;

  try {
    const poll = await PollHelper.getPollByUserLink(userLink);

    if (!poll) {
      return res.status(404).json({ error: 'Poll not found!' });
    }

    res.render('vote', { poll });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error!' });
  }
});

module.exports = router;