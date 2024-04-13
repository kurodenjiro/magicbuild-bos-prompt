const profile = Social.getr("magicbuild.near/profile/*");
if (profile == null) null;

return (
  profile&&<img
  src={`https://ipfs.near.social/ipfs/${profile.image.ipfs_cid}`}
  class="rounded-circle"
  style={{ width: "150px" }}
  alt="Avatar"
/>
);