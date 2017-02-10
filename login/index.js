const app     = require('koa')(),
      koaBody = require('koa-body')(),
      router  = require('koa-router')(),
      login   = require('./login.js');

router.get('/qrcode', koaBody, function * (next) {
      this.body = 'www.unofficial.cn';
});

/**
 * 邮箱+密码 => 二维码
 */
router.post('/qrcode', koaBody, login.qrcode());

/**
 * 询问二维码登录情况
 */
router.post('/ask', koaBody, login.ask());
app.use(router.routes()).listen(3000);
