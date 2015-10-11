/**
 * archiver https://github.com/archiverjs/node-archiver
 * 一个文件压缩简单例子
 */
var fs = require('fs'),
	archiver = require('archiver'),
	archive = archiver.create('zip'),
	output = fs.createWriteStream('a.zip'),
	filePath = process.argv.slice(2)[0];
archive.file(filePath);
archive.pipe(output);
archive.finalize();