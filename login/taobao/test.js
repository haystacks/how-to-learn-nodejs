var request = require('request');
// var options = {
//     headers: {
//         "X-Requested-With": "XMLHttpRequest",
//         "Cookie": "cookie2=e1f0ef876c4e61946c4928ee3ebbe4c6;"
//     }
// }
// request('http://pub.alimama.com/common/code/getAuctionCode.json?auctionid=545496267635&adzoneid=71160355&siteid=21086165&scenes=1&t=1488855432372&_tb_token_=eab630666ae56&pvid=10_182.151.203.188_799_1488855412195', options, function(err, res, body) {
//     console.log(body);
// })

var options = {
    followRedirects:false,
    headers: {
        'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
    }
}
request('https://a.m.taobao.com/i43657020083.htm?price=13.5-57.5&sourceType=item&ut_sk=1.VsAyyDTk%2F7kDAOBh8dr%2B9RmF_12 278902_1488357680619.Copy.1&cpp=1&shar', options, function(err, res, body) {
    console.log(err);
})
