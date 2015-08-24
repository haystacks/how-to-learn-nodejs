var server = require('./server'),
	route  = require('./route');
server.start(route.route);