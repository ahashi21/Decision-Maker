const express = require('express');
const router = express.Router();
const PollHelper = require('../helpers/poll-helpers');

router.post('/polls', async (req, res) => {
  const { creatorId } = req.body;

  try {
    const pollId = await PollHelper.createPoll(creatorId);
    res.json({ pollId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error!' });
  }
});

module.exports = router;