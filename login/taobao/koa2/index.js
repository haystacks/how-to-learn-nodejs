const sleep = require('./sleep');
const request = require('request');
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
    if (ctx.url === '/') {
        const instance = await phantom.create();
        const page = await instance.createPage();
        page.setting('userAgent', 'Mozilla/5.0 (Linux; Android 5.1; m2 note Build/LMY47D; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.49 Mobile MQQBrowser/6.2 TBS/043024 Safari/537.36 MicroMessenger/6.5.6.1020 NetType/WIFI Language/zh_CN');
        await page.on("onResourceRequested", function(request) {
            if(request.url === 'https://login.m.taobao.com/login.htm?_input_charset=utf-8') {
                // console.log('request (#' + request.id + ', stage "' + request.stage + '"): ' + JSON.stringify(request));
            }
        });
        await page.on("onUrlChanged", function(targetUrl) {
            console.log('New URL: ' + targetUrl);
        });

        // 定义回调参数
        let res;
        await page.on("onResourceReceived", function(response) {
            if(response.url === 'http://www.alimama.com/index.htm' || response.url === 'http://www.alimama.com/500.htm') {
                console.log('A', response);
                page.property('cookies').then(function(cookies) {
                    res = {
                        'status': 1,
                        'content': cookies
                    };
                })
            } else if(response.url === 'https://login.m.taobao.com/login.htm?_input_charset=utf-8' && response.headers.length === 14) {
                console.log('B', response);
                res = {
                    'status': 0,
                    'content': '登录失败'
                };
            }
        });

        const status = await page.open('https://login.m.taobao.com/login.htm?redirectURL=http://www.alimama.com&loginFrom=wap_alimama');

        if(status === 'success') {
            page.evaluate(function() {
                var config = {
                    "username": "",
                    "password": ""
                };

                function touchstart(el, x, y, number, target) {
                    var touch = new Touch({
                        identifier: number,
                        target: target,
                        clientX: x,
                        clientY: y
                    });
                    var event = new TouchEvent('touchstart', {
                        touches: [touch],
                        targetTouches: [touch],
                        changedTouches: [touch],
                    });
                    el.dispatchEvent(event);
                }

                function ifocus(el) {
                    var event = new Event('focus');
                    el.dispatchEvent(event);
                }

                function iblur(el) {
                    var event = new Event('blur');
                    el.dispatchEvent(event);
                }

                // username
                ifocus($('#username')[0]);
                $('#username').val(config.username);
                var whichs = [67,85,78,88,73,76,85];
                var len = whichs.length;
                for(var i=0; i<len; i++) {
                    e = $.Event("keyup");
                    e.which = i;
                    $('#username').trigger(e);
                }
                $('#username').trigger('input');
                iblur($('#username')[0]);

                // password
                ifocus($('#password')[0]);
                $('#password').val(config.password);
                $('#password').trigger('keyup');
                $('#password').trigger('input');
                iblur($('#password')[0]);

                // login
                $('#submit-btn').trigger('click');

            });
        }
        while(!res) {
            await sleep(100);
        }
        ctx.body = JSON.stringify(res);
    } else if(ctx.url === '/21') {
        //
        request.get({
            url: 'http://pub.alimama.com/common/code/getAuctionCode.json',
        })
    }
})

app.listen(3000);
