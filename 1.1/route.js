var route = function(handles, pathname, res) {
	if(typeof(handles[pathname]) == 'function') {
		handles[pathname](res);
	} else {
		handles[404](res);
	}
}
exports.route = route;