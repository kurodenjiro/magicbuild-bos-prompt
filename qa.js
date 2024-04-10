import { ChatOpenAI } from "@langchain/openai";
import { BufferMemory } from "langchain/memory";

import {
    ChatPromptTemplate,
    MessagesPlaceholder,
    AIMessagePromptTemplate,
    HumanMessagePromptTemplate,
} from "langchain/prompts";
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { RunnableSequence ,RunnableLambda} from "@langchain/core/runnables";
import { formatDocumentsAsString } from "langchain/util/document";
import { createRetrieverTool } from "langchain/tools/retriever";
import { BaseMessage } from "langchain/schema";
import { HNSWLib } from 'langchain/vectorstores/hnswlib'
import { StringOutputParser } from "@langchain/core/output_parsers";
import { } from 'dotenv/config'


async function run() {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    const model = new ChatOpenAI({ modelName: "gpt-4-turbo-preview", temperature: 0.3, openAIApiKey: OPENAI_API_KEY }).pipe(
        new StringOutputParser()
    );
    
    const memory = new BufferMemory({
        returnMessages: true, // Return stored messages as instances of `BaseMessage`
        memoryKey: "chat_history", // This must match up with our prompt template input variable.
    });
    const vectorStore = await HNSWLib.load(
        "./eval/BOS-js",
        new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY }),
    );
    const retriever = vectorStore.asRetriever()
    // const tool = await createRetrieverTool(retriever, {
    //     name: "BOS",
    //     description: "BOS information.",
    // });
    
    // const tools = [tool];
    
    const systemPrompt = `You're a frontend web developer that specializes in BOS. Given a description or an image, generate HTML with bootstrap. It should render nicely on desktop, tablet, and mobile. Keep your responses concise and just return HTML that would appear in the <body> no need for <head>. Use placehold.co for placeholder images. If the user asks for interactivity, use modern ES6 javascript and BOS component to handle events.
    \n\nAlways start your response with frontmatter wrapped in ---.  Set name: with a 2 to 5 word description of the component. Set emoji: with an emoji for the component, i.e.:
    ---
    name: Fancy Button
    emoji: 🎉
    ---
    
    <button type="button" class="btn btn-primary">Click Me</button>\n\n`
    
    const questionGeneratorTemplate = ChatPromptTemplate.fromMessages([
        AIMessagePromptTemplate.fromTemplate(
            systemPrompt
        ),
        new MessagesPlaceholder("chat_history"),
        AIMessagePromptTemplate.fromTemplate(`{question}`),
    ]);
    
    
    const conversationalQaChain = RunnableSequence.from([
        RunnableLambda.from((input) => input.question),
        {
            
            question: (i) => i.question,
            chat_history: async () => {
                const { chat_history } = await memory.loadMemoryVariables({});
                return chat_history;
            },
            context: async (output) => {
                const relevantDocs = await retriever.getRelevantDocuments(output);
                return formatDocumentsAsString(relevantDocs);
              },
        },
        questionGeneratorTemplate,
        model,
        new StringOutputParser(),
    ]);
    
    const html = `<form>
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
    </div>
    <div class="form-check">
      <input type="checkbox" class="form-check-input" id="exampleCheck1">
      <label class="form-check-label" for="exampleCheck1">Check me out</label>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    </form>`
    
    const combineDocumentsPrompt = ChatPromptTemplate.fromMessages([
        AIMessagePromptTemplate.fromTemplate(
            `You're a frontend web developer that specializes in bootstrap. Given a description or an image, generate HTML with bootstrap. You should support both dark and light mode. It should render nicely on desktop, tablet, and mobile. Keep your responses concise and just return HTML that would appear in the <body> no need for <head>. Use placehold.co for placeholder images. If the user asks for interactivity, use modern ES6 javascript and native browser apis to handle events.`
        ),
        new MessagesPlaceholder("chat_history"),
        HumanMessagePromptTemplate.fromTemplate(`Given the following HTML:${html}\n\n{question}`),
    ]);
    
    const combineDocumentsChain = RunnableSequence.from([
        RunnableLambda.from((input) => input.question),
        {
            question: (output) => output,
            chat_history: async () => {
                const { chat_history } = await memory.loadMemoryVariables({});
                return chat_history;
            },
            context: async (output) => {
                const relevantDocs = await retriever.getRelevantDocuments(output);
                return formatDocumentsAsString(relevantDocs);
            },
        },
        combineDocumentsPrompt,
        model,
        new StringOutputParser(),
    ]);
    
    
    const question = "create button hit me";
    const result = await combineDocumentsChain.invoke({
        question,
    });
    
    // await memory.saveContext(
    //     {
    //       input: question,
    //     },
    //     {
    //       output: result,
    //     }
    //   );
    console.log(result);
}
run()