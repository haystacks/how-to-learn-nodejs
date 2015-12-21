// APP PATH
const ROOT = global.root = __dirname;

/**
 * 执行其他操作
 */
var weibo = require('./lib/weibo');
weibo.album.add({name: '测试4'});
