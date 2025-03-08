import * as fs from "fs";
import messages from "./messages.json";

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

interface IResponse {
  model: string;
  created_at: string;
  message: {
    role: string;
    content: string;
  };
}

export async function analyzeContent(
  content: string,
  url: string,
  model: string
) {
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
    const data = (await res.json()) as IResponse;
    // save result to json file
    fs.writeFileSync(
      "suggestions.json",
      JSON.stringify(JSON.parse(data.message.content).suggestions, null, 2)
    );
  } else {
    throw new Error(
      `Failed to analyze content: ${res.statusText} ${await res.text()}`
    );
  }
}
