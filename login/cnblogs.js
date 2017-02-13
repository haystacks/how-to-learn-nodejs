const request    = require('koa-request'),
      crypto    = require('crypto'),
      CORS_URL   = function() {
          return ''.concat(this.request.protocol, '://',  this.request.hostname, ':4000');
      },
      PUBLIC_KEY = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCp0wHYbg/NOPO3nzMD3dndwS0MccuMeXCHgVlGOoYyFwLdS24Im2e7YyhB0wrUsyYf0/nhzCzBK8ZC9eCWqd0aHbdgOQT6CuFQBMjbyGYvlVYU2ZP7kG9Ft6YV6oc9ambuO7nPZh+bvXH0zDKfi02prknrScAKC0XhadTHT3Al0QIDAQAB';


function cryptoVal(val) {
    return crypto.publicEncrypt(PUBLIC_KEY, new Buffer(val));
}
module.exports = {
    login: function() {
        return function * (next) {
            this.set('Access-Control-Allow-Origin', CORS_URL.call(this));
            this.set('Content-Type', 'application/json');
            const {username, password} = {username: this.request.body.username, password: this.request.body.password};
            if(username && password) {
                var responseBody;
                let config     = {
                    weixin: {
                        host: 'https://passport.cnblogs.com',
                        url: '/user/signin'
                    }
                };
                console.log(crypto.publicEncrypt(PUBLIC_KEY, new Buffer(username)));
                let options    = {
                    url: config.weixin.host.concat(config.weixin.url),
                    form: {
                        input1   : cryptoVal(username),
                        input2   : cryptoVal(password),
                        remember : false
                    },
                    method: 'POST'
                };
                console.log(options);
                var response = yield request(options);
                responseBody = response.body;
            } else {
                responseBody = {status: 0, info: '登录失败'};
            }
            this.body = responseBody;
            yield * next;
        }
    }
}
