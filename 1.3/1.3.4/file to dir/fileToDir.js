/**
 * 批量替换多个文件夹中的一个文件
 */

/**
 * 用于优化fs.js中的showAllFiles方法
 * traversal 	遍历
 * directory 	目录
 * file 		文件
 * > node index ./
 */
var fs = require('fs'),
	path = require('path'),
	traversal = function(dir, file) {
		//判断是文件还是文件夹
		fs.stat(dir, function(err, stats) {
			if(!err && stats.isDirectory()) {
				fs.readdir(dir, function(err, files) {
					files.forEach(function(fileOrDir) {
						traversal(path.join(dir, fileOrDir), fileOrDir);
					})
				})
			} else {
				if(file === inFile) {//文件名等同的时候替换文件
					fs.writeFile(dir, inFileContent, function() {
						console.log(dir + '替换成功');
					})
				}
			}
		})
	};

//获取参数 1. 目录 2. 文件名
var param = process.argv.slice(2),
	inDir = param[0],
	inFile = param[1],
	inFileContent;
	fs.readFile(inFile, function(err, data) {
		inFileContent = data;//小文件读取到的内容赋值到外部变量
		traversal(inDir, inFile);
	});