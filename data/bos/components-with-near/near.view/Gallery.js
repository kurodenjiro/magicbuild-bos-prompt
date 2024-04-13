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
  
  return (
    <div class="row">
      <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
        {featuredProjects.map((dt, key) => {
          const data = Social.getr(`${dt.registrant_id}/profile`);
          console.log(data.backgroundImage.ipfs_cid);
          return (
            <img
              src={`https://ipfs.near.social/ipfs/${data.backgroundImage.ipfs_cid}`}
              class="w-100 shadow-1-strong rounded mb-4"
              alt="Boat on Calm Water"
            />
          );
        })}
      </div>
    </div>
);  