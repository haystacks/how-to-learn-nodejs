const phantom = require('phantom');

(async function() {
    const instance = await phantom.create();
    const page = await instance.createPage();
    // await page.on("onResourceRequested", function(requestData) {
    //     console.info('Requesting', requestData.url)
    // });
    // await page.on("onResourceReceived", function(responseData) {
    //     console.info('Responsing', responseData.url)
    // });
    await page.on("onUrlChanged", function(targetUrl) {
        console.log('New URL: ' + targetUrl);
    });

    const status = await page.open(process.argv[2]);
    if(status === 'success') {
        // username and password
        $('input[name=username]').val(process.argv[3]);
        $('input[name=password]').val(process.argv[4]);
        if(!$('input[name=remember]').val()) {
            $('input[name=remember]').click();
        }
        // submit
        $('button[type=submit]').click();
    }
    const content = await page.property('content');
    console.log(content);

    await instance.exit();
}());
// node login https://segmentfault.com/user/login ****** ******
