import { chromium } from "playwright";

export async function getPageContent(url: string) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle" });

  const content = await page.content();
  await browser.close();
  return content;
}
