var fs     = require('fs');
var page   = require('webpage').create();

page.settings.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';
page.onConsoleMessage = function(msg) {
    console.log(msg);
}
page.open('https://login.m.taobao.com/login.htm?redirectURL=http://www.alimama.com&loginFrom=wap_alimama', function(status) {
    console.log(status);
    if(status === 'success') {
        var content = page.evaluate(function() {
            var config = {
                "username": "",
                "password": ""
            };

            $('#username').val(config.username);
            $('#password').val(config.password);
            $('#submit-btn').click();
            // return document.documentElement.outerHTML;
        });
        loadInProgress = true;
        // fs.write('./taobao.html', content);
    }
    phantom.exit();
});
