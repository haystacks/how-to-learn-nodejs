var http 	= require('http'),
	url 	= require('url');

/*var onRequest = function(req, res) {
	var html = 'hello world';
	res.writeHead({
		'content-length': html.length,
		'content-type': 'text/plain'
	});
	res.write(html);
	res.end();
},
server = {
	start: function() {
		http.Server(onRequest).listen(9000);
		console.log('server start');
	}
};*/

var Server = function() {
	var onRequest = function(req, res) {
		var pathname = url.parse(req.url).pathname;
		var html = 'hello world';
		console.log('pathname:' + pathname);
		res.writeHead({
			'content-length': html.length,
			'content-type': 'text/plain'
		});
		res.write(html);
		res.end();
	};
	this.start = function() {
		http.Server(onRequest).listen(9000);
		console.log('server start');
	};
};
var server = new Server;

module.exports = server;