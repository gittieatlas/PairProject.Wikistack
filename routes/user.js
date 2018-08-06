const router = require('express').Router();
const { userList, userPages } = require('../views');
const { User, Page } = require('../models');

// GET /users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(userList(users));
  } catch (error) {
    next(error);
  }
});

// GET /users/:id
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const pages = await Page.findAll({ where: { authorId: req.params.id } });
    res.send(userPages(user, pages));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
