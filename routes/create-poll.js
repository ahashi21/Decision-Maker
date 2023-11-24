const express = require('express');
const router = express.Router();

router.get('/polls/create', (req, res) => {
  res.render('create_poll');
});

module.exports = router;