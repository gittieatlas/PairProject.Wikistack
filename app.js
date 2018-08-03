const express = require('express');
const morgan = require('morgan');
const client = require('./db');
const bodyParser = require('body-parser');
const models = require('./models');
const path = require('path');
const html = require('html-template-tag');
const views = require('./views');
const router = require('./routes')
const PORT = 1337;

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/wiki', router.wiki);
app.use('/user', router.user);

app.get('/', (req, res) => {
  res.send(require('./views/layout.js')(''));
});

models.db.authenticate().then(() => {
  console.log('connected to the database');
});

const init = async () => {
  await models.db.sync({ force: true });

  app.listen(PORT, () => {
    console.log('App is listening on: ', PORT);
  });
};

init();
