import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = "http://localhost:3000";
const OUT_DIR = path.resolve(process.cwd(), "screenshots/clone");

const ROUTES = [
  ["home", "/"],
  ["about", "/about"],
  ["menu", "/menu"],
  ["journal", "/journal"],
];

const VP = { width: 390, height: 844 };

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  try {
    for (const [slug, route] of ROUTES) {
      const ctx = await browser.newContext({
        viewport: VP,
        deviceScaleFactor: 1,
      });
      const page = await ctx.newPage();
      await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 60000 });
      // Walk down to trigger reveals
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let y = 0;
          const step = window.innerHeight * 0.6;
          const max = document.documentElement.scrollHeight;
          const tick = () => {
            window.scrollTo(0, y);
            y += step;
            if (y < max) setTimeout(tick, 150);
            else setTimeout(resolve, 500);
          };
          tick();
        });
      });
      const total = await page.evaluate(() => document.documentElement.scrollHeight);
      const frames = Math.max(1, Math.min(4, Math.ceil(total / VP.height)));
      for (let i = 0; i < frames; i++) {
        const y = Math.min(total - VP.height, i * VP.height);
        await page.evaluate((y) => window.scrollTo(0, y), y);
        await page.waitForTimeout(300);
        await page.screenshot({
          path: path.join(OUT_DIR, `${slug}-mobile-${i + 1}.png`),
          fullPage: false,
        });
      }
      console.log(`captured ${slug} (${frames} frame${frames > 1 ? "s" : ""})`);
      await ctx.close();
    }
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
