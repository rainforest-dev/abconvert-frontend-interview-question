"use server";
import { createOpenAI } from "@ai-sdk/openai";
import { createOllama } from "ollama-ai-provider";
import {
  // generateObject,
  streamObject,
} from "ai";
import { hypothesisSchema } from "./schema";
import { z } from "zod";

interface IModelOptions {
  provider: "ollama" | "openai";
  model: string;
  apiKey?: string;
  baseURL?: string;
}

const createModel = ({ provider, apiKey, baseURL, model }: IModelOptions) => {
  switch (provider) {
    case "ollama":
      return createOllama({
        baseURL,
      })(model);
    case "openai":
      if (!apiKey) throw new Error("API key is required for OpenAI provider");
      return createOpenAI({
        baseURL,
        apiKey,
      })(model, {
        structuredOutputs: true,
      });
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
};

export const analyzeContent = async (
  content: string,
  screenshot: string,
  { provider = "ollama", model: modelName, baseURL, apiKey }: IModelOptions
) => {
  const model = createModel({ provider, model: modelName, baseURL, apiKey });
  // const result = generateObject({
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
  // return Response.json((await result).object);
};
