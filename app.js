const express = require('express');
const morgan = require('morgan');
const client = require('./db');
const bodyParser = require('body-parser');
const { db } = require('./models');
const path = require('path');
const html = require('html-template-tag');
const views = require('./views');
const PORT = 1337;

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.send(require('./views/layout.js')(''));
});

db.authenticate().
  then (() => {
    console.log('connected to the database');
  })

app.listen(PORT, () => {
  console.log('App is listening on: ', PORT);
});
