State.init({
    pool: "",
    amount: "",
    isCheck: false,
  });
  const poolChange = (e) => {
    State.update({
      pool: e.target.value,
    });
  };
  const amountChange = (e) => {
    State.update({
      amount: e.target.value,
    });
  };
  const isCheck = () => {
    State.update({
      isCheck: !isCheck,
    });
  };
  return (
    <div>
      <div class="mb-3">
        <label for="pool" class="form-label">
          Email address
        </label>
        <input autocomplete
          type="email"
          class="form-control"
          id="pool"
          onChange={poolChange}
          value={state.pool}
        />
      </div>
      <div class="mb-3">
        <label for="amount" class="form-label">
          Password
        </label>
        <input autocomplete
          type="text"
          onChange={amountChange}
          value={state.amount}
          class="form-control"
          id="amount"
        />
      </div>
      <div class="mb-3 form-check">
        <input
          onChange={isCheck}
          type="checkbox"
          class="form-check-input"
          id="verify"
        />
        <label class="form-check-label" for="verify">
          Check me out
        </label>
      </div>
      <button type="submit" class="btn btn-primary">
        Stake
      </button>
    </div>
  );  