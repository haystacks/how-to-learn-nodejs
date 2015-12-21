/**
 * @author 		unofficial
 * weibo
 * album
 */
"use strict";
const ROOT = global.root;
var g = require(ROOT + '/lib/global');
var request = require(ROOT + '/lib/request');

var Weibo = function() {
	var signInInfo = g.loadYaml('weibo');
	this.username = signInInfo.username;
	this.password = signInInfo.password;
	this.sub = signInInfo.sub;
}
/**
 * weibo/isLogin 		是否登录(sub是否过期)
 */
Weibo.prototype.isLogin = function() {
	let self = this;
	if(this.sub) {
		let options = {
			hostname: 'photo.weibo.com',
			path: '/welcome/hot',
			cookie: this.sub,
		};
		let callback = function(res) {
			console.log(res);
			if(res.statusCode != 200) {
				self.sub = '';
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
	if(!this.isLogin()) {
		request.post(['https', options, callback, data]);
	}
}

var Album = function() {
	if(!_weibo.isLogin()) {
		_weibo.login();
	}
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
		sub: _weibo.sub,
		headers: {
			'Referer':'http://m.weibo.cn/album',
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
	username: _weibo.username,
	password: _weibo.password,
	sub: _weibo.sub,
	login: _weibo.login,
	isLogin: _weibo.isLogin,
	album: {
		add: _album.add,
		upload: _album.upload
	},
}
