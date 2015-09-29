/**
 * 文件复制
 */
var fs = require('fs'),
/*	copy = function(src, dst) {
	},*/
	copy = function(src, dst, fileSize) {//大文件复制
		console.log('fileSize:' + fileSize);
		if(fileSize > 10) {//大于10M的文件
			console.log('big file');
			fs.createReadStream(src).pipe(fs.createWriteStream(dst));
		} else {//小文件复制
			console.log('small file');
			fs.writeFileSync(dst, fs.readFileSync(src));
		}
	},
	fileInfo = function() {
		var info = function(err, stats) {
			copy(argv[0], argv[1], stats.size / 1024 / 1024);
		};
		fs.stat(argv[0], info);
	},
	argv = process.argv.slice(2);

/**
 * 遍历文件夹
 */
var path = argv[0],
	showAllFiles = function() {
	fs.readdir(path, function(err, files) {
		if(err) throw err;
		var i = -1,
			len = files.length;
		while(++i < len) {
			var thisDirOrFile = files[i];
			path += '/' + thisDirOrFile;
			fs.stat(path, function(err, stats) {
				if(!err) showAllFiles();
			})
			console.log(path);
		}
	});
};
!function() {
	//fileInfo();
	showAllFiles();
}()