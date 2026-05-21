// Capture fedbymade.com mobile UX comprehensively: scroll positions, the
// hamburger/drawer open state, CSS transitions on key elements, and an
// outline of fixed/animated nodes. Output goes to screenshots/reference/.
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const URL = "https://fedbymade.com/";
const OUT_DIR = path.resolve(process.cwd(), "screenshots/reference");
const VP = { width: 390, height: 844 };

async function captureScrollSeries(page, slug) {
  // Settle entrance animations.
  await page.waitForTimeout(2500);
  const total = await page.evaluate(
    () => document.documentElement.scrollHeight,
  );
  const frames = Math.max(1, Math.min(6, Math.ceil(total / VP.height)));
  for (let i = 0; i < frames; i++) {
    const y = Math.min(total - VP.height, i * VP.height);
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(450);
    await page.screenshot({
      path: path.join(OUT_DIR, `mobile-${slug}-scroll-${i + 1}.png`),
      fullPage: false,
    });
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
}

async function captureHamburgerOpen(page) {
  // Try common selectors for hamburger/menu buttons.
  const candidates = [
    'button[aria-label*="menu" i]',
    'button[aria-label*="open" i]',
    "[aria-controls*='menu' i]",
    ".menu-toggle",
    ".hamburger",
    "header button:has(svg)",
    "header [role='button']",
  ];
  let opened = false;
  for (const sel of candidates) {
    const el = await page.$(sel);
    if (el) {
      try {
        await el.click({ timeout: 1500 });
        opened = true;
        break;
      } catch {}
    }
  }
  if (!opened) {
    // Heuristic: tap the top-right region where hamburgers typically live.
    await page.mouse.click(VP.width - 30, 30);
  }
  await page.waitForTimeout(700);
  await page.screenshot({
    path: path.join(OUT_DIR, "mobile-menu-open.png"),
    fullPage: false,
  });

  // Mid-animation capture (250ms after click) — useful for understanding
  // drawer/slide vs fade entrance.
  return opened;
}

async function extractAnimationData(page) {
  return page.evaluate(() => {
    const interesting = [
      "header",
      "nav",
      "footer",
      ".menu-toggle",
      ".hamburger",
      "[role='button']",
      "[class*='drawer']",
      "[class*='menu']",
      "[class*='overlay']",
      "[class*='mobile']",
    ];
    const seen = new Set();
    const nodes = [];
    for (const sel of interesting) {
      document.querySelectorAll(sel).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        nodes.push({
          tag: el.tagName.toLowerCase(),
          id: el.id || null,
          cls: (el.className || "").toString().slice(0, 160),
          position: cs.position,
          top: r.top.toFixed(1),
          left: r.left.toFixed(1),
          width: r.width.toFixed(1),
          height: r.height.toFixed(1),
          zIndex: cs.zIndex,
          transition: cs.transition,
          animation: cs.animation,
          transform: cs.transform,
          opacity: cs.opacity,
          display: cs.display,
          ariaLabel: el.getAttribute("aria-label"),
          ariaExpanded: el.getAttribute("aria-expanded"),
        });
      });
    }
    return nodes;
  });
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  try {
    const ctx = await browser.newContext({
      viewport: VP,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });

    // 1) Closed state — initial.
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: path.join(OUT_DIR, "mobile-initial.png"),
      fullPage: false,
    });
    await page.screenshot({
      path: path.join(OUT_DIR, "mobile-full-v2.png"),
      fullPage: true,
    });

    // 2) Scroll series.
    await captureScrollSeries(page, "home");

    // 3) Animation data — closed state.
    const closedNodes = await extractAnimationData(page);
    await writeFile(
      path.join(OUT_DIR, "mobile-anim-closed.json"),
      JSON.stringify(closedNodes, null, 2),
    );

    // 4) Open hamburger and capture.
    await captureHamburgerOpen(page);
    const openNodes = await extractAnimationData(page);
    await writeFile(
      path.join(OUT_DIR, "mobile-anim-open.json"),
      JSON.stringify(openNodes, null, 2),
    );

    // 5) Save raw HTML for offline inspection (full page after JS).
    const html = await page.content();
    await writeFile(path.join(OUT_DIR, "mobile-v2.html"), html, "utf8");

    console.log("captured mobile reference: 8+ screenshots + anim JSON");
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
