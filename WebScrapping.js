const rp = require('request-promise');
const $ = require('cheerio');
const potusParse = require('./potusParse');
const url = 'https://www.walmart.com/search/?query=card';
// var reqPromise = rp({
//     method: 'get',
//     uri: 'http://localhost:8080/test-connection-length',
//     timeout: 600000, // 10 min.
//     resolveWithFullResponse: true
// });

// rp.defaults({
//     timeout: 6000000000000000,
//     proxy:'http://91.198.174.192/443',
//     resolveWithFullResponse:true
// })
rp(url)
  .then(function(html){
    //success!
    const wikiUrls = [];
    const scrapeLength = $('product-title-link', html).length;
    // const searchTest = '/wiki/';
    
    for (let i = 0; i < scrapeLength; i++) {
        const searchKeyword = $('product-title-link',html)[i].attribs.href;
        if (/^\/wiki\//.test(searchKeyword) && !searchKeyword.includes("States")) {
            wikiUrls.push($('b > a',html)[i].attribs.href);  
        }
        
    }
    console.log(wikiUrls);
    // console.log(wikiUrls.length);
    return Promise.all (
        wikiUrls.map(function (url) {
           
            const result = potusParse(`https://en.wikipedia.org${url}`);
            return result;
        })
    );
    // console.log($('b > a', html));
    // console.log($('b > a', html).length);
  }).then(function (presidents) {
      
      presidents = presidents.filter((element) => element !== undefined);
      console.log(presidents);
      console.log(presidents.length);
  })
  .catch(function(err){
    //handle error
    console.log(err);
  });