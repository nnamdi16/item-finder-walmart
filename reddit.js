const puppeteer = require('puppeteer');
const rp = require('request-promise');
const url = 'https://www.reddit.com';

// rp(url)
//     .then(function (html) {
//         //success
//         console.log(html);
//     })
//     .catch(function(err) {
//         //handle error
//         console.log(err)
//     })

puppeteer
    .launch()
    .then(function (browser) {
        return browser.newPage();
    })
    .then(function (page) {
        return page.goto(url)
        .then(function () {
            return page.content();
        });
    })
    .then(function (html) {
        console.log(html);
    })
    .catch(function (err) {
        //handle error
        return err
    })