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

// GET /users/:dynamicvalue
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    const pages = await Page.findAll({
      where: { authorId: req.params.userId }
    });
    res.send(userPages(user, pages));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
