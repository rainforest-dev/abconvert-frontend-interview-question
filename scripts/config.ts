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
