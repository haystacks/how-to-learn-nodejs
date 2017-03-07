var request = require('request');
var options = {
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Cookie": "cookie2=b5615543d6ffb967afe9f2379c1a90fe;"
    }
}
request('http://pub.alimama.com/common/code/getAuctionCode.json?auctionid=545496267635&adzoneid=71160355&siteid=21086165&scenes=1&t=1488855432372&_tb_token_=eab630666ae56&pvid=10_182.151.203.188_799_1488855412195', options, function(err, res, body) {
    console.log(body);
})
