/**
 * 打补丁
 * 文件/文件夹 -> 文件夹
 */
console.time('time');

var fs = require('fs'),
	path = require('path'),
	param = process.argv.slice(2),
	dest = param[1],
	destArr = dest.split(path.sep),
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
				copy(dir);
			}
		})
	},
	copy = function(src) {
		fs.readFile(src, function(err, data) {
			var srcArr = src.split(path.sep);
			srcArr.length > 1 ? srcArr[0] = destArr[0] : srcArr.unshift(destArr[0]);
			var destPath = srcArr.join(path.sep);
			console.log(src +'---'+ destPath);
			if(err) throw err;
			fs.writeFile(destPath, data, function() {
				console.log('复制'+ src +'到'+ destPath +'成功');
				console.timeEnd('time');
			})
		})
	};

param.length == 2 ? traversal(param[0]) : console.log('why?');