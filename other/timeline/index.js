/**
 * 微博辩论时间线类
 */
'use strict';
let request = require('./request');
class WeiBian {
    constructor(url) {
        this.x = 1;
        this.y = 2;
        this.url = url;
    }

    // 微博原文
    content() {
        let res = request.get(this.url);
    }

    // 转发
    repost() {
        console.log(this.x, this.y);
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

var Wb = new WeiBian('http://weibo.com/1761511274/DeyVCxL9Q');
Wb.test();
Wb.content();
