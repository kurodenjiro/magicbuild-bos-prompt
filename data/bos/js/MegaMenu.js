const Menu = styled.div`
    
.navbar .megamenu{ padding: 1rem; }

@media all and (min-width: 992px) {

  .navbar .has-megamenu{position:static!important;}
  .navbar .megamenu{left:0; right:0; width:100%; margin-top:0;  }

}	

@media(max-width: 991px){
  .navbar.fixed-top .navbar-collapse, .navbar.sticky-top .navbar-collapse{
    overflow-y: auto;
      max-height: 90vh;
      margin-top:10px;
  }
}
`;

return (
  <Menu class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#main_nav"
      >
        <span>Mega Menu</span>
      </button>
      <div class="collapse navbar-collapse" id="main_nav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            {" "}
            <a class="nav-link" href="#">
              Home{" "}
            </a>{" "}
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              {" "}
              About{" "}
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              {" "}
              Services{" "}
            </a>
          </li>
          <li class="nav-item dropdown has-megamenu">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              data-bs-toggle="dropdown"
            >
              {" "}
              Mega menu{" "}
            </a>
            <div class="dropdown-menu megamenu" role="menu">
              This is content of megamenu. <br />
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </div>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link" href="#">
              {" "}
              Menu item{" "}
            </a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link  dropdown-toggle"
              href="#"
              data-bs-toggle="dropdown"
            >
              {" "}
              Dropdown right{" "}
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <a class="dropdown-item" href="#">
                  {" "}
                  Submenu item 1
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  {" "}
                  Submenu item 2{" "}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </Menu>
);
