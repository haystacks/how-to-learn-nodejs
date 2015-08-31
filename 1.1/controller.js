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
	exec = require("child_process").exec,
	fs = require('fs');
Controller.prototype.index = function(res) {
	//sleep(10000);
	fs.readFile('./index/tpl/index.html', function(err, data) {
		err ? controller.notFound(res) : onRespose(data, res);
	})
}
Controller.prototype.login = function(res) {
	fs.readFile('./index/tpl/login.html', function(err, data) {
		err ? controller.notFound(res) : onRespose(data, res);
	})
}
Controller.prototype.other = function(i) {
	fs.readFile('.'+i.pathname, function(err, data) {
		err ? controller.notFound(i.res) : onRespose(data, i.res);
	})
}
/*
 * 没有找到请求资源
 */
Controller.prototype.notFound = function(res) {
	onRespose('404 not found', res)
}
var controller = new Controller();
module.exports = controller;
