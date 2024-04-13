const activeAccountId = context.accountId;
const onClick = () => {
  const gas = 300000000000000;
  const deposit = 10000000000000000000000;
  Near.call([
    {
      contractName: "genadrop-contract.nftgen.near",
      methodName: "nft_mint",
      args: {
        token_id: `${Date.now()}`,
        metadata: {
          title: "test",
          description: "testing",
          media: `https://ipfs.io/ipfs/bafkreie6g22yhzlvdpeovkedlkhemjs6qxxqw5rpua67yj3tjww73r6fui`,
          reference: `ipfs://bafkreie6g22yhzlvdpeovkedlkhemjs6qxxqw5rpua67yj3tjww73r6fui`,
        },
        receiver_id: activeAccountId,
      },
      gas: gas,
      deposit: deposit,
    },
  ]);
};
return (
  <button type="button" onClick={onClick} class="btn btn-primary">
    Mint NFT
  </button>
);
