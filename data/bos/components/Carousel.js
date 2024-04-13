State.init({
    img1:
      props.image1 ||
      "https://i.pinimg.com/originals/43/af/d0/43afd01dc42127c352f1fde070cc2be0.jpg",
    img2:
      props.image2 ||
      "https://images.hdqwalls.com/wallpapers/anime-girl-sitting-on-the-top-and-watching-the-city-site-b9.jpg",
    img3:
      props.image3 ||
      "https://lh4.googleusercontent.com/proxy/DxP7M5u1VqDpK-UhG_FsNALF-_vtjvNGfMRHoVqioHGLNhRl9dD0GwaQXXVrwF_dcYvelvL8G3yUN0N58WY2y2_RoUl8U_Fh1sPefCmg5iv6F53D1BoJdhVBGyQokDu1qTFsDwsCPg",
});
return (
    <div id="carouselExample" class="carousel slide">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src={state.img1} class="d-block w-100" alt="background" />
        </div>
        <div class="carousel-item">
          <img src={state.img2} class="d-block w-100" alt="background" />
        </div>
        <div class="carousel-item">
          <img src={state.img3} class="d-block w-100" alt="background" />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
);