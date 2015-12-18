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
    'savestate':1,
    'ec':0,
    'pagerefer':'https://passport.weibo.cn/signin/welcome?entry=mweibo&r=http%3A%2F%2Fm.weibo.cn%2F&wm=3349&vt=4',
    'entry':'mweibo',
    'loginfrom':'',
    'client_id':'',
    'code':'',
    'qq':'',
    'hff':'',
    'hfp':'',
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
        'Referer': 'https://passport.weibo.cn/signin/login?entry=mweibo&res=wel&wm=3349&r=http%3A%2F%2Fm.weibo.cn%2F',
        'Cookie':'SUHB=0LcDdu4I7UXf5x; _T_WM=5a1e1658e474737231ec302b25c9df8e; M_WEIBOCN_PARAMS=uicode%3D20000173; H5_INDEX=3; H5_INDEX_TITLE=%E6%9B%B4%E5%A4%9A%E5%A5%BD%E6%98%B5%E7%A7%B0%E5%B7%B2%E7%BB%8F%E8%A2%AB%E5%8D%A0%E7%94%A8'
    },
};

var _un = {
    "request": function() {
        var req = https.request(options, function(res) {
            var photosStr = '';
            console.log(res.headers);
            console.log(res.statusCode);
            res.setEncoding('utf8');
            res.on('data', function(data) {
                photosStr += data;
            }).on('end', function() {
                console.log(photosStr);
            })
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
