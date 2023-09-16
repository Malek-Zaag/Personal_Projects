import './SignIn.css';
import { useRef ,useState } from 'react';
import {  useLocation ,useNavigate } from "react-router-dom";
import logo from './login.png'
function SignIn(){
    const emailRef = useRef();
    const passwordRef = useRef();
    const roleRef=useRef();
    const [token, setToken] = useState('');
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    function log(e)
    { e.preventDefault();
       
      const requestOptions = {
            method: "POST",
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: emailRef.current.value,
              password: passwordRef.current.value,
              
            }),
          };
          fetch("http://localhost:4000/login",requestOptions)
          .then((response)=>response.json())
          .then((data)=>{console.log(data);setToken(data.token);
            
            setUserData(data);
            console.log(userData);
          navigate("/");
          localStorage.setItem("id",data.id); 
          localStorage.setItem("username",data.username); 
          localStorage.setItem("subscription_id",data.subscription_id);
          localStorage.setItem("email",data.email);
          
        })
          
    }
    return(<>
    <div className="SignIn" id="intro">
    <p class="sign">Sign in to  <br/> 
<span class="account">Your Account</span>
</p>
<p class="signdesc">Create an account and discover the potential of the services you use. Your account gives you more options by personalizing your experience and giving you easy access to your most important information.</p>

<div class="container" id="signinbx">

<p class="welcome">Welcome to <span class="Test">CloudiVops</span></p> 
<p class="Sin">Sign in</p>
<p class="NA">No Account ?</p>
<a href="/SignUp" class="signUp" >Sign up</a>
<label for="staticEmail" class="form-label" id="label1" >UserName</label>
<input type="email" class="form-control" id="staticEmail" aria-describedby="emailHelp" required placeholder='Enter Your UserName' ref={emailRef}></input>
<label for="inputPassword" class="form-label" id="label2">Password</label>
<input type="password" class="form-control" id="inputPassword"  required placeholder='Enter Password'ref={passwordRef} ></input>


<button onClick={log} type="submit" class="btn btn-primary log" id="signbtn">Login</button>
</div>

     

</div>
<img src={logo} className='logo-img1'></img>
</>
);
}
export default SignIn ;