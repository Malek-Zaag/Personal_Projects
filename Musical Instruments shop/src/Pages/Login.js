import { Container, TextField, Button } from '@mui/material'
import React from 'react'
import Navbar from '../Components/Navbar'
import { useHistory } from 'react-router-dom'
import AdminAvatar from '../Components/AdminAvatar'


const Login = () => {
  const history = useHistory()
  const handleClick = (e) => {
    e.preventDefault()
    const form = document.getElementById("form")
    const emailerror = document.getElementById("email-error")
    const passworderror = document.getElementById("password-error")
    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.email.value,
        password: form.password.value
      }),
      credentials: 'include'
    })
      .then(res => {
        return res.json()
      })
      .then(result => {
        if (result._id) {
          history.push('/')
        }
        else {
          const data = result
          emailerror.textContent = data.email
          passworderror.textContent = data.password
        }
      })
      .catch(error => console.log(error))
  }

  return (
    <div>
      <Navbar></Navbar>
      <form id="form">
        <Container sx={{ position: "relative", backgroundColor: "#D0D0D0", marginTop: "100px", padding: "100px", borderRadius: "16px" }}>
          <TextField id="email" name="email" fullWidth label="Email" variant="outlined" />
          <div id="email-error" style={{ marginBottom: "75px", color: "#FF1493" }}></div>
          <TextField fullWidth name="password" label="Password" type="password" variant="outlined" />
          <div id="password-error" style={{ color: "#FF1493" }}></div>
          <a href="/signup" style={{ position: "absolute", right: "20px", bottom: "10px" }}>Don't have an account? Sign up</a>
          <Button variant="contained" onClick={handleClick} style={{ position: "absolute", left: "20px", bottom: "10px" }} color="success" >Login</Button>
        </Container>
      </form>
      <AdminAvatar></AdminAvatar>
    </div>
  )
}

export default Login