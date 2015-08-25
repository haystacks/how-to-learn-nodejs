var route = function(handles, pathname) {
	if(typeof(handles[pathname]) == 'function') {
		return handles[pathname]();
	} else {
		return '404 not found';
	}
}
exports.route = route;