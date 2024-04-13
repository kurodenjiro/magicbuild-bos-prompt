
import * as nearAPI from "near-api-js";

const CONTRACT_ID = "social.near";

async function connect() {
    const config = {
        networkId: "mainnet",
        keyStore: new nearAPI.keyStores.InMemoryKeyStore(),
        nodeUrl: "https://rpc.mainnet.near.org",
        walletUrl: "https://wallet.mainnet.near.org",
        helperUrl: "https://helper.mainnet.near.org",
        explorerUrl: "https://nearblocks.io",
    };
    const near = await nearAPI.connect(config);
    const account = await near.account(CONTRACT_ID);

    const contract = new nearAPI.Contract(
        account, // the account object that is connecting
        CONTRACT_ID, // name of contract you're connecting to
        {
            viewMethods: ["get"], // view methods do not change state but usually return a value
            changeMethods: [], // change methods modify state
            sender: account, // account object to initialize and sign transactions.
        }
    );

    return contract;
}

// load data from the social-db
const contract = await connect();
const data = await contract.get({ keys: ["magicbuild.near/widget/*"] });


// output results
console.log(
    JSON.stringify({
        timestamp: Date.now(),
        data: res,
    })
);
