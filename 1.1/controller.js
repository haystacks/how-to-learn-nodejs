var Controller = function() { },
	sleep = function(milliseconds) {
		var startTime = new Date().getTime();
		while(new Date().getTime() < startTime + milliseconds);
	},
	onRespose = function(html, res) {
		res.writeHead({
			'content-length': html.length,
			'content-type': 'text/plain'
		});
		res.write(html);
		res.end();
	},
	exec = require("child_process").exec;
Controller.prototype.index = function(res) {
	//sleep(10000);
	exec('find /', function() {
		onRespose('index方法', res);
	});
}
Controller.prototype.login = function(res) {
	onRespose('login方法', res);
}
/*
 * 没有找到请求资源
 */
Controller.prototype.notFound = function(res) {
	onRespose('404 not found', res)
}
var controller = new Controller();
module.exports = controller;
