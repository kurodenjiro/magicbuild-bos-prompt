
import {
    RecursiveCharacterTextSplitter,
} from "langchain/text_splitter";
import { readFileSync } from "fs"
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { HNSWLib } from 'langchain/vectorstores/hnswlib'
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import fs from 'fs';

import { } from 'dotenv/config'


const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const filePath = '../data/bos/output.json'; 

const rawData = fs.readFileSync(filePath, 'utf8');
const jsonData = JSON.parse(rawData);

// Extract the 'content' field from each item
const contentArray = jsonData.map(item => item.content);

let jsLoader = []
for (const data of jsonData) {
    console.log(data.content)
    jsLoader.push(data.content)
}
const javascriptSplitter = RecursiveCharacterTextSplitter.fromLanguage("js", {
    chunkSize: 2000,
    chunkOverlap: 200,
});
const docs = await javascriptSplitter.createDocuments(jsLoader);
// Define the path to the repo to perform RAG on.
// const REPO_PATH = "../data/bos/js";
// const loader = new DirectoryLoader(REPO_PATH, {
//     ".js": (path) => new TextLoader(path),
// });
// const docs2 = await loader.load();

//const texts = await javascriptSplitter.splitDocuments(docs2);


const overview = readFileSync('../data/bos/overview.md', { encoding: 'utf8', flag: 'r' });
const quickstart = readFileSync('../data/bos/tutorial/quickstart.md', { encoding: 'utf8', flag: 'r' });
const helloNear = readFileSync('../data/bos/tutorial/hello-near.md', { encoding: 'utf8', flag: 'r' });
const helloLido = readFileSync('../data/bos/tutorial/hello-lido.md', { encoding: 'utf8', flag: 'r' });
const designSystem = readFileSync('../data/bos/tutorial/design-system.md', { encoding: 'utf8', flag: 'r' });
const bosEthersjs = readFileSync('../data/bos/tutorial/bos-ethersjs.md', { encoding: 'utf8', flag: 'r' });
const bosEthersjsBestPractices = readFileSync('../data/bos/tutorial/bos-ethersjs-best-practices.md', { encoding: 'utf8', flag: 'r' });
const near = readFileSync('../data/bos/api/near.md', { encoding: 'utf8', flag: 'r' });
const builtinComponents = readFileSync('../data/bos/api/builtin-components.md', { encoding: 'utf8', flag: 'r' });
const notifications = readFileSync('../data/bos/api/notifications.md', { encoding: 'utf8', flag: 'r' });
const primitives = readFileSync('../data/bos/api/primitives.md', { encoding: 'utf8', flag: 'r' });
const social = readFileSync('../data/bos/api/social.md', { encoding: 'utf8', flag: 'r' });
const state = readFileSync('../data/bos/api/state.md', { encoding: 'utf8', flag: 'r' });
const webMethods = readFileSync('../data/bos/api/web-methods.md', { encoding: 'utf8', flag: 'r' });
const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
    chunkSize: 500,
    chunkOverlap: 0,
});
const docs1 = await splitter.createDocuments([overview, quickstart, helloNear, helloLido, designSystem, bosEthersjs, bosEthersjsBestPractices, near, builtinComponents, notifications, primitives, social, state, webMethods]);
// const blockchainType = {
//     NEAR_MAINNET: "mainnet",
//     NEAR_TESTNET: "testnet",
// };
// const loaderMintbase = new MintBaseLoader(["mint.yearofchef.near"], "omni-site", blockchainType.NEAR_MAINNET);
// const docs3 = await loaderMintbase.load();

docs.concat(docs1)
//docs.concat(docs2)

//docs.concat(docs3)

const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings({ apiKey: OPENAI_API_KEY }));
vectorStore.save(`BOS-js`);
