import { Typography, Grid, CardContent, Card, Button, Box } from '@mui/material'
import React, { } from 'react'
import Navbar from '../Components/Navbar'
import logo from '../images/logo.png'
import login from '../images/login.png'
import location from '../images/location.png'
import classes from '../Components/Style.module.css'
import AdminAvatar from '../Components/AdminAvatar'


const Home = () => {

  return (
    <div>
      <Navbar></Navbar>
      <Grid container spacing={2} sx={{ paddingTop: '175px' }} justify="center" alignItems="center" className={classes.color}  >
        <Grid className={classes.color} item xs={12} md={6}>
          <Card sx={{ border: "none", boxShadow: "none" }}>
            <CardContent style={{ textAlign: 'center', backgroundColor: "#0000CD", }}>
              <img src={logo} alt="logo" style={{ width: "300px", height: "300px", }}>
              </img>
            </CardContent>
          </Card>
        </Grid>
        <Grid sx={{ border: 0 }} item xs={12} md={6}>
          <Card sx={{ border: "none", boxShadow: "none" }} className={classes.color}>
            <CardContent className={classes.color}>
              <Typography gutterBottom fontFamily="Fredoka" align="left" variant="h2">About Us</Typography>
              <Typography gutterBottom align="left" fontWeight="bold" variant="h5" fontFamily="Fredoka">
                Our site is one of the most famous 
                sites in this field . We sell all 
                types of musical instruments alongside
                with their accessories . Feel free to 
                contact us at our email.
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Button href="/shop" sx={{ margin: "30px 0 0 0", }} variant="contained" color="warning">Shop</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ height: "300px", bgcolor: 'warning.main' }}></Box>
      <Grid container spacing={2} justify="center" alignItems="center" className={classes.color}  >
        <Grid data-aos="fade-right" className={classes.color} item xs={12} md={6}>
          <Card sx={{ border: "none", boxShadow: "none" }}>
            <CardContent style={{ textAlign: 'center', backgroundColor: "#0000CD", }}>
              <img src={login} alt="login" style={{ width: "300px", height: "300px", }}>
              </img>
            </CardContent>
          </Card>
        </Grid>
        <Grid sx={{ border: 0 }} item xs={12} md={6}>
          <Card data-aos="fade-up" sx={{ border: "none", boxShadow: "none" }} className={classes.color}>
            <CardContent className={classes.color}>
              <Typography gutterBottom fontFamily="Fredoka" align="left" variant="h2">Join US</Typography>
              <Typography gutterBottom align="left" fontWeight="bold" variant="h5" fontFamily="Fredoka">
                In order to buy something , you 
                need to login into your account 
                or create a new one if you didn't 
                already .
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Button href="/login" sx={{ margin: "30px 0 0 0", }} variant="contained" color="warning">Login</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ height: "300px", bgcolor: 'warning.main' }}></Box>
      <Grid container spacing={2} justify="center" alignItems="center" className={classes.color}  >
        <Grid className={classes.color} item xs={12} md={6}>
          <Card sx={{ border: "none", boxShadow: "none" }}>
            <CardContent id="map" style={{ textAlign: 'center', backgroundColor: "#0000CD", }}>
              <img style={{ width: "250px", height: "250px" }} alt="map" src={location}></img>
            </CardContent>
          </Card>
        </Grid>
        <Grid sx={{ border: 0 }} item xs={12} md={6}>
          <Card data-aos="flip-left" sx={{ border: "none", boxShadow: "none" }} className={classes.color}>
            <CardContent className={classes.color}>
            <Typography gutterBottom fontFamily="Fredoka" align="left" variant="h2" >INFO BOX</Typography>
              <Box component='span' sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                <Typography fontFamily="Fredoka" fontWeight="bold" variant="h5">
                  Address : Rue Sidi Ahmed Aouina, Tunis 2045, Tunisia
                  <br />
                  Twitter: <a href='https://twitter.com/ZaagMalek'>https://twitter.com/ZaagMalek</a>
                  <br />
                  Instagram: <a href='https://www.instagram.com/zaagmelek/'>https://www.instagram.com/zaagmelek/</a>
                  <br />
                  Linkedin: <a href='https://www.linkedin.com/in/melekzaag/'>https://www.linkedin.com/in/melekzaag/</a>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <footer style={{ textAlign: "center" }}>
        <Typography gutterBottom fontFamily="Fredoka" variant="h5">Copyrigths@Malek2022</Typography>
      </footer>
      <AdminAvatar></AdminAvatar>
    </div>
  )
}

export default Home