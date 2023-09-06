import { Button, Card, Grid, Pagination, Typography, CardActions, CardActionArea, CardMedia, CardContent } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';



const AdminProducts = () => {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)

  const fetchProductsfromPage = () => {
    const endpoint = `http://localhost:4000/product`
    fetch(endpoint)
      .then(res => res.json())
      .then(result => { setProducts(result); console.log(result) })
      .catch(err => console.log(err))
  }
  const handleChange = (e, p) => {
    setPage(p)

  }
  useEffect(() => {
    fetchProductsfromPage(page)
  }, [page])
  const handleClick = (e) => {
    e.preventDefault()
    const form = document.getElementById("form")
    fetch("http://localhost:4000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name.value,
        description: form.description.value,
        stock: form.stock.value,
        image: form.image.value,
        category: form.category.value,
        price: form.price.value,
      })
    })
      .then(() => console.log("product saved to db"))
      .catch(err => console.log(err))
  }
  const handleDelete = (id) => {
    const endpoint = `http://localhost:4000/products/${id}`
    fetch(endpoint, { method: "DELETE" })
      .then(() => console.log("item deleted"))
      .catch(err => console.log(err))
  }
  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then(res => res.json())
      .then(result => setProducts(result))
      .catch(err => console.log(err))
  }, [products])
  return (
    <div style={{ position: "relative", paddingBottom: "100px" }}>
      <div style={{ backgroundColor: '#0000CD', display: "flex", justifyContent: "space-between" }}>
        <Button style={{ margin: "10px 35px 10px 35px" }} color="warning" size="medium" variant="contained" href="/admindashboard/members">Members</Button>
        <Button style={{ margin: "10px 35px 10px 35px" }} color="warning" size="medium" variant="contained" href="/">Home</Button>
        <Button style={{ margin: "10px 35px 10px 35px" }} color="warning" size="medium" variant="contained" href="/admindashboard/products">Products</Button>
      </div>
      <Typography fontWeight="bold" fontFamily="Fredoka">
        <form id="form">
          <fieldset style={{ marginTop: "1em", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <label for="name">Product Name</label>
            <input name="name"></input>
            <br />
            <label for="description">Product Description</label>
            <textarea rows="10" cols="30" name="description"></textarea>
            <br />
            <label for="price">Product Price</label>
            <input name="price"></input>
            <br />
            <label for="image">Product image</label>
            <input name="image"></input>
            <br />
            <label for="category">Product Category</label>
            <select name="category">
              <option value="Electric Guitar">Electric Guitar</option>
              <option value="Drum">Drum</option>
              <option value="Acoustic Guitar">Acoustic Guitar</option>
              <option value="Bass Guitar">Bass Guitar</option>
              <option value="Piano">Piano</option>
              <option value="DJ Equipment">DJ Equipment</option>
            </select>
            <br />
            <label for="stock">Product Stock</label>
            <input name="stock"></input>
            <br />
            <Button type="submit" variant='contained' onClick={handleClick} color='success'>submit</Button>
          </fieldset>
        </form>
        <div>
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
                      <Button variant='contained' onClick={() => handleDelete(product._id)} align style={{ backgroundColor: "#d50000" }}><DeleteIcon></DeleteIcon>Remove</Button>
                    </CardActions>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </Typography>
      {/* <footer style={{ position: "absolute", width: "100%", left: "0", bottom: "0", display: "flex", justifyContent: "center", marginTop: "1rem" }}>
        <Pagination count={10} page={page} onChange={handleChange} />
      </footer> */}
    </div>
  )
}

export default AdminProducts