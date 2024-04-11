const activeAccountId = context.accountId;
const onClick = () => {
  const gas = 300000000000000;
  const deposit = 10000000000000000000000;
  Near.call([
    {
      contractName: "nft_delegate.joychi.testnet",
      methodName: "nft_mint",
      args: {
        token_id: "1",
        metadata: {
          title: "Dragon black",
          description: "Dragon power",
          media:
            "https://ipfs.io/ipfs/bafkreie6g22yhzlvdpeovkedlkhemjs6qxxqw5rpua67yj3tjww73r6fui",
          issued_at: Date.now(),
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
