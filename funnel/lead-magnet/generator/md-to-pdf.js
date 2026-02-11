const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const TRIPWIRE_DIR = '/Users/jmodigital/clawd/projects/utility-website-portfolio/sleepsmarter.io/funnel/tripwire';
const OUTPUT_DIR = path.join(TRIPWIRE_DIR, 'pdf-output');

const files = [
  '7-day-sleep-reset-protocol.md',
  'emergency-sleep-protocol.md',
  'environment-checklist.md',
  'sleep-tracking-templates.md',
  'supplement-timing-guide.md'
];

const CSS = `
body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.7; color: #1a1a2e; max-width: 700px; margin: 0 auto; padding: 40px 30px; font-size: 14px; }
h1 { color: #1a1a2e; font-size: 28px; border-bottom: 3px solid #a8dadc; padding-bottom: 10px; }
h2 { color: #2d3561; font-size: 22px; margin-top: 30px; }
h3 { color: #4a4e69; font-size: 18px; }
a { color: #2563eb; }
ul, ol { padding-left: 24px; }
li { margin-bottom: 6px; }
blockquote { border-left: 4px solid #a8dadc; padding-left: 16px; color: #4a4e69; font-style: italic; }
code { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 13px; }
table { border-collapse: collapse; width: 100%; margin: 16px 0; }
th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
th { background: #f1faee; }
hr { border: none; border-top: 1px solid #ddd; margin: 24px 0; }
`;

(async () => {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true
  });

  for (const file of files) {
    const md = fs.readFileSync(path.join(TRIPWIRE_DIR, file), 'utf8');
    const html = `<!DOCTYPE html><html><head><style>${CSS}</style></head><body>${marked(md)}</body></html>`;
    
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    const outName = file.replace('.md', '.pdf');
    await page.pdf({
      path: path.join(OUTPUT_DIR, outName),
      format: 'A4',
      margin: { top: '40px', bottom: '40px', left: '30px', right: '30px' },
      printBackground: true
    });
    
    console.log(`✅ ${outName}`);
    await page.close();
  }

  await browser.close();
  console.log('Done!');
})();
