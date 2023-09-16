
function Navbar(){
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
          <li><a className="nav-link scrollto" href="/SignUp">Sign-Up</a></li>
          <li><a className="getstarted scrollto" href="/SignIn">Login</a></li>

        </ul>
        <i className="bi bi-list mobile-nav-toggle"></i>
      </nav>

    </div>
  </header>
        </>
    )
}
export default Navbar
