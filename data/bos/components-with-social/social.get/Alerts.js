const profile = Social.get("mob.near/profile/*");
const strucateString = (str) => {
  if (str.length > 200) {
    return str.slice(0, 200) + "...";
  } else {
    return str;
  }
};
return (
  <div class="alert alert-primary" role="alert">
    {strucateString(profile.description)}
  </div>
);
