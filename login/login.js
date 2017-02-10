'use strict';
const request = require('koa-request'),
      fs      = require('fs'),
      crypto  = require('crypto'),
      zlib    = require('zlib');

function md5 (text) {
    return crypto.createHash('md5').update(text).digest('hex');
}

module.exports = {
    qrcode: function() {
        return function * (next) {
            this.set('Access-Control-Allow-Origin', 'http://192.168.25.137:4000');
            const body     = this.request.body;
            const username = body.username || 'unofficial';
            const pwd      = body.password || '******';
            let config     = {
                weixin: {
                    host: 'https://mp.weixin.qq.com',
                    url: '/cgi-bin/bizlogin?action=startlogin',
                    referer: '/cgi-bin/loginpage'
                }
            }
            let options    = {
                url: config.weixin.host.concat(config.weixin.url),
                form: {
                    username: username,
                    pwd     : md5(pwd.substr(0, 16)),
                    imgcode : '',
                    f       : 'json'
                },
                method: 'POST',
                headers: {
                    Referer: config.weixin.host.concat(config.weixin.referer)
                }
            };
            var response   = yield request(options);
            config = {
                weixin: {
                    host: 'https://mp.weixin.qq.com',
                    url: '/cgi-bin/loginqrcode?action=getqrcode&param=4300&rd=893',
                    referer: JSON.parse(response.body).redirect_url
                }
            };
            options = {
                url: config.weixin.host.concat(config.weixin.url),
                headers: {
                    Referer: config.weixin.host.concat(config.weixin.referer),
                    Cookie: response.headers['set-cookie']
                },
                encoding: null
            };

            var response = yield request(options);
            this.body = ['data:image/jpg;base64,', response.body.toString('base64')].join('');
            yield * next;
        }
    }
}
