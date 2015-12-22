/**
 * @author 		unofficial
 * weibo
 * album
 */
"use strict";
const ROOT = global.root;
var g = require(ROOT + '/lib/global');
var request = require(ROOT + '/lib/request');
var mysql = require(ROOT + '/lib/mysql');
var qs = require('querystring');

var Weibo = function() {
	var signInInfo = g.loadYaml('weibo');
	this.username = signInInfo.username;
	this.password = signInInfo.password;
	this.searchdata = {
		tag: '美女',
		count: 50,
		page: 1,
		type: 'best',
		rid: '',
	};
	this.cookie = signInInfo.sub;
	this.isLogin();
	mysql.init();
}
/**
 * weibo/isLogin 		是否登录(sub是否过期)
 */
Weibo.prototype.isLogin = function() {
	let self = this;
	if(this.cookie) {
		let options = {
			hostname: 'photo.weibo.com',
			path: '/welcome/hot',
			headers: {
				'cookie': this.cookie,
			}
		};
		let callback = function(res) {
			if(res.statusCode != 200) {
				self.cookie = '';
				self.login();
			};
		}
		request.get(['http', options, callback]);
		return true;
	} else {
		return false;
	}
}
/**
 * weibo/login 			微博登录
 */
Weibo.prototype.login = function() {
	let data = {
		username: this.username,
		password: this.password
	};
	let options = {
		hostname: 'passport.weibo.cn',
		path: '/sso/login',
		headers: {
			'Referer': 'https://passport.weibo.cn/signin/login',
		},
	};
	let callback = function(res) {
		/**
		 * retcode
		 * 50011015,50011002 用户名或密码错误
		 * 20000000 登录成功
		 */
		let rsInfo = JSON.parse(res.text);
		if(rsInfo.retcode == 20000000) {
			 /**
			  * write SUB to weibo.yml
			  */
			 g.writeYaml('weibo', {'sub':res.headers['set-cookie'][0]});
			 console.log('sign in success');
		} else {
			console.log(rsInfo.msg);
		}
	}
	request.post(['https', options, callback, data]);
}

/**
 * search
 */
Weibo.prototype.search = function() {
	let options = {
		hostname: 'photo.weibo.com',
		path: '/tags/get_photos_by_tag_name?' + qs.stringify(this.weibo.searchdata),
		headers: {
			'cookie': this.cookie,
		},
	};
	let callback = function(res) {
		let userInfoSqlStr = '';
		let photosSqlStr = '';
		let resJson = JSON.parse(res.text);
		let photos = resJson.data.photos;
		for (let i in photos) {
			userInfoSqlStr = (userInfoSqlStr ? userInfoSqlStr + ',' : '') + '('+ photos[i].uid +', "'+ photos[i].user_info.name +'", "'+ photos[i].user_info.profile_image_url +'", '+ photos[i].user_info.verified +')';
			photosSqlStr = (photosSqlStr ? photosSqlStr + ',' : '') + '('+ photos[i].uid +', "'+ photos[i].photo_id +'", "'+ photos[i].album_id +'", "'+ photos[i].pid +'", "'+ photos[i].pic_host +'", "'+ photos[i].pic_name +'")';
		}
		let sqls = ['insert into user_info(uid, name, profile_image_url, verified) value'+ userInfoSqlStr, 'insert into photos(uid, photo_id, album_id, pid, pic_host, pic_name) value'+ photosSqlStr];
		/**
		 * mqsql insert
		 */
		let callback = function(err, rs) {
			console.log(rs.insertId);
		};
		for (let i in sqls) {
			mysql.query(sqls[i], callback);
		}
		mysql.destroy();
	}
	request.get(['http', options, callback]);
}

var Album = function() {
	_weibo.isLogin();
}

/**
 * album/add 			添加专辑
 */
Album.prototype.add = function(e) {
	let data = {
		album_name: e && e.name ? e.name : '测试',
		album_describe: e && e.describe ? e.describe : '测试',
		property: e && e.property ? e.property : 1,
		question: e && e.question ? e.question : '',
		answer: e && e.answer ? e.answer : '',
	};
	let options = {
		hostname: 'm.weibo.cn',
		path: '/album/addAlbum',
		headers: {
			'Referer':'http://m.weibo.cn/album',
			'cookie': _weibo.cookie,
		},
	};
	let callback = function(res) {
		if(res.statusCode == 200) {
			let resText = JSON.parse(res.text);
			if(resText && resText.ok) {
				console.log(res.text);
			} else {
				console.log('add fail');
			}
		}
	};
	request.post(['http', options, callback, data]);
}
/**
 * album/upload 		上传照片
 */
Album.prototype.upload = function() {

}

var _weibo = new Weibo();
var _album = new Album();

module.exports = {
	weibo: _weibo,
	username: _weibo.username,
	password: _weibo.password,
	cookie: _weibo.cookie,
	login: _weibo.login,
	isLogin: _weibo.isLogin,
	search: _weibo.search,
	album: {
		add: _album.add,
		upload: _album.upload
	},
}
