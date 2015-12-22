"use strict";
const ROOT = global.root;
var g = require(ROOT + '/lib/global');
var request = require(ROOT + '/lib/request');
var mysql = require(ROOT + '/lib/mysql');
var qs = require('querystring');

var Tumblr = function() {
	this.keyword = '美女';
	this.post_page = 1,
	this.querystringparam = {
		sort: 'top',
		filter_post_type: 'any',
		before: 0,
		json: 1
	}
	mysql.init();
}

Tumblr.prototype.search = function() {
	let options = {
		hostname: 'www.tumblr.com',
		path: '/'+ qs.stringify({search: this.tumblr.keyword}, '/', '/') +'/post_page/'+ this.tumblr.post_page +'?' + qs.stringify(this.tumblr.querystringparam),
		headers: {
			'x-requested-with':'XMLHttpRequest'
		},
	};
	let callback = function(res) {
		let userInfoSqlStr = '';
		let photosSqlStr = '';
		let resJson = JSON.parse(res.text.replace(/[()]/g, ''));
		let photos = resJson.posts;
		for (let i in photos) {
			userInfoSqlStr = (userInfoSqlStr ? userInfoSqlStr + ',' : '') + '('+ photos[i].id +', "'+ photos[i].tumblelog_name +'", "'+ photos[i].avatar_url +'", "'+ photos[i].tumblelog_url +'")';
			photosSqlStr = (photosSqlStr ? photosSqlStr + ',' : '') + '('+ photos[i].id +', "'+ photos[i].photo +'", "'+ photos[i].type +'")';
		}
		let sqls = ['insert into tumblr_user_info(uid, name, avatar_url, tumblelog_url) value'+ userInfoSqlStr, 'insert into tumblr_photos(uid, photo, type) value'+ photosSqlStr];
		/**
		 * mqsql insert
		 */
		let callback = function(err, rs) {
			console.log(rs.insertId);
		};
		for (let i in sqls) {
			mysql.query(sqls[i], callback)
		}
		mysql.destroy();
	}
	// console.log(options);
	request.get(['https', options, callback]);
}

var _tumblr = new Tumblr();

module.exports = {
	tumblr: _tumblr,
	search: _tumblr.search
};