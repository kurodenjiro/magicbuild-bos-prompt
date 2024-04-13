const url_ipfs = "https://ipfs.near.social/ipfs";
State.init({
  image1: `${url_ipfs}/bafybeifiokiandwndlllcuhmop6b73jjfyv3dyemirhsb5gfairkfostne`,
  image2: `${url_ipfs}/bafybeicaxmzwvs7gkavzhdzrnh46wbyelanbe2ta5jn6fnsemo2wxn6com`,
  image3: `${url_ipfs}/bafybeieubru2l2dndprxr6xbgc455bhxycfo5uimrg7xhnc6lxunmfyvoq`,
  image4: `${url_ipfs}/bafkreiawagh7spkq334jdjbmyonbty3o7i2omeriw5gkeo25gaytnp7k2i`,
  image5: `${url_ipfs}/bafkreiehyd7jeyvnd2fdivz7s5dxw3dtslcimbxpsqkrjizsoxejyrt474`,
  image6: `${url_ipfs}/bafkreibxfndju3h4jdfmwzytv44vbj6xsqczsisorfu7t6wyq726ata7zi`,
});

return (
  <div class="row">
    <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
      <img
        src={state.image1}
        class="w-100 shadow-1-strong rounded mb-4"
        alt="Boat on Calm Water"
      />

      <img
        src={state.image2}
        class="w-100 shadow-1-strong rounded mb-4"
        alt="Wintry Mountain Landscape"
      />
    </div>

    <div class="col-lg-4 mb-4 mb-lg-0">
      <img
        src={state.image3}
        class="w-100 shadow-1-strong rounded mb-4"
        alt="Mountains in the Clouds"
      />

      <img
        src={state.image4}
        class="w-100 shadow-1-strong rounded mb-4"
        alt="Boat on Calm Water"
      />
    </div>

    <div class="col-lg-4 mb-4 mb-lg-0">
      <img
        src={state.image5}
        class="w-100 shadow-1-strong rounded mb-4"
        alt="Waves at Sea"
      />

      <img
        src={state.image6}
        class="w-100 shadow-1-strong rounded mb-4"
        alt="Yosemite National Park"
      />
    </div>
  </div>
);
