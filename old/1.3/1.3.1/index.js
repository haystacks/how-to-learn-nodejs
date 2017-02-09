var index = require('./user.js');
// => 方式一 || 方式二
index.getUserName('A2');//获取用户姓名
index.getUserBlog('A1');//获取用户博客地址
// => 方式三
var userMethod = index();
userMethod.getUserName('A1');