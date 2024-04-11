import { Document } from "@langchain/core/documents";
import { BaseDocumentLoader } from "langchain/document_loaders/base.js";

type JSONPrimitive = string | number | boolean | null;
type JSONValue = JSONPrimitive | JSONObject | JSONArray;
interface JSONObject {
    [key: string]: JSONValue;
}
interface JSONArray extends Array<JSONValue> {
}
/**
 * MintbaseParameters Type Definition.
 *
 * For more parameters and supported search engines, refer specific engine documentation:
 * Mintbase Graph - https://docs.mintbase.xyz/dev/mintbase-graph
 *
 */
type contractAddress = string;
type apiKey = string;
type blockchainType = string;
/**
 * Class representing a document loader for loading search results from
 * the Mintbase. It extends the BaseDocumentLoader class.
 * @example
 * ```typescript
 * const BlockchainType = {
 *  NEAR_MAINNET: "mainnet",
 *  NEAR_TESTNET: "testnet",
 *};
 * const loader = new MintBaseLoader({
 *   contractAddress: "{contractAddress}",
 *   apiKey: "{apiKey}",
 *   blockchainType: "{blockchainType.NEAR_MAINNET}",
 * });
 * const docs = await loader.load();
 * ```
 */
export declare class MintBaseLoader extends BaseDocumentLoader {
    private apiKey;
    private contractAddress;
    constructor(contractAddress: contractAddress,apiKey:apiKey,blockchainType:blockchainType);

    /**
     * Extracts documents from the provided output.
     * @param output - The output to extract documents from.
     * @returns An array of Documents.
     */
    private extractDocuments;

    /**
     * Fetches the data from the provided URL and returns it as a JSON object.
     * If an error occurs during the fetch operation, an exception is thrown with the error message.
     * @param url - The URL to fetch data from.
     * @returns A promise that resolves to the fetched data as a JSON object.
     * @throws An error if the fetch operation fails.
     */
    private fetchData;
    /**
     * Loads the search results from the Mintbase.
     * @returns An array of Documents representing the search results.
     * @throws An error if the search results could not be loaded.
     */
    load(): Promise<Document[]>;
}
export {};