const express = require('express');
const router = express.Router();

router.get('/polls/new', (req, res) => {
  res.render('newPollForm');
});

module.exports = router;