import * as fs from "fs";
import OpenAI from "openai";
import messages from "./messages.json";
import { configDotenv } from "dotenv";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod.mjs";
import { config, type ProviderType, outputPath } from "./config";

configDotenv();

const openai = new OpenAI();

export const format = {
  type: "object",
  properties: {
    suggestions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          suggestion: {
            type: "string",
          },
          hypothesis: {
            type: "string",
          },
          control: {
            type: "string",
          },
          variant: {
            type: "string",
          },
        },
        required: ["suggestion", "hypothesis", "control", "variant"],
      },
    },
  },
  required: ["suggestions"],
};

const JsonSchema = z.object({
  suggestions: z.array(
    z.object({
      suggestion: z.string(),
      hypothesis: z.string(),
      control: z.string(),
      variant: z.string(),
    })
  ),
});

interface IOllamaResponse {
  model: string;
  created_at: string;
  message: {
    role: string;
    content: string;
  };
}

const analyzeWithOllama = async (
  content: string,
  screenshot: string,
  model: string
) => {
  const url = config.ollama.url;
  const res = await fetch(`${url}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        ...messages,
        {
          role: "user",
          content,
          images: [screenshot],
        },
      ],
      stream: false,
      format,
    }),
  });
  if (res.ok) {
    const data = (await res.json()) as IOllamaResponse;
    return JSON.parse(data.message.content).suggestions;
  } else {
    console.error(res.statusText, await res.text());
  }
};

const analyzeWithOpenAI = async (
  content: string,
  screenshot: string,
  model: string
) => {
  const completion = await openai.chat.completions.create({
    model,
    messages: [
      {
        role: "user",
        content: [
          ...messages.map((message) => ({
            type: "text" as const,
            text: message.content,
          })),
          { type: "text", text: content },
          {
            type: "image_url",
            image_url: {
              url: `data:image/jpeg;base64,${screenshot}`,
            },
          },
        ],
      },
    ],
    response_format: zodResponseFormat(JsonSchema, "json"),
  });
  const data = completion.choices[0].message.content;
  if (data) return JSON.parse(data).suggestions;
};

export async function analyzeContent(
  content: string,
  screenshot: string,
  provider: ProviderType,
  model: string
) {
  let data: object | undefined = undefined;
  switch (provider) {
    case "ollama":
      data = await analyzeWithOllama(content, screenshot, model);
      break;
    case "openai":
      data = await analyzeWithOpenAI(content, screenshot, model);
      break;
    default:
      break;
  }
  if (data) {
    fs.writeFileSync(
      outputPath("suggestions.json"),
      JSON.stringify(data, null, 2)
    );
  } else {
    throw new Error("Failed to generate A/B testing suggestions.");
  }
}
