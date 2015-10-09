/**
 * 用于优化fs.js中的showAllFiles方法
 * traversal 	遍历
 * directory 	目录
 * file 		文件
 * > node index ./
 */
var fs = require('fs'),
	path = require('path'),
	traversal = function(dir) {
		//check dir
		fs.stat(dir, function(err, stats) {
			if(!err && stats.isDirectory()) {
				fs.readdir(dir, function(err, files) {
					files.forEach(function(fileOrDir) {
						traversal(path.join(dir, fileOrDir));
					})
				})
			} else {
				console.log(dir);
			}
		})
	};

//获取参数 process是一个全局对象
var inDir = process.argv.slice(2)[0];//返回参数 slice() @return array
exports.init = function() {
	console.log("======"+inDir+"======");
	traversal(inDir);
};