var server     = require('./server'),
	route      = require('./route'),
	controller = require('./controller'),
	handles = [];
	/*
	 * 定义具体的操作 404
	 */
	handles["/"] = controller.index;
	handles['/index'] = controller.index;
	handles['/login'] = controller.login;
	handles[404] = controller.notFound;
server.start(handles, route.route);