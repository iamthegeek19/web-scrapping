const express = require('express');
// const cheerio = require('cheerio');
// const axios = require('axios');
const puppeteer = require('puppeteer');
const PORT = 8080;
const app = express();


const scrap = async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.goto('https://books.toscrape.com/');

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});
   
  const result = await page.evaluate(() => Array.from(document.querySelectorAll('ul.nav.nav-list li ul li a'), (item) => {
       return {
         bookName: item.innerText,
         bookLink: item.getAttribute('href')
       }
  }));

  // console.log(result);
  
  await browser.close();
  return result;
};

app.get('/', async (req,res) => {
   const result = await scrap();
   console.log(result);
   res.json(result);
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`))



// axios('https://books.toscrape.com/').then(response => {
//   const html = response.data;
//   const $ = cheerio.load(html);
//   const data = [];
//    $('ul.nav.nav-list li a', html).each(() => {
//      const result = $(this).text();
//      data.push({
//         result
//      })
//  })
//   console.log(data.length)
// }).catch(e => console.error(e))

