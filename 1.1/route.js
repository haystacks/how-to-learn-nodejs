var route = function(handles, pathname, res) {
		if(typeof(handles[pathname]) == 'function') {
			handles[pathname](res);
		} else {
			//pathname 解析
			if(/\./.test(pathname)) {
				handles['other']({'res': res, 'pathname': pathname});
			} else {
				handles['404'](res);
			}
		}
	};
exports.route = route;