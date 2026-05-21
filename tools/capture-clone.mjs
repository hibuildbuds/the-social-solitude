import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = "http://localhost:3000";
const OUT_DIR = path.resolve(process.cwd(), "screenshots/clone");

// Pages to capture: [slug, route, viewport]
const SHOTS = [
  ["home-desktop", "/", { width: 1440, height: 900 }],
  ["home-mobile", "/", { width: 390, height: 844 }],
];

async function main() {
  const extra = process.argv.slice(2);
  for (let i = 0; i < extra.length; i += 3) {
    SHOTS.push([extra[i], extra[i + 1], { width: parseInt(extra[i + 2].split("x")[0], 10), height: parseInt(extra[i + 2].split("x")[1], 10) }]);
  }
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  try {
    for (const [slug, route, vp] of SHOTS) {
      const ctx = await browser.newContext({
        viewport: vp,
        deviceScaleFactor: 1,
      });
      const page = await ctx.newPage();
      await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 60000 });
      await page.waitForTimeout(800);
      // Trigger any scroll-revealed content by walking down then back up.
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let y = 0;
          const step = Math.floor(window.innerHeight * 0.6);
          const max = document.documentElement.scrollHeight;
          const tick = () => {
            window.scrollTo(0, y);
            y += step;
            if (y < max) {
              setTimeout(tick, 200);
            } else {
              setTimeout(() => {
                window.scrollTo(0, 0);
                resolve();
              }, 400);
            }
          };
          tick();
        });
      });
      await page.waitForTimeout(900);
      await page.screenshot({
        path: path.join(OUT_DIR, `${slug}.png`),
        fullPage: true,
      });
      console.log(`captured ${slug}`);
      await ctx.close();
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
