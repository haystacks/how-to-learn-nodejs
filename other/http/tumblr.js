var https = require('https');
var qs = require('querystring');
var fs = require('fs');
var mysql = require('mysql');
var config = {
  host     : '127.0.0.1',
  user     : 'root',
  password : '123456',
  database : 'unofficial'
};

var i = 10;

var postData = qs.stringify({
    q:"美女",
    sort:"top",
    post_view:"masonry",
    blogs_before:"13",
    num_blogs_shown:"8",
    num_posts_shown:"20",
    before:"100",
    blog_page:"2",
    post_page:"2",
    filter_nsfw:"true",
    filter_post_type:"",
    next_ad_offset:"0",
    ad_placement_id:"0",
    more_posts:"true",
});

var options = {
    hostname: 'rpt.cedexis.com',
    path: '/f1/xG4kaMO0ebqyasifcaeqIg0O9@Q9YWyW2A2JSWu4@kQJSWva9VAPZG1keaGeecWyI6SciaaOOOoaOarqafOkcaaqabGaiaaOagabAHnIDxr0B24YlM1Pys5ODI5WCM9Kaaaa/0/0/29581/0/0/2125/0/0',
    method: 'GET',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
};

var _un = {
    "request": function() {
        var req = https.request(options, function(res) {
            var photosStr = '';
            console.log(res.headers);
            res.setEncoding('utf8');
            res.on('data', function(data) {
                photosStr += data;
            }).on('end', function() {
                console.log(photosStr);
                return;
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
        req.on('error', function(e) {
            console.log(e);
        })
        req.write(postData);
        req.end();
    }
}
_un.request();
