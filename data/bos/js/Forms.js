State.init({
    email: "",
    pass: "",
    isCheck: false,
  });
  const emailChange = (e) => {
    State.update({
      email: e.target.value,
    });
  };
  const passChange = (e) => {
    State.update({
      pass: e.target.value,
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
        <label for="exampleInputEmail1" class="form-label">
          Email address
        </label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={emailChange}
          value={state.email}
        />
        <div id="emailHelp" class="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">
          Password
        </label>
        <input
          type="password"
          onChange={passChange}
          value={state.pass}
          class="form-control"
          id="exampleInputPassword1"
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
      <button type="submit" class="btn btn-primary">
        Submit
      </button>
    </div>
  );  