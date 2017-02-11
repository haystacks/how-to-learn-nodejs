'use strict';
const request   = require('koa-request'),
      fs        = require('fs'),
      crypto    = require('crypto'),
      zlib      = require('zlib'),
      CORS_URL  = 'http://192.168.0.5:4000',
      CONF_PATH = './config.json';

let conf        = require(CONF_PATH);
function md5 (text) {
    return crypto.createHash('md5').update(text).digest('hex');
}

module.exports = {
    qrcode: function() {
        return function * (next) {
            this.set('Access-Control-Allow-Origin', CORS_URL);
            this.set('Content-Type', 'application/json');
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
            // update conf
            conf = options.headers;
            fs.writeFileSync(CONF_PATH, JSON.stringify(conf));
            var response = yield request(options);
            this.body = {
                status: 1,
                data: ['data:image/jpg;base64,', response.body.toString('base64')].join('')
            };
            yield * next;
        }
    },
    ask: function() {
        return function * (next) {
            this.set('Access-Control-Allow-Origin', CORS_URL);
            this.set('Content-Type', 'application/json');
            /**
             *
             * referer
             * cookie
             */
            let config     = {
                weixin: {
                    host: 'https://mp.weixin.qq.com',
                    url: '/cgi-bin/loginqrcode?action=ask&token=&lang=zh_CN&f=json&ajax=1&random=' + Math.random()
                }
            };
            let options = {
                url: config.weixin.host.concat(config.weixin.url),
                headers: {
                    Referer: conf.Referer,
                    Cookie: conf.Cookie
                }
            };
            var response = yield request(options);
            this.body = response.body;
            yield * next;
        }
    },
    bizlogin: function() {
        return function * (next) {
            this.set('Access-Control-Allow-Origin', CORS_URL);
            this.set('Content-Type', 'application/json');
            /**
             *
             * referer
             * cookie
             */
            let config     = {
                weixin: {
                    host: 'https://mp.weixin.qq.com',
                    url: '/cgi-bin/bizlogin?action=login&token=&lang=zh_CN'
                }
            }
            let cookie = conf.Cookie;
            cookie.push("ua_id=bGKidnPpZI0ltjXcAAAAAMesI7DACNSAqNcxqlCZlRA; Path=/; Expires=Tue, 19-Jan-2038 03:14:07 GMT; Secure; HttpOnly");
            let options = {
                url: config.weixin.host.concat(config.weixin.url),
                form: {
                    token: '',
                    lang: 'zh_CN',
                    f: 'json',
                    ajax: 1,
                    random: Math.random()
                },
                method: 'POST',
                headers: {
                    Referer: conf.Referer,
                    Cookie: cookie
                }
            };
            var response = yield request(options);
            // update conf
            conf.Cookies = response.headers['set-cookie'];
            conf.Referers = JSON.parse(response.body).redirect_url;
            fs.writeFileSync(CONF_PATH, JSON.stringify(conf));
            this.body = response.body;
            yield * next;
        }
    },
    search: {
        userTag: function() {
            return function * (next) {
                this.set('Access-Control-Allow-Origin', CORS_URL);
                this.set('Content-Type', 'application/json');
                /**
                 *
                 * referer
                 * cookie
                 */
                let config     = {
                    weixin: {
                        host: 'https://mp.weixin.qq.com',
                        url: '/cgi-bin/user_tag?action=search',
                        referer: conf.Referers
                    }
                };
                let options = {
                    url: config.weixin.host.concat(config.weixin.url),
                    form: {
                        token: conf.Referers.match(/\d+/)[0],
                        lang: 'zh_CN',
                        f: 'json',
                        ajax: 1,
                        random: Math.random(),
                        pagesize: 20,
                        pageidx: 0,
                        query: this.request.body.user_tag
                    },
                    method: 'POST',
                    headers: {
                        Referer: config.weixin.host.concat(config.weixin.referer),
                        Cookie: conf.Cookies
                    }
                };
                var response = yield request(options);
                this.body = response.body;
                yield * next;
            }
        }
    },
    message: {
        list: function() {
            return function * (next) {
                this.set('Access-Control-Allow-Origin', CORS_URL);
                this.set('Content-Type', 'application/json');
                /**
                 *
                 * referer
                 * cookie
                 */
                let config     = {
                    weixin: {
                        host: 'https://mp.weixin.qq.com',
                        url: '/cgi-bin/message?t=message/list&count=20&day=7&token='+ conf.Referers.match(/\d+/)[0]
                    }
                };
                let options = {
                    url: config.weixin.host.concat(config.weixin.url),
                    headers: {
                        Cookie: conf.Cookies
                    }
                };
                var response = yield request(options);
                this.body = response.body.match(/list : \((.*)\).msg_item/)[1];
                yield * next;
            }
        },
        response: function() {
            return function * (next) {
                // 测试msg
                let msg = {
                    fakeid: 'o8dqJs7Ix6OScJ-XUTal0raHtLhs',
                    response: '你好'
                };
                this.set('Access-Control-Allow-Origin', CORS_URL);
                this.set('Content-Type', 'application/json');
                /**
                 *
                 * referer
                 * cookie
                 */
                let config     = {
                    weixin: {
                        host: 'https://mp.weixin.qq.com',
                        url: '/cgi-bin/singlesend?t=ajax-response&f=json&lang=zh_CN&token='+ conf.Referers.match(/\d+/)[0]
                    }
                };
                let options = {
                    url: config.weixin.host.concat(config.weixin.url),
                    form: {
                        token: conf.Referers.match(/\d+/)[0],
                        lang: 'zh_CN',
                        f: 'json',
                        ajax: 1,
                        random: Math.random(),
                        type: 1,
                        content: msg.response,
                        tofakeid: msg.fakeid,
                        imgcode: ''
                    },
                    method: 'POST',
                    headers: {
                        Referer: config.weixin.host.concat('/cgi-bin/singlesendpage?t=message/send&action=index&tofakeid=', msg.fakeid, '&token=', conf.Referers.match(/\d+/)[0], '&lang=zh_CN'),
                        Cookie: conf.Cookies
                    }
                };
                var response = yield request(options);
                this.body = response.body;
                yield * next;
            }
        }
    }
}
