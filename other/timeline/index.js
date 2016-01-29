/**
 * 微博辩论时间线类
 */
'use strict';
let http = require('http');
let url = require('url');
class WeiBian {
    constructor(url) {
        this.x = 1;
        this.y = 2;
        this.url = url;
        // parse the url
        this.parseUrl();
    }

    //parse url
    parseUrl() {
        let urlJson = url.parse(this.url);
        this.hostname = urlJson.hostname;
        this.pathname = urlJson.pathname;
    }

    // request
    request(param) {
        let options = {
            hostname: param.hostname,
            path: param.path,
            headers: {
                'cookie':'SUB=_2AkMh9nhGdcPhrABZn_oXzG_naY5PiV6l55TvKlTsJxEzHhl_7W5l2lZrtRN-XNAPx3-H1Kl_YmFKOrjmorrXR_hn;'
            }
        };

        let req = http.request(options, (res) => {
            console.log(res.statusCode);
            res.on('data', (chunk) => {
                console.log(`BODY: ${chunk}`);
            })
            res.on('end', () => {
                console.log('response end');
            })
        });

        req.end();
    }

    // 转发
    repost() {
        let hostname = this.hostname;
        let path = this.pathname + '?type=repost';
        this.request({hostname: hostname, path: path});
    }

    // 评论
    comment() {

    }

    // 点赞
    like() {

    }

    // 测试
    test() {
        console.log(this.url);
    }
}

var Wb = new WeiBian('http://weibo.com/1761511274/DeyVCxL9Q?type=comment');

Wb.repost();
