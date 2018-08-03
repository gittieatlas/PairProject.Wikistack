const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

const Page = db.define('page', {
  title: Sequelize.STRING,
  slug: {
    type: Sequelize.STRING,
    validate: {
      is: /[^A-Z0-9]/i // RegExp
    }
  },
  content: Sequelize.TEXT,
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
});

const User = db.define('user', {
  name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    isEmail: true
  }
});

module.exports = { db, Page, User };
