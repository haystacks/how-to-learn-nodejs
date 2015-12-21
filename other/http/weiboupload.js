/**
 * 微博相册功能
 * weibo album
 * @author unofficial
 */
"use strict";
const ROOT = global.root = __dirname;
var g = require(ROOT + '/lib/global');

var http = require('http');
var qs = require('querystring');

/**
 * @album_id 专辑ID
 * @pic 图片
 * @description 描述
 * @tomblog 发布微博
 * @tocover 设置为封面
 */
var postData = qs.stringify({
    'album_id':'39217646683178300000003872204553',
    'pic': 'http://ww2.sinaimg.cn/square/74e84d68jw1elgg9v3pbuj218g0tm0zs.jpg',
    'description': '图片描述',
    'tomblog': 0,
    'tocover': 0,
});

var weibo = g.loadYaml('weibo');
var options = {
    hostname: 'm.weibo.cn',
    path: '/album/upload',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin':'http://m.weibo.cn',
        'Referer':'http://m.weibo.cn/album',
        'cookie': weibo.sub,
    },
};

var _un = {
    "request": function() {
        var req = http.request(options, function(res) {
            var photosStr = '';
            res.setEncoding('utf8');
            res.on('data', function(data) {
                photosStr += data;
            }).on('end', function() {
                console.log(photosStr);
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
