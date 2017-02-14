const app     = require('koa')(),
      koaBody = require('koa-body')(),
      router  = require('koa-router')(),
      login   = require('./login.js'),
      cnblogs   = require('./cnblogs.js'),
      vote   = require('./vote.js');

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

/**
 * 应该登录了
 */
router.post('/biglogin', koaBody, login.bizlogin());

/**
 * 用户名搜索
 */
router.post('/search/user_tag', koaBody, login.search.userTag());

/**
 * 消息列表
 */
router.get('/message/list', koaBody, login.message.list());
router.get('/message/response', koaBody, login.message.response());


// 投票模拟
router.get('/vote', koaBody, vote.do());

// 博客园登录
router.post('/cnblogs/login', koaBody, cnblogs.login());
router.post('/feed/recent', koaBody, cnblogs.feed.recent());

app.use(router.routes()).listen(3000);
