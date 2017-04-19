const sleep = require('./sleep');
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
    console.log(ctx.query);
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
})

// sleep 2000
app.use(async (ctx, next) => {
    await sleep(2000);
    await next();
});

app.use(async (ctx, next) => {
    ctx.body = 123;
})

app.listen(3333);
