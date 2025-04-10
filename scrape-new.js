const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const https = require('https');

puppeteer.use(StealthPlugin());

const scrapeLeclerc = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--window-size=1280,800'
    ]
  });

  const page = await browser.newPage();
  
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36');
  await page.setExtraHTTPHeaders({ 'Accept-Language': 'fr-FR,fr;q=0.9' });
  await page.emulateTimezone('Europe/Paris');
  await page.setViewport({ width: 1280, height: 800 });


  console.log('Starting scrapping...');

  let url = 'https://fd1-courses.leclercdrive.fr/magasin-021701-saint-sulpice-de-royan.aspx'

  console.log('Going to page: '+url);

  await page.goto(url, {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  console.log('Page loaded: '+url);
  console.log('Taking screenshot of loaded page');
  
  // Take a screenshot after 5 sec domconctloaded
  await new Promise(resolve => setTimeout(resolve, 5000));
  await page.screenshot({ path: 'leclerc-screenshot.png', fullPage: true });

  console.log('Screenshot taken successfully');
  
  await browser.close();
};

scrapeLeclerc().catch(err => console.error('❌ Error:', err.message));
