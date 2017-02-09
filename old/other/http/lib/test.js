'use strict';
/**
 * 测试文件
 */
var mysql = require('./mysql');
mysql.init();
/**
 * set select info
 * fields table where
 */

mysql.fields = 'id';
mysql.table = 'photos';
mysql.where = 'where id in (2,3) limit 0, 1';

console.log(mysql.sql);

mysql.find();

/**
 * 关闭数据库连接
 */
mysql.destoty();
