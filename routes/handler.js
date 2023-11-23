const express = require('express');
const router = express.Router();
const { getRoute } = require('../helpers/nav-helper');

router.get('/:link', async (req, res) => {
  const route = await getRoute(req);

  res.redirect(route);
});

module.exports = router;