import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";
import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";
import {
  EXTRACT_KEY_INFO_PROMPT,
  GENERATE_MERMAID_PROMPT,
} from "./systemPrompts.ts";

dotenv.config();

const client = new SSMClient({ region: "us-east-1" });

interface Props {
  inputText: string;
}

function getSystemPrompt(
  inputVariables: Record<string, string>,
  template: string
): string {
  let filledTemplate = template;
  for (const [key, value] of Object.entries(inputVariables)) {
    if (!template.includes(`{${key}}`)) {
      throw new Error(`Template does not contain variable {${key}}`);
    }
    filledTemplate = filledTemplate.replace(`{${key}}`, value);
  }
  return filledTemplate;
}

async function getAiModel() {
  let openAiApiKey = process.env.OPENAI_API_KEY;

  if (!openAiApiKey) {
    throw new Error("OPENAI_API_KEY is not set");
  }

  if (process.env.OPENAI_API_KEY_SSM_PATH) {
    try {
      const response = await client.send(
        new GetParameterCommand({
          Name: process.env.OPENAI_API_KEY_SSM_PATH,
          WithDecryption: true,
        })
      );
      openAiApiKey = response.Parameter?.Value;
    } catch (error) {
      console.error("Error fetching OpenAI API key from SSM", error);
      throw error;
    }
  }
  return new ChatOpenAI({
    model: "gpt-4o",
    apiKey: openAiApiKey,
  });
}
