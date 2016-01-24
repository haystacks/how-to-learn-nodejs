/**
 * 通过URL请求需要的页面数据
 */
'use strict';
let http = require('http');

class Request {
    constructor() {

    }
    // get
    get(url) {
        let promise = http.get(url);
        promise
            .then((res) => {
                console.log(`Got response: ${res.statusCode}`);
                // consume response body
                // res.resume();
                // console.log(res);
                return res;
            })
    }

    // post
    post() {

    }

    // other
}

let r = new Request();
module.exports = {
    get  : r.get,
    post : r.post
}
