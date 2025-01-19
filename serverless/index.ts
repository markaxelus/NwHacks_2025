import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";
import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";
import {
  GENERATE_MERMAID_PROMPT,
  GENERATE_SUMMARY_PROMPT,
} from "./systemPrompts.ts";
import { pdfToText } from "pdf-ts";
import fs from "fs/promises";

dotenv.config();

const client = new SSMClient({});

// Interface for the input properties
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

const pdfPath = `../backend/sample.pdf`;

async function extractTextFromPdf() {
  try {
    const pdf = await fs.readFile(pdfPath);
    const text = await pdfToText(pdf);
    return text;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function handler(event: any) {
  try {
    const aiModel = await getAiModel();
    const text = await extractTextFromPdf();

    const diagramPrompt = getSystemPrompt(
      { inputText: text },
      GENERATE_MERMAID_PROMPT.template
    );

    // First invocation to generate diagram
    const diagramResponse = await aiModel.invoke([
      { role: "system", content: diagramPrompt },
    ]);

    const diagramOutput =
      typeof diagramResponse.content === "string"
        ? diagramResponse.content
        : JSON.stringify(diagramResponse.content);

    // Second invocation to generate summary
    const summaryPrompt = getSystemPrompt(
      { extractedInfo: diagramOutput },
      GENERATE_SUMMARY_PROMPT.template
    );

    const summaryResponse = await aiModel.invoke([
      { role: "system", content: summaryPrompt },
    ]);

    const summaryOutput = summaryResponse.content;

    return {
      statusCode: 200,
      body: JSON.stringify({
        firstOutput: diagramOutput,
        secondOutput: summaryOutput,
      }),
    };
  } catch (error) {
    console.error("Error in Lambda execution", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
}
