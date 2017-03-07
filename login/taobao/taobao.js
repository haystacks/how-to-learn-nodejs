const request = require('request'),
      fs      = require('fs'),
      form    = require('./config.json');
function ymd() {
    var date = new Date();
    return ''.concat(date.getFullYear(), '-', date.getMonth()+1, '-', date.getDate());
}
let loginUrl = 'https://login.m.taobao.com/login.htm?redirectURL=http://www.alimama.com&loginFrom=wap_alimama';
let validateUrl = 'https://login.m.taobao.com/login.htm?_input_charset=utf-8';

request(loginUrl, function(error, response, body) {
    fs.writeFile('./taobaolog/'+ymd()+'-s.html', body, {'flag': 'w+'});
})
// let options = {
//     method: 'POST',
//     form: form,
//     headers: {
//         "user-agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
//         "referer":"https://login.m.taobao.com/login.htm?redirectURL=http://www.alimama.com&loginFrom=wap_alimama"
//     }
// }

// request.post(validateUrl, options, function(error, response, body) {
//     fs.writeFile('./taobaolog/headers.json', JSON.stringify(response.headers));
// })

/**
_tb_token_: **input[name='_tb_token_']**
action:LoginAction
event_submit_do_login:1
TPL_redirect_url:http://www.alimama.com
loginFrom:wap_alimama
style:
bind_token:
assets_css:
assets_js:
ssottid:
nv:false
otherLoginUrl: **loginUrl** || **input[name='otherLoginUrl']**
TPL_timestamp:
TPL_password2: **input[name='TPL_password2']**需要加密获得自己的数据
ncoSig:
ncoSessionid:
ncoToken: **input[name='ncoToken']**
TPL_username: **input[name='TPL_username']**
ua: *******
 */

/**
 * loginForm
 * 登录操作mlogin.js
 * ① 密码加密 passwordRSA
 */
