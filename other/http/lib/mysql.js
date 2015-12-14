'use strict';
var mysql = require('mysql');
var gf = require('./global');
var dbConfig = gf.loadYaml('databases'); //var dbConfigOther = gf.loadJson('databases');
/**
 * sigle mysql
 */
var _Mysql = function(config) {
	this.config = config;
	this.isConnect = false;
	this.connection = null;
}

_Mysql.prototype.init = function() {
	if(!this.connection && !this.isConnect) {
		this.connection = mysql.createConnection(this.config);
		this.connection.connect();
		this.isConnect = true;
	}
}

_Mysql.prototype._select = function() {
	let res = function(err, rs) {
		console.log(rs);
		return rs;
	};
	this.connection.query('select * from photos where id = 1', res);
}

_Mysql.prototype.destoty = function() {
	this.connection.end();
}
var _m = new _Mysql(dbConfig);
module.exports = _m;
