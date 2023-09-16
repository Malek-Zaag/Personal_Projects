import './Dashboard.css'
function DashboardNavbar(){
  const logout =()=>{
    localStorage.removeItem("id");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("subscription_id");
    
   }
    return(
        <>
    <header id="header" class="header fixed-top d-flex align-items-center">

<div class="d-flex align-items-center justify-content-between">
  <a href="/" class="logo d-flex align-items-center">
    <img src="assets/img/logo.png" alt=""></img>
    <span class="d-none d-lg-block">CloudiVops</span>
  </a>
  <i class="bi bi-list toggle-sidebar-btn"></i>
</div>



<nav class="header-nav ms-auto">
  <ul class="d-flex align-items-center">

    <li class="nav-item d-block d-lg-none">
      <a class="nav-link nav-icon search-bar-toggle " href="#">
        <i class="bi bi-search"></i>
      </a>
    </li>


    <li class="nav-item dropdown pe-3">

      <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
    
        <span class="d-none d-md-block dropdown-toggle ps-2">{localStorage.getItem("email")}</span>
      </a>

      <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
        <li class="dropdown-header">
          <h6>{localStorage.getItem("email")}</h6>
          <span>{localStorage.getItem("subscription_id")}</span>
        </li>
        <li>
          <hr class="dropdown-divider"></hr>
        </li>

        <li>
          <a class="dropdown-item d-flex align-items-center" onClick={logout} href="/">
            <i class="bi bi-box-arrow-right"></i>
            <span>Sign Out</span>
          </a>
        </li>

      </ul>
    </li>

  </ul>
</nav>
</header>

        </>
    )
}
export default DashboardNavbar