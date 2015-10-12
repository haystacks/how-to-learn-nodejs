/**
 * archiver https://github.com/archiverjs/node-archiver
 * 文件压缩 	archive.file()
 * 文件夹压缩 	archive.directory()
 * 
 * 格式化时间 	moment.js
 */
var fs = require('fs'),
	path = require('path'),
	archiver = require('archiver'),
	archive = archiver.create('zip'),
	fileOrDirPath = process.argv.slice(2)[0],
	fileOrDirName = path.basename(fileOrDirPath, path.extname(fileOrDirPath)),
	fileOrDirName = fileOrDirName == '.' || fileOrDirName == '..' ? Math.floor(Math.random() * 1000) : fileOrDirName;
	output = fs.createWriteStream(fileOrDirName+'.zip');
//判断是文件还是文件夹
fs.stat(fileOrDirPath, function(err, stats) {
	if(err) throw err;
	if(stats.isFile()) {//文件
		archive.file(fileOrDirPath);
	} else {//文件夹
		archive.directory(fileOrDirPath);
	}
	archive.pipe(output);
	archive.finalize();
})

/**
 * 待完善 => 3
 * 未命名文件或者文件夹（./或者../）以当前时间为准，可以参考（moment.js）
 * ./或者../时排除压缩文件本身
 * 检测到同名压缩包存在，重命名压缩包文件
 */