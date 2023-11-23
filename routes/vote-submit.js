const express = require('express');
const router = express.Router();
const VoteHelper = require('../helpers/vote-helper');

router.post('/submit/:link', async (req, res) => {
  const { link } = req.params;

  try {
    const pollId = await VoteHelper.getPollId(link, 'user');

    if (!pollId) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    const { voterName, choices } = req.body;

    await VoteHelper.submitVote(pollId, voterName, choices);

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;