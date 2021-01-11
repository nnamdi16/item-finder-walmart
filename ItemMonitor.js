const axios = require('axios');
const cheerio = require('cheerio');

/**
 * ItemMonitor 
 * @class
 */
class ItemMonitor {
  /**
   * constructor
   * @param {string} searchKeyword  - The search keyword
   */

   constructor(searchKeyword) {
     this.searchKeyword = searchKeyword;

   }

   /**
    * Search Items using keywords
    * @returns {string}
    */
   async searchByKeyword() {
    try {
      const baseUrl =`https://www.walmart.com/search/?query=`;
      const headers = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:85.0) Gecko/20100101 Firefox/85.0" ,'Referer':`${baseUrl}${this.searchKeyword}`}
      const response = await axios.get(`${baseUrl}${this.searchKeyword}`, {headers});
      const {data} = response;
      const $ = cheerio.load(data);
      const searchStringResult = $('#searchContent').get()[0].children[0].data;
      const searchResult = JSON.parse(searchStringResult);
      const {searchContent:{preso:{items}}} = searchResult;

      return items;
      
      
    } catch (error) {
      console.log(error);
    }
   }
}

const data = new ItemMonitor("Shoe");
const result = data.searchByKeyword().then((res) => {
  console.log(res);
});
console.log(result);
