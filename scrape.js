// const puppeteer = require('puppeteer'); 
// const PDFDocument = require('pdfkit'); 
// const fs = require('fs');

// (async () => {
//     try {
//         // Define the URL to scrape
//         const url = 'https://www.gadgets360.com/mobiles/nubia-phones';
//         // const url = 'https://fd1-courses.leclercdrive.fr/magasin-021701-Saint-Sulpice-de-Royan/recherche.aspx?TexteRecherche=lustucru';

//         console.log("Launching browser...");
//         const browser = await puppeteer.launch({ headless: true });
//         const page = await browser.newPage();

//         console.log(`Navigating to URL: ${url}`);
//         let response = await page.goto(url, { waitUntil: 'domcontentloaded' });
//         console.log(response);
//         console.log("Response Status:", response.status());  // HTTP Status Code
//         console.log("Response URL:", response.url());  // Final URL after redirections
//         console.log("Headers:", response.headers());  // Response headers
        
//         // Define the selector
//         const selector = 'body > div.wrapper > div.row.white_bg > div > div.rhs.clearfix > div.content_section > div.content_block.row.margin_b30 > div.brand_detail > div.brant_content.clearfix'; 
//         // const selector = 'body > form#aspnetForm.drive:nth-child(1) > div:nth-child(17) > div:nth-child(14) > div.cssMaster:nth-child(3) > div.cssMaster_main > div.cssMaster_content.clearfix.nocarrousel:nth-child(2) > section#sectionWCRS001_MainContent.clearfix > div#divContenuCentre.divWCRS001_ColonnePrincipale:nth-child(2) > div#divWCRS310_ProductsList.divWCRS310_ProductsList:nth-child(2) > div#ctl00_ctl00_mainMutiUnivers_main_ctl04_pnlElementProduit > ul#ulListeProduits.avec-corner > li#sId5.liWCRS310_Product.colonne1.ligne1.corner-haut-gauche:nth-child(1) > div.divWCRS310_Content:nth-child(2) > p.pWCRS310_Desc:nth-child(1) > a.aWCRS310_Product:nth-child(1)';
//         console.log("Evaluating page...");

//         const data = await page.evaluate((sel) => {
//             const element = document.querySelector(sel);
//             return element ? element.innerText : 'No content found';
//         }, selector);

//         console.log("Scraped Data:\n", data);

//         await browser.close();

//         // Create a PDF document
//         const doc = new PDFDocument();
//         const pdfFileName = 'scraped_data1.pdf';
//         const writeStream = fs.createWriteStream(pdfFileName);

//         doc.pipe(writeStream);
//         doc.fontSize(14).text('Scraped Data from Website', { align: 'center' });
//         doc.moveDown();
//         doc.fontSize(12).text(data);
//         doc.end();

//         writeStream.on('finish', () => {
//             console.log(`Data saved to PDF: ${pdfFileName}`);
//         });

//     } catch (error) {
//         console.error("An error occurred:", error.message);
//     }
// })();

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// const puppeteer = require('puppeteer-extra');
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// const PDFDocument = require('pdfkit');
// const fs = require('fs');

// // Add stealth plugin
// puppeteer.use(StealthPlugin());

// (async () => {
//     try {
//         // const url = 'https://www.gadgets360.com/mobiles/nubia-phones';
//         const url = 'https://fd1-courses.leclercdrive.fr/magasin-021701-Saint-Sulpice-de-Royan/recherche.aspx?TexteRecherche=lustucru';
        
//         console.log("Launching browser with stealth plugin...");
//         const browser = await puppeteer.launch({ headless: true });
//         const page = await browser.newPage();

//         console.log(`Navigating to URL: ${url}`);
//         let response = await page.goto(url, { waitUntil: 'domcontentloaded' });

//         console.log("Response Status:", response.status());
//         console.log("Response URL:", response.url());
//         console.log("Headers:", response.headers());

//         // const selector = 'body > div.wrapper > div.row.white_bg > div > div.rhs.clearfix > div.content_section > div.content_block.row.margin_b30 > div.brand_detail > div.brant_content.clearfix';
//         const selector = 'body > form#aspnetForm.drive:nth-child(1) > div:nth-child(17) > div:nth-child(14) > div.cssMaster:nth-child(3) > div.cssMaster_main > div.cssMaster_content.clearfix.nocarrousel:nth-child(2) > section#sectionWCRS001_MainContent.clearfix > div#divContenuCentre.divWCRS001_ColonnePrincipale:nth-child(2) > div#divWCRS310_ProductsList.divWCRS310_ProductsList:nth-child(2) > div#ctl00_ctl00_mainMutiUnivers_main_ctl04_pnlElementProduit > ul#ulListeProduits.avec-corner > li#sId5.liWCRS310_Product.colonne1.ligne1.corner-haut-gauche:nth-child(1) > div.divWCRS310_Content:nth-child(2) > p.pWCRS310_Desc:nth-child(1) > a.aWCRS310_Product:nth-child(1)';

//         console.log("Evaluating page...");
//         const data = await page.evaluate((sel) => {
//             const element = document.querySelector(sel);
//             return element ? element.innerText : 'No content found';
//         }, selector);

//         console.log("Scraped Data:\n", data);

//         await browser.close();

//         const doc = new PDFDocument();
//         const pdfFileName = 'scraped_data1.pdf';
//         const writeStream = fs.createWriteStream(pdfFileName);

//         doc.pipe(writeStream);
//         doc.fontSize(14).text('Scraped Data from Website', { align: 'center' });
//         doc.moveDown();
//         doc.fontSize(12).text(data);
//         doc.end();

//         writeStream.on('finish', () => {
//             console.log(`Data saved to PDF: ${pdfFileName}`);
//         });

//     } catch (error) {
//         console.error("An error occurred:", error.message);
//     }
// })();


const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://www.google.com/',
  });

  await page.setViewport({ width: 1366, height: 768 });

  // Visit homepage to establish cookies/session
  await page.goto('https://fd1-courses.leclercdrive.fr/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const response = await page.goto('https://fd1-courses.leclercdrive.fr/magasin-021701-Saint-Sulpice-de-Royan/recherche.aspx?TexteRecherche=lustucru', { waitUntil: 'domcontentloaded' });
  console.log("Response Status:", response.status());

  // Continue scraping...
})();
