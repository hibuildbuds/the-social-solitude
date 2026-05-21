import { chromium } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto("http://localhost:3000/about", { waitUntil: "networkidle" });

await page.locator('[aria-label="Open menu"]').click();
await page.waitForTimeout(400);

const navMeasurements = await page.$$eval('nav a', (links) =>
  links.map((a) => {
    const r = a.getBoundingClientRect();
    return { text: a.textContent?.trim(), width: Math.round(r.width), height: Math.round(r.height) };
  })
);
console.log("Mobile nav link metrics:");
console.log(JSON.stringify(navMeasurements, null, 2));

const menuOpen = await page.evaluate(() => {
  const btn = document.querySelector('[aria-expanded]');
  return btn?.getAttribute('aria-expanded') === 'true';
});
console.log("Hamburger aria-expanded=true:", menuOpen);

await page.screenshot({ path: "screenshots/clone/mobile-nav-open.png", fullPage: false });

await browser.close();
