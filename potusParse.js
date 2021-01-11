// const rp = require('request-promise');
// const $ = require('cheerio');
const cheerio = require('cheerio');
// const scrapy = require('node-scrapy');
// const fetch = require('node-fetch');
const axios = require('axios');
const jsdom = require('jsdom');
const htmlparser2 = require("htmlparser2");
const $ =  require('cheerio');
const { html } = require('cheerio');

const {JSDOM} = jsdom;



// rp.defaults({
//     timeout: 6000000000000000,
//     proxy:'http://91.198.174.192/443',
//     resolveWithFullResponse:true
// })
const headers = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:85.0) Gecko/20100101 Firefox/85.0" ,'Referer':'https://www.walmart.com/search/?query=Game'}

// const url =  'https://www.walmart.com/search/api/wpa?el=sponsored-container-bottom-1&type=product&min=2&max=20&placementId=1145x345_B-C-OG_TI_2-20_HL-BOTTOM&platform=desktop&bucketId=&moduleLocation=bottom&zipCode=94066&isZipLocated=false&sMode=0&pageType=search&vtc=Q5961pQJ6VhCy5vTT-HP88&uid=42c72381-bfae-4f32-9182-822acc15ce7f&rviItems=&itemsAddedToCart=0&viewportHeight=482&viewportWidth=1788&userLoggedIn=false&showBrand=false&itemsList=23352381,14699300,22223365,334768093,878142,298923226,740300238,33912826,45979108,51404444&pageId=na&pageNumber=1&keyword=Game&taxonomy=4171_4191_2335373_2204878&persistControls=true&isTwoDayDeliveryTextEnabled=true&mloc=bottom&module=wpa'
const url = `https://www.walmart.com/search/?query=Bread`
async function walmart() {
  try {
    const res = await axios.get(url, {
      headers
    });
    const {data} = res;
    const $ = cheerio.load(data);
    const searchStringResult = $('#searchContent').get()[0].children[0].data;
    const result = JSON.parse(searchStringResult);
    const {searchContent:{preso:{items}}} = result;
    return items;
    // console.log($('#searchContent').get()[0].parent.children);
    // console.log(JSON.parse(data));
    
    // let doc = new JSDOM(data,{runScripts: "dangerously",resources: "usable"});
    // const {window} = doc;
    // console.log(window.mainSearchContent);

    // console.table(window);

    // const result = Object.keys(window);
    // const firstBatch = result.slice(0,100);
    // const secondBatch = result.slice(100,200);
    // const thirdBatch = result.slice(200,305);

  //  console.log(firstBatch);
  //  console.log(secondBatch);
  //  console.log(thirdBatch);

  //  console.log(window.Puzzles);


    // console.log(Object.keys(window));
  } catch (error) {
    console.log(error);
  }
}

console.log(walmart().then((result) => {
  console.log(result);
}));




// const potusParse = function (url, model) {
//     try {
//         fetch(url)
//         .then((res) => {
//             console.log(res);
//             return res.text()
//         })
//         .then((body) => {
//             console.log(scrapy.extract(body,model))
//         })
//     } catch (error) {
//         console.log(error);
        
//     }
//     // var options = {
//     //     uri: url,
//     //     transform: function (body) {
//     //         return cheerio.load(body);
//     //     },
//     //     // headers
//     // };
//     // console.log(options);
//     // return rp(options)
//     // .then(function ($) {
//     //     console.log($)
//     //     // Process html like you would with jQuery...
//     // })
//     // .catch(function (err) {
//     //     // Crawling failed or Cheerio choked...
//     // });
//     // console.log(url);
//     // return rp(url)
//     //     .then(function(html) {
//     //         console.log(html);
//     //         return {
//     //             name: $('.visuallyhidden', html).text(),
//     //             // birthday: $('.bday', html).text()
//     //         };
//     //     })
//     //     .catch(function (err) {
//     //         console.log(err);
//     //     })
// }

// const model = '.product-title-link + .line-clamp + .line-clamp-2 + .truncate-title'
// potusParse('https://www.walmart.com/search/?query=Game', model);


// module.exports = potusParse;