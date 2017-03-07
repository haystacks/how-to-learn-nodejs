var fs     = require('fs');
var page   = require('webpage').create();

page.settings.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';
page.onConsoleMessage = function(msg) {
    console.log(msg);
}
// 地址栏链接变化
page.onUrlChanged = function(targetUrl) {
    console.log('New URL: ' + targetUrl);
};

page.onResourceRequested = function(requestData, networkRequest) {
    console.log('Request (#' + requestData.url + ')');
};
page.open('https://login.m.taobao.com/login.htm?redirectURL=http://www.alimama.com&loginFrom=wap_alimama', function(status) {
    if(status === 'success') {
        var content = page.evaluate(function() {
            var config = {
                "username": "",
                "password": ""
            };
            // 添加上操作事件
            $('#username').val(config.username);
            $('#password').val(config.password);
            $('#submit-btn').click();
            // return document.documentElement.outerHTML;
        });
        // fs.write('./taobao.html', content);
    }
});
