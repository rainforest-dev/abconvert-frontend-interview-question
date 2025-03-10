import * as path from "path";
import { createFolderIfNotExists, loadEnv } from "./utils";

loadEnv();

export const config = {
  output: process.env.OUTPUT_DIR || "./output",
  ollama: {
    url: process.env.OLLAMA_API_URL || "http://localhost:11434",
  },
  openai: {
    url: process.env.OPENAI_API_URL || "https://api.openai.com/v1",
    apiKey: process.env.OPENAI_API_KEY,
  },
};

createFolderIfNotExists(config.output);

export const outputPath = (fileName: string): string => {
  return path.join(config.output, fileName);
};

export type ProviderType = "ollama" | "openai";

export const supportedModels = [
  {
    label: "llama 3.2",
    value: {
      provider: "ollama" as ProviderType,
      model: "llama3.2-vision:latest",
    },
  },
  {
    label: "Phi 4",
    value: {
      provider: "ollama" as ProviderType,
      model: "phi4:latest",
    },
  },
  {
    label: "gpt-4o-mini",
    value: {
      provider: "openai" as ProviderType,
      model: "gpt-4o-mini",
    },
  },
];
