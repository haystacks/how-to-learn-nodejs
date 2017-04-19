const phantom = require('phantom');

(async function() {

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function sleep(ms) {
    await timeout(ms);
}

module.exports = timeout;
    const instance = await phantom.create();
    const page = await instance.createPage();
    page.setting('userAgent', 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36');
    await page.on("onResourceRequested", function(requestData) {
        // console.info('Requesting', requestData.url)
    });
    await page.on("onResourceReceived", function(responseData) {
        // console.info('Responsing', responseData.url)
    });
    await page.on("onUrlChanged", function(targetUrl) {
        console.log('New URL: ' + targetUrl);
    });
    const status = await page.open(process.argv[2]);
    await page.includeJs('https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js');
    await page.evaluate(function() {
        if(status === 'success') {
            // username and password
            $('input[name=username]').val(process.argv[3]);
            $('input[name=password]').val(process.argv[4]);
            if(!$('input[name=remember]').val()) {
                $('input[name=remember]').click();
            }
            // submit
            $('button[type=submit]')[0].click();
        }
    });
    await page.render('a.png');
    // const content = await page.property('content');
    // console.log(content);

    // sleep(2000);
    await instance.exit();
}());
// node login https://segmentfault.com/user/login ****** ******
