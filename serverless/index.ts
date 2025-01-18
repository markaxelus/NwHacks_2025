import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";
import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";
import {
  // EXTRACT_KEY_INFO_PROMPT,
  GENERATE_MERMAID_PROMPT,
  GENERATE_SUMMARY_PROMPT,
} from "./systemPrompts.ts";

dotenv.config();

const client = new SSMClient({});

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

export async function handler(event: any) {
  try {
    const props: Props = JSON.parse(event.body);
    const aiModel = await getAiModel();

    const keyInfoPrompt = getSystemPrompt(
      { inputText: props.inputText },
      GENERATE_MERMAID_PROMPT.template
    );

    // delete this line
    console.log("First AI prompt:", keyInfoPrompt);

    const firstResponse = await aiModel.invoke([
      { role: "system", content: keyInfoPrompt },
    ]);

    const keyInfoOutput =
      typeof firstResponse.content === "string"
        ? firstResponse.content
        : JSON.stringify(firstResponse.content);

    // delete this line
    console.log("First AI response:", keyInfoOutput);

    // const diagramPrompt = getSystemPrompt(
    //   { extractedInfo: keyInfoOutput },
    //   GENERATE_MERMAID_PROMPT.template
    // );

    // const diagramResponse = await aiModel.invoke([
    //   { role: "system", content: diagramPrompt },
    // ]);

    // const diagramOutput = diagramResponse.content;

    // // delete this line
    // console.log("Second AI response:", diagramOutput);

    const summaryPrompt = getSystemPrompt(
      { extractedInfo: keyInfoOutput },
      GENERATE_SUMMARY_PROMPT.template
    );

    const summaryResponse = await aiModel.invoke([
      { role: "system", content: summaryPrompt },
    ]);

    const summaryOutput = summaryResponse.content;

    // delete this line
    console.log("Third AI response:", summaryOutput);

    return {
      statusCode: 200,
      body: JSON.stringify({
        firstOutput: keyInfoOutput,
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
