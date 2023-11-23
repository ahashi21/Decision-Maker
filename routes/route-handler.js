const express = require('express');
const router = express.Router();
const { getRoute } = require('../helpers/route-helper');

router.get('/:link', async (req, res) => {
  const route = await getRoute(req);

  res.redirect(route);
});

module.exports = router;