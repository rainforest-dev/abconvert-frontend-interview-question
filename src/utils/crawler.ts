"use server";

export async function getPageContent(url: string) {
  const { chromium } = await import("playwright");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(url);

  const buffer = await page.screenshot({
    fullPage: true,
  });
  const screenshot = buffer.toString("base64");

  await page.evaluate(() => {
    const scripts = document.querySelectorAll("script");
    scripts.forEach((script) => script.remove());
    const styles = document.querySelectorAll("style");
    styles.forEach((style) => style.remove());
    const links = document.querySelectorAll("link");
    links.forEach((link) => link.remove());
  });
  const content = await page.locator("body").innerHTML();

  await browser.close();
  return [content, screenshot];
}
