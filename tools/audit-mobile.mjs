import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const ROUTES = ["/", "/about", "/menu", "/journal"];
const VP = { width: 390, height: 844 };

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: VP,
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();

  const findings = {};
  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 60000 });
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let y = 0;
        const step = window.innerHeight * 0.7;
        const max = document.documentElement.scrollHeight;
        const tick = () => {
          window.scrollTo(0, y);
          y += step;
          if (y < max) setTimeout(tick, 120);
          else setTimeout(resolve, 300);
        };
        tick();
      });
    });
    await page.waitForTimeout(400);

    const r = await page.evaluate(() => {
      const out = {};
      out.scrollWidth = document.documentElement.scrollWidth;
      out.viewportWidth = window.innerWidth;
      out.horizontalOverflow = out.scrollWidth - out.viewportWidth;
      out.scrollHeight = document.documentElement.scrollHeight;

      // Find any element extending past the viewport horizontally
      const overflowing = [];
      const everything = document.querySelectorAll("*");
      for (const el of everything) {
        const r = el.getBoundingClientRect();
        if (r.right > window.innerWidth + 1) {
          const cs = getComputedStyle(el);
          if (cs.position === "fixed" || cs.position === "sticky") continue;
          overflowing.push({
            tag: el.tagName.toLowerCase(),
            cls: (el.className?.toString() || "").slice(0, 80),
            right: Math.round(r.right),
            width: Math.round(r.width),
          });
          if (overflowing.length > 5) break;
        }
      }
      out.overflowingExamples = overflowing;

      // Sidebar visibility on mobile (should be display:none below md)
      const sidebar = document.querySelector("aside");
      out.sidebar = sidebar
        ? {
            display: getComputedStyle(sidebar).display,
            visibility: getComputedStyle(sidebar).visibility,
          }
        : null;

      // Mobile bar visibility
      const mobileLogo = Array.from(document.querySelectorAll("a")).find(
        (a) => a.getAttribute("aria-label") === "FED — home" && a.closest(".md\\:hidden, [class*=md\\:hidden]")
      );
      // simpler: find element with text "FED" inside a fixed top bar
      const fixedBar = Array.from(document.querySelectorAll("div")).find((d) => {
        const cs = getComputedStyle(d);
        return cs.position === "fixed" && d.getBoundingClientRect().top === 0 && d.getBoundingClientRect().width > 100;
      });
      out.fixedTopBar = fixedBar
        ? {
            display: getComputedStyle(fixedBar).display,
            classes: fixedBar.className?.slice(0, 80),
            height: Math.round(fixedBar.getBoundingClientRect().height),
          }
        : null;

      // Body text smallest font size?
      let minFontPx = Infinity;
      let minText = "";
      for (const el of document.querySelectorAll("p, li, a, span, h1, h2, h3, h4, time, address")) {
        if (!el.textContent?.trim()) continue;
        const cs = getComputedStyle(el);
        const f = parseFloat(cs.fontSize);
        if (f && f < minFontPx) {
          minFontPx = f;
          minText = el.textContent.trim().slice(0, 50);
        }
      }
      out.minFontPx = { px: Math.round(minFontPx * 10) / 10, sample: minText };

      // Color contrast spot-check for body
      const body = document.body;
      const bc = getComputedStyle(body);
      out.bodyText = bc.color;
      out.bodyBg = bc.backgroundColor;

      return out;
    });

    findings[route] = r;
  }

  console.log(JSON.stringify(findings, null, 2));
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
