const express = require('express');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const models = require('./models');
const path = require('path');
const router = require('./routes');
const PORT = 3000;

const app = express();

app.use(volleyball);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

app.use('/wiki', router.wiki);
app.use('/user', router.user);

app.get('/', function(req, res) {
  res.redirect('/wiki/');
});

models.db.authenticate().then(() => {
  console.log('connected to the database');
});

const init = async () => {
  await models.db.sync(); // pass in { force: true } to drop previous tables created and create new ones with this updated structure.

  app.listen(PORT, () => {
    console.log('App is listening on: ', PORT);
  });
};

init();
