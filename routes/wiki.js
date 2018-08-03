const router = require('express').Router();
const pages = require('../views');

router.get('/', (req, res) => {
  res.send(pages.main());
})

router.get('/add', (req, res) => {
  res.send(pages.addPage());
})

router.post('/', (req, res) => {
  res.send('got to POST /wiki');
})


module.exports = router;
