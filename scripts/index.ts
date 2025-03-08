import {
  cancel,
  intro,
  isCancel,
  outro,
  select,
  tasks,
  text,
} from "@clack/prompts";
import { getPageContent } from "./crawler";
import { analyzeContent } from "./analyze";

async function main() {
  intro("A/B Testing Suggestions Generator");

  const url = await text({
    message:
      "Enter the URL of the page you want to generate A/B testing suggestions for:",
  });

  if (isCancel(url)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  const providers: {
    [key: string]: { url: string };
  } = {
    ollama: {
      url: process.env.OLLAMA_API_URL || "http://rainforest-mini.local:11434",
    },
    openai: { url: process.env.OPENAI_API_URL || "https://api.openai.com/v1" },
  };
  const model = await select({
    message: "Choose a language model to analyze the content:",
    options: [
      {
        label: "llama 3.2",
        value: {
          provider: "ollama",
          model: "llama3.2:latest",
        },
      },
      {
        label: "Phi 4",
        value: {
          provider: "ollama",
          model: "phi4:latest",
        },
      },
    ],
  });

  if (isCancel(model)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }
  if (!(model.provider in providers)) {
    throw new Error(`Provider ${model.provider} not found.`);
  }

  const provider = providers[model.provider];

  let content: string;

  try {
    await tasks([
      {
        title: "Crawling the page",
        task: async () => {
          content = await getPageContent(url);
          return `Page crawled successfully. Content length: ${content.length} characters`;
        },
      },
      {
        title: "Analyzing the content",
        task: async () => {
          await analyzeContent(content, provider.url, model.model);
        },
      },
    ]);
  } catch (error) {
    cancel(`Operation failed: ${(error as Error).message}`);
    process.exit(1);
  }

  outro("Suggestions saved to suggestions.json");
}

main().catch(console.error);
