const express = require('express');
const router = express.Router();
const PollHelper = require('../helpers/poll-helpers');

router.get('/polls/results/:adminLink', async (req, res) => {
  const { adminLink } = req.params;

  try {
    const { poll, results } = await PollHelper.getPollResults(adminLink);

    res.render('pollResults', { poll, results });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error!' });
  }
});

module.exports = router;