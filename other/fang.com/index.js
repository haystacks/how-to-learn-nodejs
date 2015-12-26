/**
 * npm i request cheerio iconv-lite --save
 * www.fang.com
 */
var request = require('request');
var http = require('http');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');// 加载编码转换模块
var fs = require('fs');

/**
 * 按照地铁1号线查看房源
 * 1. 获取地铁站台数据
 */
// var url = 'http://zu.cd.fang.com/house1-j067/';
// var callback = function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//         console.log(iconv.encode(body, 'utf8').toString('binary')); // Show the HTML for the Google homepage.
//     }
// };
// request(url, callback);
http.get("http://zu.cd.fang.com/house1-j067/", function(res) {
  var chunks = [];
  res.on('data', function(chunk) {
    chunks.push(chunk);
  });
  res.on('end', function() {
    var decodedBody = Buffer.concat(chunks);
    fs.writeFile('index.html', decodedBody.toString());
    console.log(decodedBody);
  });
});
