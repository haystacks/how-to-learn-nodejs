/**
 * archiver https://github.com/archiverjs/node-archiver
 * 文件压缩 	archive.file()
 * 文件夹压缩 	archive.directory()
 * 
 * 格式化时间 	moment.js
 */
var fs = require('fs'),
	path = require('path'),
	moment = require('moment'),
	archiver = require('archiver'),
	archive = archiver.create('zip'),
	src = process.argv.slice(2)[0],
	dest = process.argv.slice(2)[1] ? process.argv.slice(2)[1] : '',
	fileOrDirName = path.basename(src, path.extname(src)),
	fileOrDirName = fileOrDirName == '.' || fileOrDirName == '..' ? moment().format('YYYYMMDDhhmmss') : fileOrDirName,//未命名文件或者文件夹（./或者../）以当前时间为准
	zipName = fileOrDirName+'.zip',
	zipPath = path.join(dest, zipName);
//判断是文件还是文件夹
fs.stat(src, function(err, stats) {
	if(err) throw err;
	if(stats.isFile()) {//文件
		archive.file(src);
	} else {//文件夹
		archive.directory(src);
	}
	archive.pipe(fs.createWriteStream(zipPath));
	archive.finalize();
})