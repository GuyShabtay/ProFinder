import { launch } from 'chrome-launcher';
import lighthouse from 'lighthouse';
import { writeFileSync } from 'fs';

(async () => {
  const chrome = await launch({ chromeFlags: ['--headless'] });
  const options = { logLevel: 'info', output: 'html', onlyCategories: ['performance'], port: chrome.port };
  const runnerResult = await lighthouse('https://profinder-vzbv.onrender.com/', options);

  // `.report` is the HTML report as a string
  const reportHtml = runnerResult.report;
  writeFileSync('lighthouse-report.html', reportHtml);

  console.log('Report is done for', runnerResult.lhr.finalDisplayedUrl);
  console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);

  await chrome.kill();
})();
