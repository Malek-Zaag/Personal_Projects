import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './Navbar'
import './App.css'
import hero from './hero-img.png';
import NavbarAfterlogin from './NavbarAfterlogin'
function App() {
  const [userId, setUserId] = useState(localStorage.getItem("id"));
  const handleLogout = () => {
    localStorage.removeItem("id");
    setUserId(null);
  };
  return (
    <>
   {userId ? (
       <NavbarAfterlogin></NavbarAfterlogin>
      ) : (
        <Navbar></Navbar>
      )}
  <section id="hero" class="hero d-flex align-items-center">
<div class="container">
  <div class="row">
    <div class="col-lg-6 d-flex flex-column justify-content-center">
      <h1 data-aos="fade-up">We offer modern solutions for managing your ressouces </h1>
      <h2 data-aos="fade-up" data-aos-delay="400">Our application will help you to create new ressources , configure them and monitor them with an automated way </h2>
      <div data-aos="fade-up" data-aos-delay="600">
        <div class="text-center text-lg-start">
          <a href="#about" class="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center">
            <span>Get Started</span>
            <i class="bi bi-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
    <div class="col-lg-6 hero-img" data-aos="zoom-out" data-aos-delay="200">
     <img src={hero} class="img-fluid" alt=""></img>
        </div>
  </div>
</div>

</section>
    </>
  )
}

export default App
