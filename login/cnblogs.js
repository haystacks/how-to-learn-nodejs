const request    = require('koa-request'),
      crypto     = require('crypto'),
      fs         = require('fs'),
      CORS_URL   = function() {
          return ''.concat(this.request.protocol, '://',  this.request.hostname, ':4000');
      },
      CONF_PATH  = './cnblogs.json',
      conf = require(CONF_PATH),
      PUBLIC_KEY = new Buffer(conf.public_key);


function cryptoVal(val) {
    return crypto.publicEncrypt({key: PUBLIC_KEY, padding: crypto.constants.RSA_PKCS1_PADDING}, new Buffer(val)).toString('base64');
}
module.exports = {
    login: function() {
        return function * (next) {
            this.set('Access-Control-Allow-Origin', CORS_URL.call(this));
            this.set('Content-Type', 'application/json');
            // 发起GET请求，获取cookie and VerificationToken
            let config     = {
                cnblogs: {
                    host: 'https://passport.cnblogs.com',
                    url: '/user/signin'
                }
            };

            let options    = {
                url: config.cnblogs.host.concat(config.cnblogs.url),
                header: {
                    'Cookie': ['AspxAutoDetectCookieSupport=1']
                }
            };
            let response = yield request(options);

            // 模拟login
            const {username, password} = {username: this.request.body.username, password: this.request.body.password};
            if(username && password) {
                var responseBody;
                let config     = {
                    cnblogs: {
                        host: 'https://passport.cnblogs.com',
                        url: '/user/signin'
                    }
                };
                let cookies = ['AspxAutoDetectCookieSupport=1'].concat(response.headers['set-cookie']);
                let url = config.cnblogs.host.concat(config.cnblogs.url);
                let options    = {
                    url: url,
                    json: {
                        input1   : cryptoVal(username),
                        input2   : cryptoVal(password),
                        remember : false
                    },
                    method: 'POST',
                    headers: {
                        'Cookie': cookies,
                        'VerificationToken': response.body.match(/'VerificationToken': '([\w:-]*)'\s*}/)[1],
                        'Referer': url,
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                };
                response = yield request(options);
                // update conf
                conf.Cookies = response.headers['set-cookie'];
                fs.writeFileSync(CONF_PATH, JSON.stringify(conf));
                responseBody = response.body;
            } else {
                responseBody = {status: 0, info: '登录失败'};
            }
            this.body = responseBody;
            yield * next;
        }
    },
    feed: {
        recent: function() {
            return function * (next) {
                this.set('Access-Control-Allow-Origin', CORS_URL.call(this));
                var response;
                let config     = {
                    cnblogs: {
                        host: 'https://home.cnblogs.com',
                        url: '/ajax/feed/recent'
                    }
                };
                let options    = {
                    url: config.cnblogs.host.concat(config.cnblogs.url),
                    json: {feedListType: 1, appId: "00000000-0000-0000-0000-000000000000", pageIndex: 1, pageSize: 30},
                    method: 'POST',
                    headers: {
                        'Cookie': conf.Cookies,
                        'Referer': config.cnblogs.host,
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                };
                response = yield request(options);
                this.body = response.body;
                yield * next;
            }
        }
    }
}
