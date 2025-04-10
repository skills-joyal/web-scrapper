const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const https = require('https');

puppeteer.use(StealthPlugin());

const userAgents = [
  // Windows - Chrome
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',

  // Windows - Firefox
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0',

  // Windows - Edge
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 Edg/123.0.0.0',

  // macOS - Chrome
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_3_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',

  // macOS - Safari
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_3_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Safari/605.1.15',

  // Linux - Chrome
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',

  // Linux - Firefox
  'Mozilla/5.0 (X11; Linux x86_64; rv:124.0) Gecko/20100101 Firefox/124.0',

  // Android - Chrome
  'Mozilla/5.0 (Linux; Android 12; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Mobile Safari/537.36',

  // iPhone - Safari
  'Mozilla/5.0 (iPhone; CPU iPhone OS 16_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Mobile/15E148 Safari/604.1',

  // iPad - Safari
  'Mozilla/5.0 (iPad; CPU OS 16_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Mobile/15E148 Safari/604.1'
];
const getRandomUserAgent = () =>
  userAgents[Math.floor(Math.random() * userAgents.length)];

const countdown = async (seconds, where) => {
  for (let i = seconds; i > 0; i--) {
    if(where == 'inital'){
      console.log(`Going to page in ${i}...`);
    } else if(where == 'wait'){
      console.log(`Wait for ${i} sec...`);
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
};

const scrapeLeclerc = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--window-size=1280,800',
      '--use-fake-ui-for-media-stream',
    ]
  });

  const context = browser.defaultBrowserContext();
  await context.overridePermissions('https://fd1-courses.leclercdrive.fr', ['geolocation']);

  const page = await browser.newPage();

  // Block unnecessary resources (ads, fonts, etc.)
  // await page.setRequestInterception(true);
  // page.on('request', (req) => {
  //   const blockedTypes = ['stylesheet', 'font', 'image', 'media', 'xhr'];
  //   if (blockedTypes.includes(req.resourceType())) {
  //     req.abort();
  //   } else {
  //     req.continue();
  //   }
  // });
  
  // await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36');
  await page.setUserAgent(getRandomUserAgent());
  await page.setExtraHTTPHeaders({ 'Accept-Language': 'fr-FR,fr;q=0.9' });
  await page.emulateTimezone('Europe/Paris');
  await page.setViewport({ width: 1280, height: 800 });

  // Set geolocation and timezone (Paris, France)
  await page.emulateTimezone('Europe/Paris');
  await page.setGeolocation({ latitude: 48.8566, longitude: 2.3522 });


  console.log('Starting scrapping...');
  // let url = 'https://www.cricbuzz.com/'
  let url = 'https://fd1-courses.leclercdrive.fr/magasin-021701-saint-sulpice-de-royan.aspx'
  await countdown(2, 'inital');
  console.log('Page URL: '+url);

  const response = await page.goto(url, {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });
  
  console.log('Page loading process completed: '+url);
  console.log(response);
  console.log(response?.status());
  console.log(response?.url());
  console.log('Taking screenshot of loaded page');

  // wait for 3 sec and scrolling webpage for non detection for bot
  await countdown(3, 'wait');
  await page.evaluate(() => {
    window.scrollBy(0, 2500);
  });

  // Take a screenshot after 5 sec domconctloaded
  await new Promise(resolve => setTimeout(resolve, 5000));
  await page.screenshot({ path: 'leclerc-screenshot.png', fullPage: true });

  console.log('Screenshot taken successfully');
  
  await browser.close();
};

scrapeLeclerc().catch(err => console.error('❌ Error:', err.message));
