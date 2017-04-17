var fs     = require('fs');
var page   = require('webpage').create();

page.settings.userAgent = 'Mozilla/5.0 (Linux; Android 5.1; m2 note Build/LMY47D; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.49 Mobile MQQBrowser/6.2 TBS/043024 Safari/537.36 MicroMessenger/6.5.4.1000 NetType/WIFI Language/zh_CN';
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
    console.log(response.url);
    if(response.url === 'https://login.m.taobao.com/login.htm?_input_charset=utf-8') {
        //console.log('Response (#' + response.id + ', stage "' + response.stage + '"): ' + JSON.stringify(response));
        page.render('./taobaolog/taobao.jpeg', {format: 'jpeg', quality: '100'});
    } else if(response.url === 'http://www.alimama.com/index.htm') {
        //console.log(JSON.stringify(response), JSON.stringify(page.cookies));
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
            var i = 1;
            function touchstart(el, x, y, number, target) {
                var touch = new Touch({
                    identifier: number,
                    target: target,
                    clientX: x,
                    clientY: y
                });
                var event = new TouchEvent('touchstart', {
                    touches: [touch],
                    targetTouches: [touch],
                    changedTouches: [touch],
                });
                el.dispatchEvent(event);
            }

            function ifocus(el) {
                var event = new Event('focus');
                el.dispatchEvent(event);
            }

            function iblur(el) {
                var event = new Event('blur');
                el.dispatchEvent(event);
            }

            setTimeout(function() {
                //touchstart(document, 188, 306, i++, document.getElementById('username'));
                ifocus($('#username')[0]);
                $('#username').val(config.username);
                $('#username').trigger('keyup');
                $('#username').trigger('input');
                iblur($('#username')[0]);
            }, 3e3)
            setTimeout(function() {
                //touchstart(document, 188, 402, i++, document.getElementById('password'));
                ifocus($('#password')[0]);
                $('#password').val(config.password);
                $('#password').trigger('keyup');
                $('#password').trigger('input');
                iblur($('#password')[0]);

                $('#submit-btn').trigger('click');
            }, 5e3)
            // setTimeout(function() {
            //     touchstart(document, 374, 648, i++, document.getElementById('submit-btn'));
            // }, 7e3)
            // return document.documentElement.outerHTML;
        });
        // fs.write('./taobao.html', content);
    }
});
