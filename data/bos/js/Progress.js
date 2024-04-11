State.init({
    progress: props.progress || "50%",
  });
return (
    <>
      <div
        class="progress mt-2"
        role="progressbar"
        aria-label="Basic example"
        aria-valuenow="0"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div class="progress-bar" style={{ width: state.progress }}></div>
      </div>
    </>
);  