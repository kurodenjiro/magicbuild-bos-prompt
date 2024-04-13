const profile = Social.getr("magicbuild.near/profile");

return (
  <ul class="list-group">
    {Object.keys(profile.tags).map((item) => {
      return <li class="list-group-item">{item}</li>;
    })}
  </ul>
);
