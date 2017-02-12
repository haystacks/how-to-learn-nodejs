const request = require('koa-request');
module.exports = {
    do: function() {
        return function * (next) {
            let options    = {
                url: 'http://m135751.nofollow.ax.mvote.cn/op.php',
                form: {
                    action: 'dovote',
                    guid: '2550a478-e48e-c80f-971f-86b4e631c822',
                    ops: '2550621',
                    wxparam: 'oNrjcvjaux5Li4qwg-UEEWfwJ8TY|2550a478-e48e-c80f-971f-86b4e631c822|839052cce69f058f1af98f938b9d3320|vote'
                },
                method: 'POST'
            };
            let response = yield request(options);
            this.body = response.body;
            yield * next;
        }
    }
}
