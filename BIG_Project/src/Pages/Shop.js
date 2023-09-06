import React, { useEffect, useState } from 'react'
import AdminAvatar from '../Components/AdminAvatar'
import Navbar from '../Components/Navbar'
import { Grid, Card, Button, Typography, CardMedia, CardActionArea, CardContent, CardActions, Pagination } from "@mui/material"
import { useHistory } from 'react-router-dom'
const Shop = () => {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const history = useHistory()
  const handleChange = (e, p) => {
    setPage(p)
    console.log(page)
  }
  useEffect(() => {
    const endpoint = `http://localhost:4000/product/${page}`
    fetch(endpoint, { credentials: 'include' })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        else {
          history.push('/login')
        }
      }, [])
      .then(result => { setProducts(result); setLoading(false) })
      .catch(err => console.log(err))
  })
  if (loading) return <div>
    <Navbar></Navbar>
    <div>Loading ....</div>
  </div>
  else return (
    <div style={{ position: "relative", paddingBottom: "100px" }}>
      <Navbar></Navbar>
      <AdminAvatar></AdminAvatar>
      <Grid sx={{ paddingTop: "20px" }} container spacing={3}>
        {products.map(product => (
          <Grid item xs={12} md={3}>
            <Card id={product._id}>
              <CardActionArea>
                <CardMedia
                  alt='test'
                  component="img"
                  image={product.image}>
                </CardMedia>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div"
                    fontWeight="bold" align="center" fontFamily="Fredoka">
                    {product.name}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div"
                    fontWeight="bold" fontFamily="Fredoka">
                    {product.description}
                  </Typography>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography gutterBottom variant="h5" component="span"
                      fontWeight="bold" fontFamily="Fredoka">
                      Price:{product.price}$
                    </Typography>
                    <Typography gutterBottom variant="h5" component="span"
                      fontWeight="bold" sx={{ color: "green" }} fontFamily="Fredoka">
                      Stock:{product.stock}
                    </Typography>
                  </div>
                </CardContent>
                <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                  <Button onClick={() => { history.push(`/products/${product._id}`) }} variant='outlined' align color="success">See Product</Button>
                </CardActions>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <footer style={{ position: "absolute", width: "100%", left: "0", bottom: "0", display: "flex", justifyContent: "center", marginTop: "1rem" }}>
        <Pagination count={10} page={page} onChange={handleChange} />
      </footer>
    </div>
  )
}

export default Shop