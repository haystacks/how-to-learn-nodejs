var https = require('https');
var qs = require('querystring');
var fs = require('fs');
var mysql = require('mysql');
var config = {
  host     : '127.0.0.1',
  user     : 'root',
  password : '123456',
  database : 'unofficial'
};

var i = 10;

var postData = qs.stringify({
    'username': 'cangku@unofficial.cn',
    'password': '123456789',
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
            console.log(res.headers['set-cookie'][0]);
        })

        //error
        req.on('error', function(e) {
            console.log(e);
        })
        req.write(postData);
        req.end();
    }
}
_un.request();
