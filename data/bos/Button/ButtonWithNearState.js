State.init({
    count: 0,
  });
  const onClick = () => {
    State.count + 1;
  };
  return (
    <button type="button" onClick={onClick} class="btn btn-primary">
      Count
    </button>
);  