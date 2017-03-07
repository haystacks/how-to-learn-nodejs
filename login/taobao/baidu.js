/**
 * 模拟登录淘宝之前测试phantom.js的api
 *
 */

var page = require('webpage').create();
// 浏览器打开，还没输入网址。适合用来修改全局对象
page.onInitialized = function() {
    page.evaluate(function() {
        document.addEventListener('DOMContentLoaded', function() {
            console.log(this.documentURI, 'DOM content has loaded.');
        }, false);
    });
};

// 输出 console 调试信息
page.onConsoleMessage = function(msg) {
    console.log(msg);
}

// 加载结束，可以看着是open的钩子函数
page.onLoadFinished = function (status) {
    console.log('Status: ' + status);
    page.evaluate(function() {
        if(window.location.href !== 'https://www.baidu.com/') {
            window.location.href = "https://www.baidu.com/";
        }
    })
    // Do other things here...
};

// 输入URL开始加载了
page.onLoadStarted = function () {
    var currentUrl = page.evaluate(function () {
        return window.location.href;
    });
    console.log('Current page ' + currentUrl + ' will gone...');
};

// 地址栏链接变化
page.onUrlChanged = function(targetUrl) {
    console.log('New URL: ' + targetUrl);
};

page.open('https://www.taobao.com', function(status) {
    if(status === 'success') {
        // console.log(JSON.stringify(page.cookies));
        // phantom.exit(0);
    }
})
