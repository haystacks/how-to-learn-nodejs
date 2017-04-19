function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// async function sleep(ms, next) {
//     await timeout(ms);
//     await next();
// }

module.exports = timeout;
