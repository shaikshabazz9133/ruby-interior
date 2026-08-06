import puppeteer from "puppeteer-core";

const CHROME =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const URL = process.env.URL || "http://localhost:3000/";
const OUT = process.env.OUT || "./.audit-shots";

const VIEWPORTS = [
  { name: "320-small-phone", width: 320, height: 640, mobile: true },
  { name: "360-galaxy-s8", width: 360, height: 740, mobile: true },
  { name: "390-iphone14", width: 390, height: 844, mobile: true },
  { name: "414-plus", width: 414, height: 896, mobile: true },
  { name: "768-tablet", width: 768, height: 1024, mobile: true },
  { name: "1024-ipad-land", width: 1024, height: 768, mobile: false },
  { name: "1280-laptop", width: 1280, height: 800, mobile: false },
  { name: "1440-desktop", width: 1440, height: 900, mobile: false },
  { name: "1920-large", width: 1920, height: 1080, mobile: false },
];

// Finds every element whose box extends past the viewport's right edge.
const overflowProbe = () => {
  const vw = document.documentElement.clientWidth;
  const bad = [];
  for (const el of document.querySelectorAll("body *")) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    const style = getComputedStyle(el);
    if (style.position === "fixed") continue; // overlays are allowed off-screen
    if (r.right > vw + 1 || r.left < -1) {
      bad.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.className?.baseVal ?? el.className ?? "").toString().slice(0, 90),
        left: Math.round(r.left),
        right: Math.round(r.right),
        text: (el.textContent || "").trim().slice(0, 40),
      });
    }
  }
  // Keep only the outermost offenders — children inherit their parent's overflow.
  return bad.filter((b, i) => !bad.some((o, j) => j !== i && o.left <= b.left && o.right >= b.right && j < i));
};

const pageMetrics = () => ({
  scrollW: document.documentElement.scrollWidth,
  clientW: document.documentElement.clientWidth,
  scrollH: document.documentElement.scrollHeight,
  bodyOverflow: getComputedStyle(document.body).overflow,
});

await (await import("node:fs/promises")).mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars"],
});

let failures = 0;

for (const vp of VIEWPORTS) {
  const page = await browser.newPage();
  await page.setViewport({
    width: vp.width,
    height: vp.height,
    deviceScaleFactor: 1,
    isMobile: vp.mobile,
    hasTouch: vp.mobile,
  });

  const consoleErrors = [];
  page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text().slice(0, 120)));
  page.on("pageerror", (e) => consoleErrors.push("PAGEERROR: " + e.message.slice(0, 120)));

  await page.goto(URL, { waitUntil: "networkidle2", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 4200)); // let the preloader curtain finish

  const m = await page.evaluate(pageMetrics);
  const over = await page.evaluate(overflowProbe);
  const hOverflow = m.scrollW > m.clientW + 1;

  // Can the page actually scroll?
  const scrolled = await page.evaluate(async () => {
    window.scrollTo(0, 600);
    await new Promise((r) => setTimeout(r, 600));
    return window.scrollY;
  });

  const scrollOk = m.scrollH <= vp.height + 10 || scrolled > 50;

  console.log(`\n━━━ ${vp.name} (${vp.width}×${vp.height}) ━━━`);
  console.log(`  page width : ${m.scrollW} vs viewport ${m.clientW}  ${hOverflow ? "✗ H-OVERFLOW" : "✓"}`);
  console.log(`  body overflow: ${m.bodyOverflow}   scrollY after scrollTo(600): ${scrolled}  ${scrollOk ? "✓ scrolls" : "✗ STUCK"}`);
  if (over.length) {
    console.log(`  offenders (${over.length}):`);
    over.slice(0, 6).forEach((o) => console.log(`    <${o.tag}> ${o.left}→${o.right}  "${o.text}"  .${o.cls}`));
  }
  if (consoleErrors.length) console.log(`  console errors: ${[...new Set(consoleErrors)].slice(0, 3).join(" | ")}`);
  if (hOverflow || !scrollOk) failures++;

  await page.screenshot({ path: `${OUT}/shot-${vp.name}.png`, fullPage: false });

  // ---- Project modal ----
  await page.evaluate(() => {
    window.scrollTo(0, 0);
    document.querySelector("#work")?.scrollIntoView();
  });
  await new Promise((r) => setTimeout(r, 900));
  const opened = await page.evaluate(() => {
    const btn = document.querySelector('#work article button[aria-label^="View"]');
    if (!btn) return false;
    btn.click();
    return true;
  });

  if (opened) {
    await new Promise((r) => setTimeout(r, 1100));
    const mm = await page.evaluate(() => {
      const dlg = document.querySelector('[role="dialog"]');
      if (!dlg) return null;
      const card = dlg.querySelector(".max-w-6xl");
      const vw = document.documentElement.clientWidth;
      const r = card.getBoundingClientRect();
      const rail = dlg.querySelector(".overflow-x-auto");
      const details = dlg.querySelector(".max-w-6xl > div:last-child");
      return {
        vw,
        cardW: Math.round(r.width),
        cardLeft: Math.round(r.left),
        cardRight: Math.round(r.right),
        dlgScrollW: dlg.scrollWidth,
        dlgClientW: dlg.clientWidth,
        railScrollable: rail ? rail.scrollWidth > rail.clientWidth : null,
        dlgScrollable: dlg.scrollHeight > dlg.clientHeight,
        detailsClipped: details ? details.scrollWidth > details.clientWidth + 1 : null,
      };
    });
    // Actually *drive* the modal: measuring scrollHeight alone is not enough,
    // because a stopped Lenis can preventDefault() every gesture while the
    // container still reports as overflowing.
    let scrollProof = { wheel: null, touch: null };
    if (mm && mm.dlgScrollable) {
      await page.evaluate(() => {
        document.querySelector('[role="dialog"]').scrollTop = 0;
      });
      await page.mouse.move(vp.width / 2, vp.height / 2);
      await page.mouse.wheel({ deltaY: 400 });
      await new Promise((r) => setTimeout(r, 500));
      scrollProof.wheel = await page.evaluate(
        () => document.querySelector('[role="dialog"]').scrollTop
      );

      if (vp.mobile) {
        await page.evaluate(() => {
          document.querySelector('[role="dialog"]').scrollTop = 0;
        });
        await new Promise((r) => setTimeout(r, 200));
        const cx = Math.round(vp.width / 2);
        await page.touchscreen.touchStart(cx, Math.round(vp.height * 0.85));
        for (let i = 1; i <= 6; i++) {
          await page.touchscreen.touchMove(cx, Math.round(vp.height * 0.85 - i * 45));
          await new Promise((r) => setTimeout(r, 40));
        }
        await page.touchscreen.touchEnd();
        await new Promise((r) => setTimeout(r, 600));
        scrollProof.touch = await page.evaluate(
          () => document.querySelector('[role="dialog"]').scrollTop
        );
      }
    }

    const modalOverflow = mm && (mm.cardRight > mm.vw + 1 || mm.dlgScrollW > mm.dlgClientW + 1);
    const wheelDead = scrollProof.wheel !== null && scrollProof.wheel < 30;
    const touchDead = scrollProof.touch !== null && scrollProof.touch < 30;
    console.log(`  modal      : card ${mm.cardW}px (${mm.cardLeft}→${mm.cardRight}) in ${mm.vw}px  ${modalOverflow ? "✗ OVERFLOW" : "✓ fits"}`);
    console.log(`               thumb rail scrollable: ${mm.railScrollable}, modal scrolls: ${mm.dlgScrollable}, details clipped: ${mm.detailsClipped}`);
    if (mm.dlgScrollable) {
      console.log(
        `               modal scroll → wheel: ${scrollProof.wheel ?? "n/a"}px ${wheelDead ? "✗ BLOCKED" : "✓"}` +
        (vp.mobile ? `, touch: ${scrollProof.touch ?? "n/a"}px ${touchDead ? "✗ BLOCKED" : "✓"}` : "")
      );
    }
    if (modalOverflow || wheelDead || touchDead) failures++;
    await page.screenshot({ path: `${OUT}/shot-${vp.name}-modal.png` });
  } else {
    console.log("  modal      : could not open (no card button found)");
  }

  await page.close();
}

await browser.close();
console.log(`\n${failures === 0 ? "✓ ALL VIEWPORTS PASS" : `✗ ${failures} failure(s)`}`);
process.exit(failures === 0 ? 0 : 1);
