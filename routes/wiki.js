const router = require('express').Router();
const { addPage, main, wikiPage, editPage } = require('../views');
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

  const { title, content, name, email } = req.body;

  const [user, wasCreated] = await User.findOrCreate({
    where: { name: name, email: email }
  });

  let page = new Page({
    title: title,
    content: content
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

// GET /wiki/:dynamicvalue
router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: { slug: req.params.slug }
    });
    if (page === null) {
      res.status(404);
    } else {
      const author = await page.getAuthor();
      res.send(wikiPage(page, author));
    }
  } catch (error) {
    next(error);
  }
});

// POST /wiki/:dynamicvalue
router.post('/:slug', async (req, res, next) => {
  try {
    const [updatedRowCount, updatedPages] = await Page.update(req.body, {
      where: {
        slug: req.params.slug
      },
      returning: true
    });

    res.redirect('/wiki/' + updatedPages[0].slug);
  } catch (error) {
    next(error);
  }
});

// GET /wiki/:dynamicvalue/edit
router.get('/:slug/edit', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });

    if (page === null) {
      res.sendStatus(404);
    } else {
      const author = await page.getAuthor();
      res.send(editPage(page, author));
    }
  } catch (error) {
    next(error);
  }
});

// GET /wiki/:dynamicvalue/delete
router.get('/:slug/delete', async (req, res, next) => {
  try {
    await Page.destroy({
      where: {
        slug: req.params.slug
      }
    });

    res.redirect('/wiki');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
