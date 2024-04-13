State.init({
  nearView:"near.view",
  nearCall:"near.call",
  near:"near",
  smartContract:"smart contract",
  bos:"bos",
  web3:"web3",
  nearApiJs:"near-api-js"
})
return (
    <ul class="list-group">
      <li class="list-group-item">{state.nearView}</li>
      <li class="list-group-item">{state.nearCall}</li>
      <li class="list-group-item">{state.near}</li>
      <li class="list-group-item">{state.nearApiJs}</li>
      <li class="list-group-item">{state.smartContract}</li>
      <li class="list-group-item">{state.bos}</li>
      <li class="list-group-item">{state.web3}</li>
    </ul>
  );
  