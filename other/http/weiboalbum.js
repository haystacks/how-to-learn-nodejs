var http = require('http');
var qs = require('querystring');

var postData = qs.stringify({
    album_name:'测试1',
    album_describe:'测试1',
    property:1,
    question:'',
    answer:'',
});

var options = {
    hostname: 'm.weibo.cn',
    path: '/album/addAlbum',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin':'http://m.weibo.cn',
        'Referer':'http://m.weibo.cn/album',
        'cookie': 'SUB=_2A257d-vjDeTxGedJ7loQ8C3EyDmIHXVYm_WrrDV6PUJbrdBeLRnfkW0f0a_RHCXtsrF64-sbjAbAq-89cQ..; expires=Saturday, 17-Dec-16 05:37:55 GMT; path=/; domain=.weibo.cn;httponly',
    },
};

var _un = {
    "request": function() {
        var req = http.request(options, function(res) {
            var photosStr = '';
            console.log(res.headers);
            res.setEncoding('utf8');
            res.on('data', function(data) {
                photosStr += data;
            }).on('end', function() {
                console.log(photosStr);
                console.log('123\n\r');
            })
        })

        //error
        req.on('error', function() {
            console.log('has an error');
        })

        req.write(postData);
        req.end();
    }
}
_un.request();
