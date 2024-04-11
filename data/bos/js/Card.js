State.init({
    background:
      props.background ||
      "https://wallpapers.com/images/featured/anime-4k-background-m1fnxjihqd7ot7lo.jpg",
});
return (
    <div class="card" style={{ width: "18rem" }}>
      <img src={state.background} class="card-img-top" alt="background" />
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">
          Some quick example text to build on the card title and make up the bulk
          of the card's content.
        </p>
        <a href="#" class="btn btn-primary">
          Go somewhere
        </a>
      </div>
    </div>
);  