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
    hostname: 'www.tumblr.com',
    path: '/search/%E7%BE%8E%E5%A5%B3/post_page/3?sort=top&filter_post_type=any&before=0&json=1',
    method: 'GET',
    port: 443,
    headers: {
        'Content-Type':"application/x-www-form-urlencoded; charset=UTF-8",
        'user-agent':'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_2_1 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8C148 Safari/6533.18.5',
        'x-requested-with':'XMLHttpRequest'
    },
};

var _un = {
    "request": function() {
        var req = https.request(options, function(res) {
            var photosStr = '';
            res.setEncoding('utf8');
            res.on('data', function(data) {
                photosStr += data;
            }).on('end', function() {
                var photosJson = JSON.parse(photosStr.replace(/[\(\)]/g, ''));
                console.log(photosJson.posts[0].photo);
                // //
                // var userInfoSqlStr = '';
                // var photosSqlStr = '';
                // var photos = photosJson.data.photos;
                // for (var j in photos) {
                //     userInfoSqlStr = (userInfoSqlStr ? userInfoSqlStr + ',' : '') + '('+ photos[j].uid +', "'+ photos[j].user_info.name +'", "'+ photos[j].user_info.profile_image_url +'", '+ photos[j].user_info.verified +')';
                //     photosSqlStr = (photosSqlStr ? photosSqlStr + ',' : '') + '('+ photos[j].uid +', "'+ photos[j].photo_id +'", "'+ photos[j].album_id +'", "'+ photos[j].pid +'", "'+ photos[j].pic_host +'", "'+ photos[j].pic_name +'")';
                // }
                // var connection = mysql.createConnection(config);
                // connection.connect();
                // var sqls = [];
                // sqls.push('insert into user_info(uid, name, profile_image_url, verified) value'+ userInfoSqlStr);
                // sqls.push('insert into photos(uid, photo_id, album_id, pid, pic_host, pic_name) value'+ photosSqlStr);

                // for (var j in sqls) {
                //     connection.query(sqls[j], function(err, result) {
                //         if(err) throw err;
                //         console.log(result.insertId);
                //     });
                // }

                // connection.end();
                //重置options
                options.path = photosJson.next_page;
                options[':path'] = photosJson.next_page;
                if(i < 11) {
                    _un.request();
                    i++;
                }
            })
        })

        //error
        req.on('error', function(e) {
            console.log(e);
        })
        //req.write(postData);
        req.end();
    }
}
_un.request();
