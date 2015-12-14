// APP PATH
const ROOT = global.root = __dirname;

var mysql = require('./lib/mysql');

mysql.init();
mysql._select();

/**
 * 执行其他操作
 */
require('./lib/test');

console.log(123456);

/**
 * 关闭数据库连接
 */
mysql.destoty();
