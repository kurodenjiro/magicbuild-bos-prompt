import { OpenAI } from "langchain/llms/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { RetrievalQAChain, loadQARefineChain } from "langchain/chains";
import { SerpAPI, ChainTool } from "langchain/tools";
//https://js.langchain.com/docs/integrations/document_loaders/web_loaders/serpapi
import { } from 'dotenv/config'
import {
    RunnablePassthrough,
    RunnableSequence,
} from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { DynamicTool } from "@langchain/core/tools";
import { convertToOpenAIFunction } from "@langchain/core/utils/function_calling";
import {
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
} from "@langchain/core/prompts";
import { createRetrieverTool } from "langchain/tools/retriever";
import { formatDocumentsAsString } from "langchain/util/document";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const model = new OpenAI({ apiKey: OPENAI_API_KEY, temperature: 0.9 });

async function getAnswer(question) {

    // STEP 1: Load the vector store
    const vectorStore = await HNSWLib.load(
        "./eval/BOS",
        new OpenAIEmbeddings({ apiKey: OPENAI_API_KEY }),
    );


    // Initialize a retriever wrapper around the vector store
     
    const vectorStoreRetriever = vectorStore.asRetriever();

    const vectorStoreNFT = await HNSWLib.load(
        "./eval/mintbase",
        new OpenAIEmbeddings({ apiKey: OPENAI_API_KEY }),
    );
    
    
    const retrieverNFT = vectorStoreNFT.asRetriever();
    const toolNFT = await createRetrieverTool(retrieverNFT, {
        name: "near_nft_mainnet",
        description: "Searches contract address and returns NFT general information.",
    });

    // Create a system & human prompt for the chat model
    const SYSTEM_TEMPLATE = `You're a frontend web developer that specializes in BOS. Given a description or an image, generate HTML with bootstrap. It should render nicely on desktop, tablet, and mobile. Keep your responses concise and just return HTML that would appear in the <body> no need for <head>. Use placehold.co , NFT source image for placeholder images. If the user asks for interactivity, use modern ES6 javascript and BOS component to handle events.
    Don not use react component , The Document Object or vanilla javascript 
    \n\nAlways start your response with frontmatter wrapped in ---.  Set name: with a 2 to 5 word description of the component. Set emoji: with an emoji for the component, i.e.:
    ---
    name: Fancy Button
    emoji: 🎉
    ---
    
    {context}\n\n`

    // STEP 3: Get the answer
    const messages = [
        SystemMessagePromptTemplate.fromTemplate(SYSTEM_TEMPLATE),
        HumanMessagePromptTemplate.fromTemplate("{question}"),
    ];
    const customTool = new DynamicTool({
        name: "get_word_length",
        description: "Returns the length of a word.",
        func: async (input) => input.length.toString(),
    });
   
    
    /** Define your list of tools. */
    const tools = [customTool,toolNFT];
    const modelWithFunctions = model.bind({
        functions: tools.map((tool) => convertToOpenAIFunction(tool)),
    });
    const prompt = ChatPromptTemplate.fromMessages(messages);
    const chain = RunnableSequence.from([
        {
            context: vectorStoreRetriever.pipe(formatDocumentsAsString),
            question: new RunnablePassthrough(),
        },
        prompt,
        modelWithFunctions,
        new StringOutputParser(),
    ]);
    
    const answer = await chain.invoke(
        question
    );
    console.log(answer)
}
getAnswer(`create button with near call?`)