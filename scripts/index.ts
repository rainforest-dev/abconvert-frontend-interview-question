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
import { analyzeContent, type ProviderType } from "./analyze";
import { outputPath } from "./config";

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

  const model = await select({
    message: "Choose a language model to analyze the content:",
    options: [
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
    ],
  });

  if (isCancel(model)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  let content: string;
  let screenshot: string;

  try {
    await tasks([
      {
        title: "Crawling the page",
        task: async () => {
          [content, screenshot] = await getPageContent(url);
          return `Page crawled successfully. Content length: ${content.length} characters`;
        },
      },
      {
        title: "Analyzing the content",
        task: async () => {
          await analyzeContent(
            content,
            screenshot,
            model.provider,
            model.model
          );
        },
      },
    ]);
  } catch (error) {
    cancel(`Operation failed: ${(error as Error).message}`);
    process.exit(1);
  }

  outro(`Suggestions saved to ${outputPath("suggestions.json")}`);
}

main().catch(console.error);
