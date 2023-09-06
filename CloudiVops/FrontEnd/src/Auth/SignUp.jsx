import './SignIn.css';
import { useRef ,useEffect } from 'react';
import {  useLocation ,useNavigate } from "react-router-dom";
import logo from './login.png'
function Signup(){
   const usernameRef = useRef();
   const firstnameRef = useRef();
    const passwordRef = useRef();
    const lastnameRef = useRef();
    const emailRef = useRef();
    const subscriptionidRef = useRef();
  const navigate = useNavigate();
    function Sign(){
        const requestOptions = {
            method: "POST",
           withCredentials: true,
            headers: { "Content-Type": "application/json",
                       "Access-Control-Allow-Origin":" http://localhost:5173/",
                       "Access-Control-Allow-Credentials": "true"
                       },
            body: JSON.stringify({
                username: usernameRef.current.value,
                firstname: firstnameRef.current.value,
                lastname: lastnameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
                subscription_id:subscriptionidRef.current.value,
            }),
        
          };
         fetch("http://localhost:4000/signup",requestOptions)
        .then((response)=>response.json())
      .then((data)=>{console.log(data);
      navigate("/");

    })
    }
    return(<div className="SignUp" id="intro">
    <p className="sign">Sign Up to <br/> 
       <span className="account">Our Website </span>
    </p>
    <p className="signdesc">Create an account and discover the potential of the services you use. Your account gives you more options by personalizing your experience and giving you easy access to your most important information.</p>
               <div className="container" id="signinbx">
     <p className="welcome">Welcome to <span className="Test">CloudiVops</span></p> 
     <p className="Sup">Sign Up</p>
     <p className="NA1">Have an Account ?</p>
     <a href="/SignIn" className="signUp">Sign in</a>
     <label htmlFor="staticEmail1" className="form-label"  id="label1v0">Email address</label>
        <input type="email" className="form-control" id="staticEmail1" aria-describedby="emailHelp" placeholder='Enter Your Email' ref={emailRef}></input>
        <label htmlFor="name1" className="form-label" id="labelname">Enter Your first Name </label>
        <input type="text" className="form-control" id="name1" aria-describedby="emailHelp1" placeholder='Enter Your First Name' ref={firstnameRef}></input>
        <label htmlFor="lastname" className="form-label" id="labellastname">Enter Your last Name</label>
        <input type="text" className="form-control" id="lastname" aria-describedby="emailHelp1" placeholder='Enter Your Last Name' ref={lastnameRef} ></input>
        <label htmlFor="username" className="form-label" id="labelusername">UserName </label>
        <input type="text" className="form-control" id="username" placeholder='Enter your username'ref={usernameRef} ></input>

        <label htmlFor="inputPassword2" className="form-label" id="label2v0">Password</label>
        <input type="password" className="form-control" id="inputPassword2" placeholder='Enter Your Password' ref={passwordRef} ></input>
        <label htmlFor="password-confirm" className="form-label" id="confirm">Subscription_ID </label>
        <input type="text" className="form-control" id="password-confirm" placeholder='Enter your Subscription_ID' ref={subscriptionidRef} ></input>


   
    <button onClick={Sign} type="submit" className="btn btn-primary log" id="signupbtn">Sign Up</button>
     </div>
     <img src={logo} className='logo-img1'></img>
    </div>);
    }
    export default Signup ;
