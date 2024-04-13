State.init({ amount: "" });
const onChange = (e) => {
  State.update({ value: e.target.amount });
};
const onStakeClick = () => {
  const gas = 300 * 1000000000000;
  // TODO: doesn't support floats right now due to limitation of JS integers
  const deposit = parseInt(state.amount) + "000000000000000000000000";
  console.log(gas, deposit);
  Near.call("zavodil.poolv1.near", "deposit_and_stake", {}, gas, deposit);
};

return (
  <>
    <input
      type="text"
      onChange={onChange}
      value={state.amount}
      class="form-control"
      placeholder="Enter amount"
      aria-label="text"
    />
    <button onClick={onStakeClick} class="btn btn-primary mt-2">
      Stake
    </button>
  </>
);
