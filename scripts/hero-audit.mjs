// Drives the hero carousel the way a visitor would, on every screen size:
// taps the arrow, swipes across the copy, then waits to see autoplay resume.
// Measuring layout alone is not enough — the controls can be perfectly placed
// and still be unreachable if a stacking or pointer-events mistake covers them.
import puppeteer from "puppeteer-core";

const CHROME =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const URL = process.env.URL || "http://localhost:3000/";
const OUT = process.env.OUT || "./.audit-shots";

const VIEWPORTS = [
  { name: "320", width: 320, height: 640, mobile: true },
  { name: "360", width: 360, height: 740, mobile: true },
  { name: "390", width: 390, height: 844, mobile: true },
  { name: "430", width: 430, height: 932, mobile: true },
  { name: "768", width: 768, height: 1024, mobile: true },
  { name: "1024", width: 1024, height: 768, mobile: false },
  { name: "1440", width: 1440, height: 900, mobile: false },
];

await (await import("node:fs/promises")).mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars"],
});

const caption = (page) =>
  page.$eval("#home", (s) => {
    const c = s.querySelector("[data-slide-caption]");
    return c ? c.textContent.trim() : "?";
  });

let fails = 0;
const fail = (m) => {
  console.log("      ✗ " + m);
  fails++;
};

for (const vp of VIEWPORTS) {
  const page = await browser.newPage();
  await page.setViewport({
    width: vp.width,
    height: vp.height,
    deviceScaleFactor: 1,
    isMobile: vp.mobile,
    hasTouch: vp.mobile,
  });
  await page.goto(URL, { waitUntil: "networkidle2", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 4200)); // let the preloader curtain lift

  console.log(`\n━━━ ${vp.name} (${vp.width}×${vp.height}) ━━━`);

  // 1. Do the controls fit on screen, and are they big enough to hit?
  const boxes = await page.evaluate(() => {
    const grab = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        l: Math.round(r.left), r: Math.round(r.right),
        t: Math.round(r.top), b: Math.round(r.bottom),
        w: Math.round(r.width), h: Math.round(r.height),
      };
    };
    return {
      prev: grab('#home button[aria-label="Previous slide"]'),
      next: grab('#home button[aria-label="Next slide"]'),
      rail0: grab('#home button[aria-label^="Show slide 1"]'),
      section: grab("#home"),
      vw: document.documentElement.clientWidth,
      vh: document.documentElement.clientHeight,
    };
  });

  for (const key of ["prev", "next", "rail0"]) {
    const b = boxes[key];
    if (!b) {
      if (key === "rail0" && vp.width < 640) continue; // rails are ≥sm only
      fail(`${key} not found`);
      continue;
    }
    if (b.r > boxes.vw + 1 || b.l < -1)
      fail(`${key} off-screen horizontally (${b.l}→${b.r} in ${boxes.vw})`);
    if (b.b > boxes.vh + 1) fail(`${key} below the fold (bottom ${b.b} > ${boxes.vh})`);
    if (key !== "rail0" && (b.w < 40 || b.h < 40))
      fail(`${key} tap target only ${b.w}×${b.h} (need ≥40)`);
  }
  if (boxes.section.h > boxes.vh + 2)
    console.log(`      · hero is ${boxes.section.h}px tall vs ${boxes.vh}px viewport`);

  // 2. Does the NEXT arrow advance the carousel?
  const before = await caption(page);
  if (boxes.next && boxes.next.r <= boxes.vw) {
    const cx = boxes.next.l + boxes.next.w / 2;
    const cy = boxes.next.t + boxes.next.h / 2;
    if (vp.mobile) await page.touchscreen.tap(cx, cy);
    else await page.mouse.click(cx, cy);
    await new Promise((r) => setTimeout(r, 1600));
    const after = await caption(page);
    if (after === before) fail(`next arrow did not advance ("${before}")`);
    else console.log(`      ✓ next arrow: ${before} → ${after}`);
  }

  // 3. Does a swipe over the copy — not just the bare photo — advance it?
  if (vp.mobile) {
    const b4 = await caption(page);
    const y = Math.round(vp.height * 0.42);
    await page.touchscreen.touchStart(Math.round(vp.width * 0.85), y);
    for (let i = 1; i <= 8; i++) {
      await page.touchscreen.touchMove(Math.round(vp.width * 0.85 - i * (vp.width * 0.08)), y);
      await new Promise((r) => setTimeout(r, 30));
    }
    await page.touchscreen.touchEnd();
    await new Promise((r) => setTimeout(r, 1600));
    const aft = await caption(page);
    if (aft === b4) fail(`swipe over the copy area did not advance ("${b4}")`);
    else console.log(`      ✓ swipe: ${b4} → ${aft}`);
  }

  // 4. Does autoplay pick back up on its own? Park the mouse away from the
  //    controls first — hovering them is meant to pause, not a stall.
  if (!vp.mobile) await page.mouse.move(5, 5);
  await new Promise((r) => setTimeout(r, 300));
  const t0 = await caption(page);
  await new Promise((r) => setTimeout(r, 8000));
  const t1 = await caption(page);
  if (t0 === t1) fail(`autoplay stalled after interaction (stuck on "${t0}")`);
  else console.log(`      ✓ autoplay resumed: ${t0} → ${t1}`);

  await page.screenshot({ path: `${OUT}/hero-${vp.name}.png` });
  await page.close();
}

await browser.close();
console.log(`\n${fails === 0 ? "✓ HERO OK ON ALL SCREENS" : `✗ ${fails} hero failure(s)`}`);
process.exit(fails === 0 ? 0 : 1);
