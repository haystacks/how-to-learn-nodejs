const request = require('request'),
      fs      = require('fs');

let loginUrl = 'https://login.m.taobao.com/login.htm?redirectURL=http://www.alimama.com&loginFrom=wap_alimama';
let validateUrl = 'https://login.m.taobao.com/login.htm?_input_charset=utf-8';

// request(loginUrl, function(error, response, body) {
//   console.log('error:', error);
//   console.log('statusCode:', response && response.statusCode);
//   console.log('body:', fs.writeFile('./taobaolog/20170303.html', body, {'flag': 'w+'}));
// })
let options = {
    method: 'POST'
}
request.post(validateUrl, options, function(error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response.headers, response.statusCode);
})

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
