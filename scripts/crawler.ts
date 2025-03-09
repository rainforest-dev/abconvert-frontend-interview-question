import { chromium } from "playwright";
import * as fs from "fs";

export async function getPageContent(url: string) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle" });

  const buffer = await page.screenshot({
    path: "out/screenshot.jpg",
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

  fs.writeFileSync("out/page.html", content);

  await browser.close();
  return [content, screenshot];
}
