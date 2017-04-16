const phantom = require('phantom');

(async function() {
    const instance = await phantom.create();
    const page = await instance.createPage();
    await page.on("onResourceRequested", function(requestData) {
        //console.info('Requesting', requestData.url)
    });

    const status = await page.open('https://www.baidu.com/');
    console.log(status);

    const content = await page.property('content');
    //console.log(content);

    await instance.exit();
}());

console.log(123);
