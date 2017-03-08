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
    if(requestData.url === 'https://login.m.taobao.com/login.htm?_input_charset=utf-8')
        console.log('Request (#' + requestData.url + ')');
};
page.onResourceReceived = function(response) {
    if(response.url === 'https://login.m.taobao.com/login.htm?_input_charset=utf-8') {
        console.log('Response (#' + response.id + ', stage "' + response.stage + '"): ' + JSON.stringify(response));
        page.render('./taobaolog/taobao.jpeg', {format: 'jpeg', quality: '100'});
    } else if(response.url === 'http://www.alimama.com/index.htm') {
        console.log(JSON.stringify(response), JSON.stringify(page.cookies));
        page.render('./taobaolog/alimama.jpeg', {format: 'jpeg', quality: '100'});
    }
};
page.open('https://login.m.taobao.com/login.htm?redirectURL=http://www.alimama.com&loginFrom=wap_alimama', function(status) {
    if(status === 'success') {
        var content = page.evaluate(function() {
            var config = {
                "username": "",
                "password": ""
            };
            // 添加上操作事件
            $('#UA_InputId').val('');
            $('#username').val(config.username);
            $('#password').val(config.password);
            // 解除btn的disabled
            $('#username').trigger('input');
            $('#submit-btn').trigger('click');
            // return document.documentElement.outerHTML;
        });
        // fs.write('./taobao.html', content);
    }
});
