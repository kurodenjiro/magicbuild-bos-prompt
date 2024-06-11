import { OpenAI } from "langchain/llms/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { RetrievalQAChain, loadQARefineChain } from "langchain/chains";
import { } from 'dotenv/config'
import {
    RunnablePassthrough,
    RunnableSequence,
} from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
} from "@langchain/core/prompts";

import { formatDocumentsAsString } from "langchain/util/document";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const model = new OpenAI({ apiKey: OPENAI_API_KEY, temperature: 0.1 });



async function getAnswer() {
    let question_arg = process.argv.slice(2);
    let question = ""
    if(question_arg[0]){
        question = question_arg[0]
    }else{
        question= "create dance button"
    }
    console.log(question_arg[0]);
    // Load Mintbase VectorDB
    const mintbaseStore = await HNSWLib.load(
        "./eval/mintbase",
        new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY }),
    );
    // Search for the most similar document

    // Load the vector store BOS
    const vectorStore = await HNSWLib.load(
        "./eval/BOS",
        new OpenAIEmbeddings({ apiKey: OPENAI_API_KEY }),
    );

    // Add docs to vectorDB BOS
    const retrieverNFT = await mintbaseStore.similaritySearchWithScore(question, 10);
    let docsNFT = []
    for (const retriever of retrieverNFT) {
        if (retriever[1] < 0.2) {
            docsNFT.push(retriever[0])
        }
    }
    if (docsNFT.length > 0) {
        vectorStore.addDocuments(docsNFT)
    }



    // Initialize a retriever wrapper around the vector store
    const vectorStoreRetriever = vectorStore.asRetriever();

    // Create a system & human prompt for the chat model
    const SYSTEM_TEMPLATE = `You're a frontend web developer that specializes in BOS. Given a description or an image, generate JSX code using HTML with bootstrap. It should render nicely on desktop, tablet, and mobile. Keep your responses concise and just return HTML that would appear in the <body> no need for <head> . Use placehold.co for placeholder images. If the user asks for interactivity, use modern ES6 javascript and BOS component to handle events.
    Do not use React component , The Document Object or vanilla javascript.
    Always start your response with frontmatter wrapped in ---.  Set name: with a 2 to 5 word description of the component. Set emoji: with an emoji for the component, i.e.:
   
    ---
    name: Fancy Button
    emoji: 🎉
    ---

    
    return {context}
    
    `

    // STEP 3: Get the answer
    const messages = [
        SystemMessagePromptTemplate.fromTemplate(SYSTEM_TEMPLATE),
        HumanMessagePromptTemplate.fromTemplate("{question}"),
    ];
    const prompt = ChatPromptTemplate.fromMessages(messages);
    const chain = RunnableSequence.from([
        {
            context: vectorStoreRetriever.pipe(formatDocumentsAsString),
            question: new RunnablePassthrough(),
        },
        prompt,
        model,
        new StringOutputParser(),
    ]);
    const answer = await chain.invoke(
        question
    );
    console.log(answer)
}
getAnswer()
