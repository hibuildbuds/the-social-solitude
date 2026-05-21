import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = "https://fedbymade.com";
const OUT_DIR = path.resolve(process.cwd(), "screenshots/reference");
const PAGES = ["/about/", "/menu/", "/bookings/", "/journal/", "/press/", "/offers/"];

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  try {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();
    for (const p of PAGES) {
      const url = BASE + p;
      const slug = p.replace(/\//g, "_").replace(/^_|_$/g, "") || "home";
      try {
        await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
        await page.waitForTimeout(1500);
        // scroll slowly to bottom to trigger lazy loading
        await page.evaluate(async () => {
          await new Promise((resolve) => {
            let y = 0;
            const step = 600;
            const tick = () => {
              window.scrollBy(0, step);
              y += step;
              if (y < document.body.scrollHeight) {
                setTimeout(tick, 150);
              } else {
                window.scrollTo(0, 0);
                setTimeout(resolve, 600);
              }
            };
            tick();
          });
        });
        await page.screenshot({
          path: path.join(OUT_DIR, `desktop-${slug}.png`),
          fullPage: true,
        });
        console.log(`captured ${slug}`);
      } catch (err) {
        console.error(`failed ${slug}:`, err.message);
      }
    }
    await ctx.close();
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
