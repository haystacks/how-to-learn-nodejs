// APP PATH
const ROOT = global.root = __dirname;

var mysql = require('./lib/mysql.class');

console.log(mysql.select());