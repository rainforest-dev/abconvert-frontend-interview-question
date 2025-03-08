import * as fs from "fs";
import OpenAI from "openai";
import messages from "./messages.json";
import { configDotenv } from "dotenv";

configDotenv();

const openai = new OpenAI();

export type ProviderType = "ollama" | "openai";

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

interface IOllamaResponse {
  model: string;
  created_at: string;
  message: {
    role: string;
    content: string;
  };
}

const analyzeWithOllama = async (content: string, model: string) => {
  const url = process.env.OLLAMA_API_URL ?? "http://localhost:11434";
  const res = await fetch(`${url}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [...messages, { role: "user", content }],
      stream: false,
      format,
    }),
  });
  if (res.ok) {
    const data = (await res.json()) as IOllamaResponse;
    return JSON.parse(data.message.content).suggestions;
  }
};

const analyzeWithOpenAI = async (content: string, model: string) => {
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
        ],
      },
    ],
    // response_format: format
  });
  const data = completion.choices[0].message.content;
  console.log(data);
  return {};
};

export async function analyzeContent(
  content: string,
  provider: ProviderType,
  model: string
) {
  let data: object | undefined = undefined;
  switch (provider) {
    case "ollama":
      data = await analyzeWithOllama(content, model);
      break;
    case "openai":
      data = await analyzeWithOpenAI(content, model);
      break;
    default:
      break;
  }
  if (data) {
    fs.writeFileSync("suggestions.json", JSON.stringify(data, null, 2));
  } else {
    throw new Error("Failed to generate A/B testing suggestions.");
  }
}
