var mysql = require('mysql');
var gf = require('./global.function');
var dbConfig = gf.loadYaml('databases'); // or gf.loadJson('databases');

// mysql
var connection = mysql.createConnection(dbConfig);

function _mysql() {};
_mysql.prototype.select = function() {
	connection.connect();
	connection.query('select * from photos' , function(err, result) {
		if(err) throw err;
		return result;
	});
	connection.end();
}
var M = new _mysql();
module.exports = M;