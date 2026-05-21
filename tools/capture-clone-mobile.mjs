// Capture the local clone in mobile viewport, including bottom-bar closed
// and drawer-open states, so we can compare to the reference visually.
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = "http://localhost:3000";
const OUT_DIR = path.resolve(process.cwd(), "screenshots/clone");
const VP = { width: 390, height: 844 };

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  try {
    const ctx = await browser.newContext({
      viewport: VP,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    const page = await ctx.newPage();
    await page.goto(BASE + "/", { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: path.join(OUT_DIR, "home-mobile-closed.png"),
      fullPage: false,
    });

    // Open drawer (longer timeout, in case HMR is still wiring)
    await page.click('button[aria-label="Open menu"]', { timeout: 10000, force: true });
    await page.waitForTimeout(700);
    await page.screenshot({
      path: path.join(OUT_DIR, "home-mobile-drawer.png"),
      fullPage: false,
    });

    // Close
    await page.click('button[aria-label="Close menu"]');
    await page.waitForTimeout(700);
    await page.screenshot({
      path: path.join(OUT_DIR, "home-mobile-closed-after.png"),
      fullPage: false,
    });

    console.log("captured clone mobile: closed + drawer");
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
