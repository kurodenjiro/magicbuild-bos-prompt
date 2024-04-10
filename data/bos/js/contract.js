const contract = "hello.near-examples.near";
const greeting = Near.view(contract, "get_greeting", {});

// Define components
const greetingForm = (
  <>
    <div className="border border-black p-3">
      <label>Update greeting</label>
      <input placeholder="Howdy" onChange={onInputChange} />
      <button className="btn btn-primary mt-2" onClick={onBtnClick}>
        Save
      </button>
    </div>
  </>
);

const notLoggedInWarning = <p> Login to change the greeting </p>;

// Render
return (
  <>
    <div className="container border border-info p-3">
      <h3 className="text-center">
        The contract says:
        <span className="text-decoration-underline"> {greeting} </span>
      </h3>

      <p className="text-center py-2">
        Look at that! A greeting stored on the NEAR blockchain.
      </p>

      {context.accountId ? greetingForm : notLoggedInWarning}
    </div>
  </>
);