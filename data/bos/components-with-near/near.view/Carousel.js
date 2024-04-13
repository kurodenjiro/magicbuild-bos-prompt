const allRegistrations = Near.view(
  "lists.potlock.near",
  "get_registrations_for_list",
  {
    list_id: 1,
  }
);
const projects = useMemo(() => {
  if (!isRegistryAdmin) {
    return allRegistrations.filter(
      (registration) => registration.status === "Approved"
    );
  }
  allRegistrations.sort((a, b) => b.submitted_ms - a.submitted_ms);
  return allRegistrations;
}, allRegistrations);
const featuredProjectIds = [
  "magicbuild.near",
  "potlock.near",
  "yearofchef.near",
  "publicgoodspodcast.near",
  "near-india.near",
  "onboarddao.sputnik-dao.near",
];
const featuredProjects = useMemo(
  () =>
    projects.filter((project) =>
      featuredProjectIds.includes(project.registrant_id)
    ),
  projects
);
const data = Social.getr(`${featuredProjectIds[0]}/profile`);

return (
  <div id="carouselExample" class="carousel slide">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img
          src={`https://ipfs.near.social/ipfs/${data.backgroundImage.ipfs_cid}`}
          class="d-block w-100"
          alt="background"
          style={{ height: "300px" }}
        />
      </div>
      {featuredProjectIds.slice(1, 5).map((dt, key) => {
        const profile = Social.getr(`${dt}/profile`);
        return (
          <div class="carousel-item">
            <img
              src={`https://ipfs.near.social/ipfs/${profile.backgroundImage.ipfs_cid}`}
              class="d-block w-100"
              alt="background"
              style={{ height: "300px" }}
            />
          </div>
        );
      })}
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
