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
	this.fields = '*';
	this.sql = null;
	this.table = null;
	this.where = null;
}

_Mysql.prototype.init = function() {
	if(!this.connection && !this.isConnect) {
		this.connection = mysql.createConnection(this.config);
		this.connection.connect();
		this.isConnect = true;
	}
}

_Mysql.prototype.find = function() {
	let res = function(err, rs) {
		console.log(rs);
		return rs;
	};
	this.sql = 'select ' + this.fields + ' from ' + this.table + ' ' + (this.where ? this.where : '');
	this.connection.query(this.sql, res);
}

_Mysql.prototype.destoty = function() {
	this.connection.end();
}
var _m = new _Mysql(dbConfig);
module.exports = {
	config	: 	_m.config,
	destoty	: 	_m.destoty,
	fields	: 	_m.fields,
	find	: 	_m.find,
	init	: 	_m.init,
	sql		: 	_m.sql,
	table	: 	_m.table,
	where	: 	_m.where
};
