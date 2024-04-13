State.init({
    img: props.img || "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
  });
  
return (
    <img
      src={state.img}
      class="rounded-circle"
      style={{ width: "150px" }}
      alt="Avatar"
    />
);