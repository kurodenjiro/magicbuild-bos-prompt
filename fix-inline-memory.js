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
    MessagesPlaceholder,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
} from "@langchain/core/prompts";
import { BufferMemory } from "langchain/memory";

import { formatDocumentsAsString } from "langchain/util/document";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const model = new OpenAI({ apiKey: OPENAI_API_KEY, temperature: 0 });


async function getAnswer(question) {
    const BOS = `
    <!--FIX (1): Change poolID to potlock.near-->
    initState({ amount: "1", poolId: "zavodil.poolv1.near" });
    const onStakeClick = () => {
      const gas = 300 * 1000000000000;
      // TODO: doesn't support floats right now due to limitation of JS integers
      const deposit = parseInt(state.amount) + "000000000000000000000000";
      console.log(gas, deposit);
      Near.call(state.poolId, "deposit_and_stake", {}, gas, deposit);
    };
    return (
      <div>
        
        <h1>Stake NEAR</h1>
        <p>
          Pool: <input value={state.poolId} />
        </p>
        <p>
          Amount: <input type="number" value={state.amount} />
        </p>
        <a onClick={onStakeClick}>Stake</a>
      </div>
    );`
    // STEP 1: Load the vector store
    const vectorStore = await HNSWLib.load(
        "./eval/BOS",
        new OpenAIEmbeddings({ apiKey: OPENAI_API_KEY }),
    );

    const memory = new BufferMemory({
        returnMessages: true, // Return stored messages as instances of `BaseMessage`
        memoryKey: "chat_history", // This must match up with our prompt template input variable.
    });
    // Initialize a retriever wrapper around the vector store
    const vectorStoreRetriever = vectorStore.asRetriever();

    // Create a system & human prompt for the chat model
    const SYSTEM_TEMPLATE = `You're a frontend web developer that specializes in BOS. Given a description or an image, generate HTML with bootstrap. It should render nicely on desktop, tablet, and mobile. Keep your responses concise and just return HTML that would appear in the <body> no need for <head> . Use placehold.co for placeholder images. If the user asks for interactivity, use modern ES6 javascript and BOS component to handle events.
    Do not use React component , The Document Object or vanilla javascript. only change the code in comment as FIX

    {context}

    `
    // STEP 3: Get the answer
    const messages = [
        SystemMessagePromptTemplate.fromTemplate(SYSTEM_TEMPLATE),
        new MessagesPlaceholder("chat_history"),
        HumanMessagePromptTemplate.fromTemplate(`Given the following BOS:
        
        ${BOS.replaceAll('{','{{').replaceAll('}','}}')}
        
        {question}`),
    ];
    const prompt = ChatPromptTemplate.fromMessages(messages);
    const chain = RunnableSequence.from([
        {
            context: vectorStoreRetriever.pipe(formatDocumentsAsString),
            question: new RunnablePassthrough(),
            chat_history: async () => {
                const { chat_history } = await memory.loadMemoryVariables({});
                return chat_history;
            },
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
getAnswer(`Address the FIX comments.`)