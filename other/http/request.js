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
        'cookie': 'SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WhhGLkbBpAjVffMxyxzRLU-5JpX5KMt; UOR=y.qq.com,widget.weibo.com,login.sina.com.cn; SINAGLOBAL=2770940724051.5537.1446041652234; ULV=1449377398068:4:2:1:5517820837053.652.1449377397935:1448922623247; SUHB=0BLoVnFfOaRfY0; un=sfanr@sina.com; wvr=6; SUS=SID-3872204553-1449377391-GZ-6yi5k-f91f09a9f3282889dcf578bb7b117c8e; SUE=es%3D303860cc57356169bc154ee2ce6148df%26ev%3Dv1%26es2%3D2a9d012152c37a52c5773671b3573273%26rs0%3DkKpEHynJIuCGvswj0kObI7%252BNZpSLRL3ZDdZEYbu1oI7RQ595JUMRJuJ3au25s%252FE2rqhAaYeuFQ3dVApl2W7gWv5EBlqHKpC%252BLgBKmbzh0LRwDXYxWGOrbPfx96%252F9zM%252F97UISE07v3ztcqVzb%252FEyxXkdLIgj1dCuCwerpuXtESu8%253D%26rv%3D0; SUP=cv%3D1%26bt%3D1449377391%26et%3D1449463791%26d%3Dc909%26i%3D7c8e%26us%3D1%26vf%3D0%26vt%3D0%26ac%3D2%26st%3D0%26uid%3D3872204553%26name%3Dsfanr%2540sina.com%26nick%3D%25E7%2594%25A8%25E6%2588%25B73872204553%26fmp%3D%26lcp%3D; SUB=_2A257Z84_DeRxGeVG7FAT8CrJzj-IHXVYFLj3rDV8PUNbvtBeLUn8kW8R_YsRtP0ZvEd1dPKj19jr-fu82Q..; ALF=1480913390; SSOLoginState=1449377391; _s_tentry=login.sina.com.cn; Apache=5517820837053.652.1449377397935; USRANIME=usrmdinst_20; WBStore=5955be0e3d5411da|undefined',
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
