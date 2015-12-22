"use strict";
// APP PATH
const ROOT = global.root = __dirname;

/**
 * 搜索图片
 * tumblr.search(); 默认关键字是美女
 * weibo.search(); 默认关键字是美女
 * 其他功能，微博相关功能，用于微博操作
 * weibo.login(); 模拟登录
 * weibo.album.add(); 添加相册专辑
 *
 * 操作方法
 * babel-node main w //微博搜索
 * babel-node main t //tumblr搜索
 */

if(process.argv[2] == 't' || process.argv[2] == 'tumblr') {
	let tumblr = require('./lib/tumblr');
	tumblr.search();
} else if(process.argv[2] == 'w' || process.argv[2] == 'weibo') {
	let weibo = require('./lib/weibo');
	weibo.search();
}