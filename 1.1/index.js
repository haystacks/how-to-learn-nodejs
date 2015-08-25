var server     = require('./server'),
	route      = require('./route'),
	controller = require('./controller'),
	handles = [];
	/*
	 * 定义具体的操作
	 */
	handles["/"] = controller.index;
	handles['/index'] = controller.index;
	handles['/login'] = controller.login;
server.start(handles, route.route);