var main1 = require('unofficial'); //如果package.json中main没有设置值，默认load的文件是index.js 
require('unofficial/index');
var main2 = require('unofficial/main'); //初始化一次，这次无效