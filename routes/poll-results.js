const express = require('express');
const router = express.Router();
const PollHelper = require('../helpers/poll-helper');
const VoteHelper = require('../helpers/vote-helper');

router.get('/polls/:link', async (req, res) => {
  const { link } = req.params;

  try {
    const linkType = link.length === 12 ? 'admin' : 'user';

    const pollId = await VoteHelper.getPollId(link, linkType);

    if (!pollId) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    const results = await PollHelper.getPollResults(pollId);

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error!' });
  }
});

module.exports = router;