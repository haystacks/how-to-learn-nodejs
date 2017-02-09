var Controller = function() { },
	sleep = function(milliseconds) {
		var startTime = new Date().getTime();
		while(new Date().getTime() < startTime + milliseconds);
	},
	onRespose = function(html, res, type) {
		res.writeHead(200, {
			'Content-Length': html.length,
			'Content-Type': type || 'text/html'
		});
		res.write(html);
		res.end();
	},
	type = function(pathname) {
		var start = pathname.indexOf('.')+1,
			typeName = pathname.slice(start);
		switch(typeName) {
			case 'js':
				return 'application/x-javascript';
			case 'css':
				return 'text/css';
			case 'jpg':
				return 'image/jpeg';
			case 'png' || 'gif':
				return 'image/' + typeName;
			case 'ico':
				return 'image/x-icon';
			default:
				return typeName;
		}
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
		err ? controller.notFound(i.res) : onRespose(data, i.res, type(i.pathname));
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
