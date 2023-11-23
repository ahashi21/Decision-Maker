const express = require('express');
const router = express.Router();

router.get('/polls/new', (req, res) => {
  res.render('new_poll');
});

module.exports = router;