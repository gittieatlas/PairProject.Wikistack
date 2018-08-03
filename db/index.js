const pg = require('pg');
// const pgHStore = require ('pg-hstore');
const client = new pg.Client('postgres://localhost/wikistack');
client.connect();

module.exports = client;
