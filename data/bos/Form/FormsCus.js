State.init({
  fromIndex: 0,
  limit: 0,
  isCheck: false,
  data: "",
});
const fromIndex = (e) => {
  State.update({
    fromIndex: e.target.value,
  });
};
const limit = (e) => {
  State.update({
    limit: e.target.value,
  });
};
const isCheck = () => {
  State.update({
    isCheck: !isCheck,
  });
};
const handleClick = () => {
  const datas = Near.view("donate.potlock.near", "get_donations", {
    from_index: Number(state.fromIndex) || null,
    limit: Number(state.limit) || null,
  });
  State.update({ data: datas });
};

return (
  <div>
    <div class="mb-3">
      <label for="fromIndex" class="form-label">
        From Index
      </label>
      <input
        autocomplete
        type="text"
        class="form-control"
        id="fromIndex"
        onChange={fromIndex}
        value={state.fromIndex}
      />
    </div>
    <div class="mb-3">
      <label for="limit" class="form-label">
        Password
      </label>
      <input
        autocomplete
        type="text"
        onChange={limit}
        value={state.limit}
        class="form-control"
        id="limit"
      />
    </div>
    <div class="mb-3 form-check">
      <input
        onChange={isCheck}
        type="checkbox"
        class="form-check-input"
        id="exampleCheck1"
      />
      <label class="form-check-label" for="exampleCheck1">
        Check me out
      </label>
    </div>
    <button onClick={handleClick} type="submit" class="btn btn-primary">
      Submit
    </button>
  </div>
);
