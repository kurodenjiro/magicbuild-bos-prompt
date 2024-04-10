
import {
    RecursiveCharacterTextSplitter,
} from "langchain/text_splitter";
import { readFileSync } from "fs"
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { HNSWLib } from 'langchain/vectorstores/hnswlib'
import { } from 'dotenv/config'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

console.log(OPENAI_API_KEY)
    const overview = readFileSync('../data/bos/overview.md', { encoding: 'utf8', flag: 'r' });
    const quickstart = readFileSync('../data/bos/tutorial/quickstart.md', { encoding: 'utf8', flag: 'r' });
    const helloNear = readFileSync('../data/bos/tutorial/hello-near.md', { encoding: 'utf8', flag: 'r' });
    const helloLido = readFileSync('../data/bos/tutorial/hello-lido.md', { encoding: 'utf8', flag: 'r' });
    const designSystem = readFileSync('../data/bos/tutorial/design-system.md', { encoding: 'utf8', flag: 'r' });
    const bosEthersjs = readFileSync('../data/bos/tutorial/bos-ethersjs.md', { encoding: 'utf8', flag: 'r' });
    const bosEthersjsBestPractices = readFileSync('../data/bos/tutorial/bos-ethersjs-best-practices.md', { encoding: 'utf8', flag: 'r' });
    const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
        chunkSize: 500,
        chunkOverlap: 0,
    });
    const docs = await splitter.createDocuments([overview, quickstart, helloNear, helloLido, designSystem, bosEthersjs, bosEthersjsBestPractices]);

    
    const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings({apiKey:OPENAI_API_KEY}));
  
    vectorStore.save(`BOS`);
