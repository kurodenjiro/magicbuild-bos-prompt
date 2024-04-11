import { ChatOpenAI } from "@langchain/openai";
import { DynamicTool } from "@langchain/core/tools";
import {
    ChatPromptTemplate,
    MessagesPlaceholder,
} from "@langchain/core/prompts";
import { convertToOpenAIFunction } from "@langchain/core/utils/function_calling";
import { RunnableSequence } from "@langchain/core/runnables";
import { AgentExecutor } from "langchain/agents";

import { formatToOpenAIFunctionMessages } from "langchain/agents/format_scratchpad";
import { OpenAIFunctionsAgentOutputParser } from "langchain/agents/openai/output_parser";
import { } from 'dotenv/config'
import { formatDocumentsAsString } from "langchain/util/document";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
/**
 * Define your chat model to use.
 */
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const model = new ChatOpenAI({
    openAIApiKey: OPENAI_API_KEY,
    temperature: 0,
});
const customTool = new DynamicTool({
    name: "get_word_length",
    description: "Returns the length of a word.",
    func: async (input) => input.length.toString(),
});

/** Define your list of tools. */
const tools = [customTool];
const SYSTEM_TEMPLATE = `You're a frontend web developer that specializes in BOS. Given a description or an image, generate HTML with bootstrap. It should render nicely on desktop, tablet, and mobile. Keep your responses concise and just return HTML that would appear in the <body> no need for <head>. Use placehold.co , ipfs.io for placeholder images. If the user asks for interactivity, use modern ES6 javascript and BOS component to handle events.
Don not use react component , The Document Object or vanilla javascript 
\n\nAlways start your response with frontmatter wrapped in ---.  Set name: with a 2 to 5 word description of the component. Set emoji: with an emoji for the component, i.e.:
---
name: Fancy Button
emoji: 🎉
---

{context}\n\n`
const prompt = ChatPromptTemplate.fromMessages([
    ["system", SYSTEM_TEMPLATE],
    ["human", "{input}"],
    new MessagesPlaceholder("agent_scratchpad"),
]);
const modelWithFunctions = model.bind({
    functions: tools.map((tool) => convertToOpenAIFunction(tool)),
});
// STEP 1: Load the vector store
const vectorStore = await HNSWLib.load(
    "./eval/BOS-js",
    new OpenAIEmbeddings({ apiKey: OPENAI_API_KEY }),
);

// Initialize a retriever wrapper around the vector store
 
const vectorStoreRetriever = vectorStore.asRetriever();
const runnableAgent = RunnableSequence.from([
    {
      input: (i) => i.input,
      context: (i)=> console.log(vectorStoreRetriever.pipe(formatDocumentsAsString)),
      agent_scratchpad: (i) =>
        formatToOpenAIFunctionMessages(i.steps),
    },
    prompt,
    modelWithFunctions,
    new OpenAIFunctionsAgentOutputParser(),
  ]);
  
  const executor = AgentExecutor.fromAgentAndTools({
    agent: runnableAgent,
    tools,
  });
  const input = "How many letters in the word educa?";
  const result = await executor.invoke({
    input,
  });
  console.log(result)