const puppeteer = require('puppeteer');
const express = require('express');

//initialisation
const app = express();
const PORT = 8000;

const scrap = async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.goto('https://quotes.toscrape.com/');
  // Set screen size
  await page.setViewport({width: 1080, height: 1024});
  
  const result = await page.$eval('div.col-md-4.tags-box span.tag-item', function(quotes) {
      return quotes.innerText;
  });

  console.log(result)
  return result;
  await browser.close();
};

scrap();

app.get('/', async (req,res) => {
    const data = await scrap();
    res.json(data);
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`))


// const puppeteer = require('puppeteer');
// const express = require('express');

// //initialisation
// const app = express();
// const PORT = 8000;

// app.get('/', async (req,res) => {
//     const browser = await puppeteer.launch({headless: false});
//     const page = await browser.newPage();
  
//     await page.goto('https://www.imdb.com/chart/top/');
//     // Set screen size
//     await page.setViewport({width: 1080, height: 1024});
  
//     const result = await page.$$eval('h1', );
//     res.json(result)
    
//     await browser.close();
//   })

// app.listen(PORT, () => console.log(`server running on port ${PORT}`))