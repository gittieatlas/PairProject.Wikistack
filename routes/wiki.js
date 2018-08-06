const router = require('express').Router();
const { addPage, main, wikiPage } = require('../views');
const { Page, User } = require('../models');

// GET /wiki
router.get('/', async (req, res, next) => {
  try {
    const pages = await Page.findAll();
    res.send(main(pages));
  } catch (error) {
    next(error);
  }
});

// POST /wiki
router.post('/', async (req, res, next) => {
  console.log(req.body);

  const { pageTitle, pageContent, authorName, authorEmail } = req.body;

  const [user, wasCreated] = await User.findOrCreate({
    where: { name: authorName, email: authorEmail }
  });

  let page = new Page({
    title: pageTitle,
    content: pageContent
  });
  page.setAuthor(user.id);

  try {
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

// GET /wiki/add
router.get('/add', (req, res) => {
  res.send(addPage());
});

// GET /wiki/:slug
router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: { slug: req.params.slug }
    });
    const author = await page.getAuthor();
    res.send(wikiPage(page, author));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
