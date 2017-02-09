/**
 * 实例讲解
 * @param patch文件夹 目录结构按照压缩包的目录结构 PC1111/1111/项目根目录
 * @param 模板文件夹 dest，遍历当前文件夹
 */

var traversal = require('traversal')['traversal'];
var fs = require('fs');
var archiver = require('archiver');
var archive = archiver.create('zip');
archive.append(fs.createReadStream('a/a.zip'), { name:'traversal.js' });
archive.pipe(fs.createWriteStream(zipPath));