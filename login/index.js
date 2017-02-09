const app     = require('koa')(),
      koaBody = require('koa-body')(),
      router  = require('koa-router')(),
      login   = require('./login.js');

router.get('/', koaBody, login.weixin());
router.post('/', koaBody, login.weixin());
app.use(router.routes()).listen(3000);
