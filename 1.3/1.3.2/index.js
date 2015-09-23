var index = require('./init.js'),
	otherIndex = require('./init.js');
index.count();
index.count();
otherIndex.count();
console.log(index === otherIndex);