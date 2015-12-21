"use strict";
var http 	= require('http');
var https 	= require('https');
var qs 		= require('querystring');

var request = {
	post: function(e) {
		e[4] = qs.stringify(e[3]);
		e[3] = 'post';
		let req = this._e(e);
		req.write(e[4]);
		this._s(req);
	},
	get: function(e) {
		e[3] = 'get';
		let req = this._e(e);
		this._s(req);
	},
	_e: function(e) {
		let [protocol, options, callback, method, data] = e;
		let theOptions = {
			hostname: options.hostname,
			path: options.path,
			method: method,
			port: options.port ? options.port : (protocol == 'https' ? 443 : 80),
			headers: {
				'Content-Type':"application/x-www-form-urlencoded; charset=UTF-8",
				'Content-Length': data ? data.length : 0,
				'user-agent':'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_2_1 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8C148 Safari/6533.18.5',
				'Referer': options.headers && options.headers.Referer ? options.headers.Referer : options.hostname,
				'Cookie': options.cookie ? options.cookie : '',
			},
		};
		let self = this;
		if(protocol == 'https') {
			return https.request(theOptions, function(res) {
				self.response(res, callback);
			})
		} else if(protocol == 'http') {
			return http.request(theOptions, function(res) {
				self.response(res, callback);
			});
		}
	},
	_s: function(req) {
		//error
		req.on('error', function(e) {
			if(e) throw e;
		})
		req.end();
	},
	response: function(res, callback) {
		res.text = '';
		res.on('data', function(chunk) {
			res.text += chunk;
		}).on('end', function() {
			callback(res);
		})
	}
}

module.exports = request;
