const express = require('express');
const router = express.Router();
const PollHelper = require('../helpers/poll-helper');
const VoteHelper = require('../helpers/vote-helper');

router.get('/vote/:link', async (req, res) => {
  const { userLink } = req.params;

  try {
    const choices = await PollHelper.getPoll(userLink);

    if (!choices) {
      return res.status(404).json({ error: 'Poll not found!' });
    }

    res.render('voting_poll', { userLink,  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error!' });
  }
});

module.exports = router;