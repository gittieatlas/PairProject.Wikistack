const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

const Page = db.define('page', {
  title: {
    type : Sequelize.STRING,
    allowNull : false
  },
  slug: {
    type: Sequelize.STRING,
    validate: {
      is: /[^A-Z0-9]/i // RegExp
    },
    allowNull : false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull : false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
    allowNull : false
  }
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

module.exports = { db, Page, User };
