import { getPageContent, analyzeContent } from "@/utils";
import type { NextRequest } from "next/server";

/**
 *
 * @swagger
 * /api/weblens:
 *   post:
 *     summary: Get the content of a webpage
 *     description: Get the content of a webpage
 *     tags:
 *       - weblens
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: The URL of the webpage to get the content from
 *     responses:
 *         200:
 *              description: The content of the webpage
 */
export async function POST(request: NextRequest) {
  //   const [content] = await getPageContent(request.url);
  const { url } = (await request.json()) as { url: string };

  if (!url) {
    return new Response("URL is required", { status: 400 });
  }
  const [content, screenshot] = await getPageContent(url);

  const hypotheses = await analyzeContent(content, screenshot);

  return hypotheses;
}
