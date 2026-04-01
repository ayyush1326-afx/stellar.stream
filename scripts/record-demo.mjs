import { chromium } from '@playwright/test';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

(async () => {
  console.log("Starting Automated Demo Recording for StellarStream MVP...");
  
  const videoDir = path.resolve('docs/assets');
  if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    recordVideo: {
      dir: videoDir,
      size: { width: 1280, height: 720 },
    },
    viewport: { width: 1280, height: 720 },
  });

  const page = await context.newPage();
  
  try {
    console.log("Navigating to Homepage...");
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(2000);
    
    // Scroll down slowly
    await page.evaluate(() => window.scrollBy({ top: 600, behavior: 'smooth' }));
    await page.waitForTimeout(2000);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await page.waitForTimeout(1000);

    console.log("Simulating Wallet Connect...");
    await page.click('button:has-text("Connect Wallet")');
    await page.waitForTimeout(2500);

    console.log("Navigating to Feed...");
    await page.click('text=Feed');
    await page.waitForTimeout(2000);
    await page.evaluate(() => window.scrollBy({ top: 300, behavior: 'smooth' }));
    await page.waitForTimeout(1500);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await page.waitForTimeout(1000);

    console.log("Simulating Content Unlocking...");
    await page.click('button:has-text("Pay 0.5 XLM to Unlock")');
    await page.waitForTimeout(2500); // 1.2s mock delay + toast
    await page.evaluate(() => window.scrollBy({ top: 300, behavior: 'smooth' }));
    await page.waitForTimeout(2500);

    console.log("Navigating to Creator Dashboard...");
    await page.click('text=My Content');
    await page.waitForTimeout(2500);

    console.log("Navigating to History...");
    await page.click('text=History');
    await page.waitForTimeout(2500);

    console.log("Ending Recording...");
    await page.click('text=StellarStream'); // logo return home
    await page.waitForTimeout(2500);
    
    await page.close();
    await context.close();
    await browser.close();

    console.log("Video captured and saved to docs/assets/");
    
    // Find the newest webm file and rename it
    const files = fs.readdirSync(videoDir);
    const videoFile = files.find(f => f.endsWith('.webm'));
    
    if (videoFile) {
        const oldPath = path.join(videoDir, videoFile);
        const newPath = path.join(videoDir, 'stellarstream_demo.webm');
        if (fs.existsSync(newPath)) fs.unlinkSync(newPath);
        fs.renameSync(oldPath, newPath);
        console.log("Renamed video to stellarstream_demo.webm");
    }

  } catch (err) {
    console.error("Recording failed:", err);
    await browser.close();
  }
})();
