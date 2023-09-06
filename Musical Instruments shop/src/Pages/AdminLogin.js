import { Button, Container, TextField } from '@mui/material'
import React from 'react'
import Navbar from '../Components/Navbar'

const AdminLogin = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Container sx={{ position: "relative", backgroundColor: "#D0D0D0", marginTop: "100px", padding: "100px", borderRadius: "16px" }}>
        <TextField fullWidth sx={{ marginBottom: "75px" }} id="outlined-basic" label="AdminUser" variant="outlined" />
        <br />
        <TextField fullWidth id="outlined-basic" label="AdminPassword" variant="outlined" type="password" />
        <Button variant="contained" href="/admindashboard" style={{ position: "absolute", right: "20px", bottom: "10px" }} color="success" >Login</Button>
      </Container>
    </div>
  )
}

export default AdminLogin