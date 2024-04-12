import { Near, keyStores } from 'near-api-js'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const  parseContract  = require('near-contract-parser')

const near = new Near({
  networkId: 'mainnet',
  keyStore: new keyStores.InMemoryKeyStore(),
  nodeUrl: 'https://rpc.mainnet.near.org',
  walletUrl: 'https://wallet.mainnet.near.org',
  helperUrl: 'https://helper.mainnet.near.org',
  explorerUrl: 'https://explorer.mainnet.near.org',
});

(async () => {
  const account_id = 'chatme.near';
  const { code_base64 } = await near.connection.provider.query({
    account_id,
    finality: 'final',
    request_type: 'view_code',
  });
  
  console.log(await parseContract.parseContract(code_base64));
})();