/**
 * 微博模拟登录
 * weibo sign in
 * @author unofficial
 */
"use strict";
const ROOT = global.root = __dirname;
var g = require(ROOT + '/lib/global');

var https = require('https');
var qs = require('querystring');
/**
 * sign in info
 */
var weibo = g.loadYaml('weibo');
var postData = qs.stringify({
    'username': weibo.username,
    'password': weibo.password,
});

var options = {
    hostname: 'passport.weibo.cn',
    path: '/sso/login',
    method: 'POST',
    port: 443,
    headers: {
        'Content-Type':"application/x-www-form-urlencoded; charset=UTF-8",
        'Content-Length': postData.length,
        'user-agent':'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_2_1 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8C148 Safari/6533.18.5',
        'Referer': 'https://passport.weibo.cn/signin/login',
    },
};

var _un = {
    "request": function() {
        var req = https.request(options, function(res) {
            res.text = '';
            //console.log(res.headers['set-cookie'][0]);
            res.on('data', function(chunk) {
                res.text += chunk;
            }).on('end', function() {
                /**
                 * retcode
                 * 50011015,50011002 用户名或密码错误
                 * 20000000 登录成功
                 */
                let rsInfo = JSON.parse(res.text);
                if(rsInfo.retcode == 20000000) {
                     /**
                      * write SUB to weibo.yml
                      */
                     g.writeYaml('weibo', {'sub':res.headers['set-cookie'][0]});
                } else {
                    console.log(rsInfo.msg);
                }
            })
        })

        //error
        req.on('error', function(e) {
            if(e) throw e;
        })

        req.write(postData);
        req.end();
    }
}
_un.request();
