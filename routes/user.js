const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('got to GET /user');
})

module.exports = router;
