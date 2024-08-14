const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'webshop_user',
  password: 'password',
  database: 'webshop',
  connectionLimit: 5
});

module.exports = pool;
