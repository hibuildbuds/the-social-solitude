import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const URL = "https://fedbymade.com/";
const OUT_DIR = path.resolve(process.cwd(), "screenshots/reference");

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  try {
    for (const vp of VIEWPORTS) {
      const ctx = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 2,
      });
      const page = await ctx.newPage();
      await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
      // Settle for any entrance animations
      await page.waitForTimeout(2500);
      // Full-page
      await page.screenshot({
        path: path.join(OUT_DIR, `${vp.name}-full.png`),
        fullPage: true,
      });
      // Above-the-fold
      await page.screenshot({
        path: path.join(OUT_DIR, `${vp.name}-fold.png`),
        fullPage: false,
      });
      // Capture HTML of body for structural reference
      const html = await page.content();
      await writeFile(
        path.join(OUT_DIR, `${vp.name}.html`),
        html,
        "utf8"
      );
      // Capture computed structure: section outlines
      const outline = await page.evaluate(() => {
        const blocks = [];
        const all = document.body.querySelectorAll(
          "section, header, footer, nav, main > div, main > section"
        );
        for (const el of all) {
          const r = el.getBoundingClientRect();
          const cs = getComputedStyle(el);
          blocks.push({
            tag: el.tagName.toLowerCase(),
            id: el.id || null,
            cls: el.className?.toString().slice(0, 200) || null,
            top: Math.round(r.top + window.scrollY),
            height: Math.round(r.height),
            bg: cs.backgroundColor,
            color: cs.color,
            textPreview: (el.textContent || "")
              .trim()
              .slice(0, 200)
              .replace(/\s+/g, " "),
          });
        }
        return blocks;
      });
      await writeFile(
        path.join(OUT_DIR, `${vp.name}-outline.json`),
        JSON.stringify(outline, null, 2),
        "utf8"
      );
      await ctx.close();
      console.log(`captured ${vp.name}`);
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
