import {  useLocation ,useNavigate ,redirect } from "react-router-dom";
function NavbarAfterlogin(){
    const logout =()=>{
        localStorage.removeItem("id");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("subscription_id");
        redirect("/");
       }
    return(
        <>
         <header id="header" className="header fixed-top">
    <div className="container-fluid container-xl d-flex align-items-center justify-content-between">

      <a href="#" className="logo d-flex align-items-center">
        <img src="" alt=""></img>
        <span>CloudiVops</span>
      </a>

      <nav id="navbar" className="navbar">
        <ul>
          <li><a className="nav-link scrollto active" href="/">Home</a></li>
          <li><a class="nav-link scrollto" href="/CreateVM">Create VM</a></li>
       
          <li class=" dropdown"><a href="#"><span>{localStorage.getItem("email")}</span> <i class="bi bi-chevron-right"></i></a>
                <ul>
                  <li><a href="/Dashboard">Dashboard</a></li>
                  <li><a onClick={logout} href="/">Logout</a></li>

                </ul>
              </li>

        </ul>
        <i className="bi bi-list mobile-nav-toggle"></i>
      </nav>

    </div>
  </header>
        </>
    )
}
export default NavbarAfterlogin
