// var child = require('child_process');
// var s = child.execSync('./phantomjs baidu.js');

// console.log(s);
// https://github.com/amir20/phantomjs-node
// https://github.com/casperjs/casperjs
const phantom = require('phantom');

var rs = (async function() {
    const instance = await phantom.create();
    const page = await instance.createPage();
    await page.on("onResourceRequested", function(requestData) {
        console.info('Requesting', requestData.url)
    });

    const status = await page.open('https://stackoverflow.com/');
    console.log(status);

    const content = await page.property('content');
    // console.log(content);

    await instance.exit();
    return status;
}());

rs.then(function(e) {
    console.log(e);
})

