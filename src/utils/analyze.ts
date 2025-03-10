"use server";
import { openai } from "@ai-sdk/openai";
import { createOllama } from "ollama-ai-provider";
import { streamObject } from "ai";
import { hypothesisSchema } from "./schema";
import { z } from "zod";

// const model = openai("gpt-4o-mini", {
//   structuredOutputs: true,
// });

const ollama = createOllama({
  baseURL: `${process.env.OLLAMA_API_URL}/api`,
});

const model = ollama("phi4:latest");

export const analyzeContent = async (content: string, screenshot: string) => {
  const result = streamObject({
    model,
    schemaName: "hypotheses",
    schema: z.object({ hypotheses: z.array(hypothesisSchema) }),
    schemaDescription: "A list of hypotheses for A/B testing.",
    messages: [
      {
        role: "system",
        content:
          "You are an AI assistant that generates hypotheses for A/B testing.",
      },
      { role: "user", content: `Content: ${content}` },
      {
        role: "assistant",
        content:
          "Please provide a list of hypotheses for A/B testing based on the provided content.",
      },
      {
        role: "user",
        content: [
          {
            type: "image",
            image: `data:image/png;base64,${screenshot}`,
          },
        ],
      },
    ],
  });
  return result.toTextStreamResponse();
};
