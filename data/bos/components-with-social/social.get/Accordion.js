const profile = Social.get("mob.near/profile/*");
const strucateString = (str) => {
  if (str.length > 200) {
    return str.slice(0, 200) + "...";
  } else {
    return str;
  }
};
return (
  <div class="accordion" id="accordionExample">
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button
          class="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseOne"
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          {profile.name}
        </button>
      </h2>
      <div
        id="collapseOne"
        class="accordion-collapse collapse show"
        aria-labelledby="headingOne"
        data-bs-parent="#accordionExample"
      >
        <div class="accordion-body">{strucateString(profile.description)}</div>
      </div>
    </div>
  </div>
);
