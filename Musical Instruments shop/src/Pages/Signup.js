import { Button, Grid, TextField, Container, FormControlLabel, FormLabel, RadioGroup, FormControl, Radio } from '@mui/material'
import React, { } from 'react'
import { useHistory } from 'react-router-dom'
import AdminAvatar from '../Components/AdminAvatar'
import Navbar from '../Components/Navbar'

const Signup = () => {
    const history = useHistory()
    const handleClick = (e) => {
        e.preventDefault()
        const form = document.getElementById("form")
        const emailerror = document.getElementById("email-error")
        const passworderror = document.getElementById("password-error")
        const firstnameerror = document.getElementById("fname-error")
        const lastnameerror = document.getElementById("lname-error")

        fetch("http://localhost:4000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstname: form.firstname.value,
                lastname: form.lastname.value,
                email: form.email.value,
                password: form.password.value,
                gender: form.gender.value,
            }),
            credentials: 'include'
        })
            .then((res) => {
                return res.json()
            })
            .then(result => {
                const data = result
                if (result._id) {
                    history.push('/login')
                }
                else {
                    emailerror.textContent = data.email
                    passworderror.textContent = data.password
                    firstnameerror.textContent = data.firstname
                    lastnameerror.textContent = data.lastname
                }
            })
            .catch((error) => {
                console.log(error)
            })

    }
    return (
        <div>
            <Navbar></Navbar>
            <Container style={{ zIndex: "0", position: "relative", backgroundColor: "#D0D0D0", marginTop: "100px", padding: "100px", borderRadius: "16px" }}>
                <form id="form" >
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                            <TextField name='firstname' label="First Name" variant="outlined" fullWidth />
                            <div id="fname-error" style={{ color: "#FF1493" }}></div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name='lastname' label="Last Name" variant="outlined" fullWidth />
                            <div id="lname-error" style={{ color: "#FF1493" }}></div>
                        </Grid>
                        <Grid item xs={12} >
                            <TextField name='email' label="Email" variant="outlined" fullWidth />
                            <div id="email-error" style={{ color: "#FF1493" }}></div>
                        </Grid>
                        <Grid item xs={12} >
                            <TextField name='password' label="Password" type="password" variant="outlined" fullWidth />
                            <div id="password-error" style={{ color: "#FF1493" }}></div>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                                <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="gender">
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid sx={{ display: 'flex', flexDirection: "row", justifyContent: "flex-end" }} item xs={12}>
                            <Button type='submit' onClick={handleClick} variant="contained" color="warning">submit</Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
            <AdminAvatar></AdminAvatar>
        </div >
    )
}

export default Signup