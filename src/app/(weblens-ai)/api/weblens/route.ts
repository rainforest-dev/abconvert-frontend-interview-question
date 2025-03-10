import playwright from 'playwright';

/**
 * 
 * @swagger
 * /weblens:
 *   get:
 *     summary: Get the content of a webpage
 *     description: Get the content of a webpage
 *     tags:
 *       - weblens
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         description: The URL of the webpage to get the content of
 *     responses:
 *         200:
 *              description: The content of the webpage
 */
export async function GET(request: Request) {
    const url = new URL(request.url);
    const browser = await playwright.chromium.launch({});
    const page = await browser.newPage();
    await page.goto(url.href, {waitUntil: 'networkidle'});
    const content = await page.content();
    await browser.close();
    return new Response(content, {
        headers: {
        "content-type": "text/html; charset=UTF-8",
        },
    });
}