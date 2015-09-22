// => 方式一
var userInfo = require('./user.json');
//
exports.getUserName = function(key) {
	console.log(userInfo[key].userName);
}
//
exports.getUserBlog = function(key) {
	console.log(userInfo[key].blog);
}
//
var userInfo = require('./user.json'),
	getUserName = function(key) {
		console.log(userInfo[key].userName);
	},
	getUserBlog = function(key) {
		console.log(userInfo[key].blog);
	};
//exports object
// => 方式二
module.exports = {
	"getUserName": getUserName,
	"getUserBlog": getUserBlog
}
//exports function
// => 方式三
module.exports = function() {
	return {
		"getUserName": getUserName,
		"getUserBlog": getUserBlog
	}
}