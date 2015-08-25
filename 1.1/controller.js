var Controller = function() { };
Controller.prototype.index = function() {
	console.log('index方法');
	return '首页';
}
Controller.prototype.login = function() {
	console.log('index方法');
	return '登录页面';
}
var controller = new Controller();
module.exports = controller;
