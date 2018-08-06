const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
});

Page.beforeValidate(page => {
  page.slug = slugify(page.title);
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    isEmail: true,
    allowNull: false
  }
});

Page.belongsTo(User, { as: 'author' });

/**
 * Returns the given string after
 * removing all non-alphanumeric characters from title
 * and replacing whitespace with underscore
 * @param {*} title
 */
function slugify(title) {
  return title
    .trim()
    .replace(/\s+/g, '_')
    .replace(/\W/g, '')
    .toLowerCase();
}

module.exports = { db, Page, User };
