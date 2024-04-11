State.init({ value: "" });
const onChange = (e) => {
  State.update({ value: e.target.value });
};
return (
  <input
    type="text"
    onChange={onChange}
    value={state.value}
    class="form-control"
    placeholder="Enter text"
    aria-label="text"
  />
);
