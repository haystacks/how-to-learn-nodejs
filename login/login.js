'use strict';
const request = require('koa-request'),
      crypto  = require('crypto');

function md5 (text) {
    return crypto.createHash('md5').update(text).digest('hex');
}

function loginQrCode() {
    var loginRs = startlogin();

    const config = {
        weixin: {
            host: 'https://mp.weixin.qq.com',
            url: '/cgi-bin/bizlogin?action=startlogin',
            referer: loginRs.base_resp.redirect_url
        }
    }
}

module.exports = {
    weixin: function() {
        return function * (next) {
            const body     = this.request.body;
            const username = body.username || 'unofficial';
            const pwd      = body.password || '******';
            this.set('Access-Control-Allow-Origin', 'http://192.168.25.137:4000');
            const config = {
                weixin: {
                    host: 'https://mp.weixin.qq.com',
                    url: '/cgi-bin/bizlogin?action=startlogin',
                    referer: '/cgi-bin/loginpage'
                }
            }
            var options = {
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
            var response = yield request(options);
            console.log(response.headers);
            var info     = JSON.parse(response.body);
            this.body    = info;
            yield * next;
        }
    }
}
