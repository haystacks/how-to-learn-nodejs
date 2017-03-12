var child = require('child_process');
var s = child.execSync('./phantomjs baidu.js');

console.log(s);
