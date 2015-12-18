var http = require('http');
var qs = require('querystring');
var mysql = require('mysql');
var config = {
  host     : '127.0.0.1',
  user     : 'root',
  password : '123456',
  database : 'unofficial'
};

var i = 10;
//queryString
var queryConfig = {
    tag: '美女',
    count: 50,
    page: 1,
    type: 'best',
    rid: '',
    __rnd: new Date().getTime(),
};

var options = {
    hostname: 'photo.weibo.com',
    path: '/tags/get_photos_by_tag_name?' + qs.stringify(queryConfig),
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'cookie': 'SUB=_2A257d-vjDeTxGedJ7loQ8C3EyDmIHXVYm_WrrDV6PUJbrdBeLRnfkW0f0a_RHCXtsrF64-sbjAbAq-89cQ..; expires=Saturday, 17-Dec-16 05:37:55 GMT; path=/; domain=.weibo.cn;httponly',
    },
};

var _un = {
    "request": function() {
        var req = http.request(options, function(res) {
            var photosStr = '';
            //console.log(res.statusCode);
            res.setEncoding('utf8');
            res.on('data', function(data) {
                photosStr += data;
            }).on('end', function() {
                var photosJson = JSON.parse(photosStr);
                // //
                var userInfoSqlStr = '';
                var photosSqlStr = '';
                var photos = photosJson.data.photos;
                for (var j in photos) {
                    userInfoSqlStr = (userInfoSqlStr ? userInfoSqlStr + ',' : '') + '('+ photos[j].uid +', "'+ photos[j].user_info.name +'", "'+ photos[j].user_info.profile_image_url +'", '+ photos[j].user_info.verified +')';
                    photosSqlStr = (photosSqlStr ? photosSqlStr + ',' : '') + '('+ photos[j].uid +', "'+ photos[j].photo_id +'", "'+ photos[j].album_id +'", "'+ photos[j].pid +'", "'+ photos[j].pic_host +'", "'+ photos[j].pic_name +'")';
                }
                var connection = mysql.createConnection(config);
                connection.connect();
                var sqls = [];
                sqls.push('insert into user_info(uid, name, profile_image_url, verified) value'+ userInfoSqlStr);
                sqls.push('insert into photos(uid, photo_id, album_id, pid, pic_host, pic_name) value'+ photosSqlStr);

                for (var j in sqls) {
                    connection.query(sqls[j], function(err, result) {
                        if(err) throw err;
                        console.log(result.insertId);
                    });
                }

                connection.end();
                console.log('rid: ' + photosJson.data.rid);
                queryConfig.rid = photosJson.data.rid;
                //重置options
                options.path = '/tags/get_photos_by_tag_name?' + qs.stringify(queryConfig);
                if(i < 50) {
                    _un.request();
                    i++;
                }
            })
        })

        //error
        req.on('error', function() {
            console.log('has an error');
        })

        req.end();
    }
}
_un.request();
