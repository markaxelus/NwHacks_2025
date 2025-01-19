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
const BASE_PDF_PATH = `../backend/uploads/`;

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
      console.error("Error fetching OpenAI API key from SSM:", error);
      throw error;
    }
  }
  return new ChatOpenAI({
    model: "gpt-4o",
    apiKey: openAiApiKey,
  });
}

async function extractTextFromPdf(fileName: string) {
  try {
    const pdfPath = `${BASE_PDF_PATH}${fileName}`;
    console.log("Reading PDF from path:", pdfPath);

    const pdf = await fs.readFile(pdfPath);
    const text = await pdfToText(pdf);
    console.log("Successfully extracted text from:", fileName);
    return text;
  } catch (err) {
    console.error("Error reading PDF:", err);
    throw err;
  }
}

export async function handler(event: any) {
  try {
/*     console.log("Lambda received event:", JSON.stringify(event, null, 2));
 */
    // Safely parse event.body if it's a string
    let body: any;
    if (typeof event.body === "string") {
      body = JSON.parse(event.body);
    } else {
      body = event.body || {};
    }

    // Extract fileName from the body
    const { fileName } = body;
    if (!fileName) {
      throw new Error("File name is required in the request body (fileName).");
    }
/*     console.log("Requested file name:", fileName);
 */
    // Get AI model
    const aiModel = await getAiModel();

    // Extract text from the specified PDF
    const text = await extractTextFromPdf(fileName);

    // 1) Generate Mermaid diagram
    const diagramPrompt = getSystemPrompt(
      { inputText: text },
      GENERATE_MERMAID_PROMPT.template
    );
    const diagramResponse = await aiModel.invoke([
      { role: "system", content: diagramPrompt },
    ]);
    const diagramOutput =
      typeof diagramResponse.content === "string"
        ? diagramResponse.content
        : JSON.stringify(diagramResponse.content);

    // 2) Generate summary
    const summaryPrompt = getSystemPrompt(
      { extractedInfo: diagramOutput },
      GENERATE_SUMMARY_PROMPT.template
    );
    const summaryResponse = await aiModel.invoke([
      { role: "system", content: summaryPrompt },
    ]);
    const summaryOutput = summaryResponse.content;
    console.log("Summary output:", summaryOutput);

    // Return combined output
    return {
      statusCode: 200,
      body: JSON.stringify({
        firstOutput: diagramOutput,
        secondOutput: summaryOutput,
      }),
    };
  } catch (error: any) {
    console.error("Error in Lambda execution:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message || "Unknown error occurred",
      }),
    };
  }
}
