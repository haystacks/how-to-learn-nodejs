var koa = require('koa');
var app = koa();
var helloworld = require('koa-hello-world');

app.use(helloworld()).listen(3000);
