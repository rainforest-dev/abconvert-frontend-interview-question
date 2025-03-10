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
 *     security:
 *      - bearerAuth: []
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
 *               provider:
 *                 type: string
 *                 description: The provider to use for generating hypotheses
 *                 enum: [ollama, openai]
 *               model:
 *                 type: string
 *                 description: The model to use for generating hypotheses
 *               baseURL:
 *                 type: string
 *                 description: The base URL of the provider
 *     responses:
 *         200:
 *              description: The content of the webpage
 */
export async function POST(request: NextRequest) {
  const {
    url,
    provider = "ollama",
    model,
    baseURL,
  } = (await request.json()) as {
    url: string;
    provider?: "ollama" | "openai";
    model: string;
    baseURL: string;
  };

  const apiKey = request.headers.get("Authorization")?.split(" ")[1];
  if (!apiKey && provider === "openai") {
    return new Response("API key is required", { status: 401 });
  }

  if (!url) {
    return new Response("URL is required", { status: 400 });
  }
  const [content, screenshot] = await getPageContent(url);

  const hypotheses = await analyzeContent(content, screenshot, {
    provider,
    model,
    baseURL,
    apiKey,
  });

  return hypotheses;
}
