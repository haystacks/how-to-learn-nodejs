const phantom = require('phantom');
const Koa = require('koa');
const app = new Koa();
// app.use(async (ctx, next) => {
//   const start = new Date();
//   await next();
//   const ms = new Date() - start;
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
// })
// response
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(async (ctx, next) => {
    const instance = await phantom.create();
    const page = await instance.createPage();
    await page.on("onResourceRequested", function(requestData) {
        //console.info('Requesting', requestData.url)
    });

    const status = await page.open('https://www.baidu.com/');
    let s = status;

    const content = await page.property('content');
    //console.log(content);
    let t = 123;
    await instance.exit();
    let u = 456;

    ctx.body = s+t+u;
})

app.listen(3000);