
import {
    RecursiveCharacterTextSplitter,
} from "langchain/text_splitter";
import { readFileSync } from "fs"

export const load = async () => {
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
    const output = await splitter.createDocuments([overview,quickstart,helloNear,helloLido,designSystem,bosEthersjs,bosEthersjsBestPractices]);

    console.log(JSON.stringify(output));
};
load();