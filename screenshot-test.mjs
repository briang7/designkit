import { chromium } from 'playwright';
import { createServer } from 'vite';

const server = await createServer({ root: '.', server: { port: 5199 } });
await server.listen();

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto('http://localhost:5199/demo-2.html', { waitUntil: 'networkidle' });
await page.waitForTimeout(3000);

// --- Gallery Carousel: screenshot before scroll ---
const galleryCarousel = await page.locator('dk-section-gallery-carousel').first();
await galleryCarousel.scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await galleryCarousel.screenshot({ path: 'screenshots/gallery-carousel-before.png' });

// --- Gallery Carousel: test horizontal scroll ---
const trackHandle = await page.evaluateHandle(() => {
  const el = document.querySelector('dk-section-gallery-carousel');
  return el.shadowRoot.querySelector('.track');
});

// Get track scroll info before
const scrollBefore = await page.evaluate((track) => ({
  scrollLeft: track.scrollLeft,
  scrollWidth: track.scrollWidth,
  clientWidth: track.clientWidth,
  childCount: track.querySelector('slot').assignedElements().length,
}), trackHandle);
console.log('Before scroll:', JSON.stringify(scrollBefore));

// Scroll right by 600px using mouse wheel on the track
const trackBox = await trackHandle.evaluate(el => {
  const r = el.getBoundingClientRect();
  // Need to account for shadow host offset
  const host = el.getRootNode().host;
  const hostR = host.getBoundingClientRect();
  return { x: r.x, y: r.y, width: r.width, height: r.height };
});

// Use horizontal wheel to scroll
await page.mouse.move(trackBox.x + trackBox.width / 2, trackBox.y + trackBox.height / 2);
await page.mouse.wheel(600, 0);
await page.waitForTimeout(1000);

const scrollAfterWheel = await page.evaluate((track) => ({
  scrollLeft: track.scrollLeft,
  scrollWidth: track.scrollWidth,
  clientWidth: track.clientWidth,
}), trackHandle);
console.log('After wheel scroll:', JSON.stringify(scrollAfterWheel));

await galleryCarousel.screenshot({ path: 'screenshots/gallery-carousel-after-wheel.png' });

// Try programmatic scroll too
await page.evaluate((track) => {
  track.scrollBy({ left: 600, behavior: 'smooth' });
}, trackHandle);
await page.waitForTimeout(1000);

const scrollAfterProgrammatic = await page.evaluate((track) => ({
  scrollLeft: track.scrollLeft,
  scrollWidth: track.scrollWidth,
  clientWidth: track.clientWidth,
}), trackHandle);
console.log('After programmatic scroll:', JSON.stringify(scrollAfterProgrammatic));

await galleryCarousel.screenshot({ path: 'screenshots/gallery-carousel-after-prog.png' });

// --- Testimonials carousel: test arrow clicks ---
const testimonialsCarousel = await page.locator('dk-section-testimonials-carousel').first();
await testimonialsCarousel.scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await testimonialsCarousel.screenshot({ path: 'screenshots/testimonials-carousel-slide0.png' });

// Click next arrow
const nextArrow = await page.evaluateHandle(() => {
  const el = document.querySelector('dk-section-testimonials-carousel');
  return el.shadowRoot.querySelector('[part="arrow-next"]');
});
await nextArrow.asElement().click();
await page.waitForTimeout(800);
await testimonialsCarousel.screenshot({ path: 'screenshots/testimonials-carousel-slide1.png' });

// Click next again
await nextArrow.asElement().click();
await page.waitForTimeout(800);
await testimonialsCarousel.screenshot({ path: 'screenshots/testimonials-carousel-slide2.png' });

console.log('All screenshots saved to screenshots/');

await server.close();
await browser.close();
