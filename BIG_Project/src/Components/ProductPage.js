import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Grid, Button, Typography } from "@mui/material"
import { useHistory } from 'react-router-dom'
import { add } from '../redux/cartAdder'
import { increment } from '../redux/counter'
import { useDispatch } from "react-redux"

const ProductPage = ({ id }) => {
    const dispatch = useDispatch()
    const [product, setProduct] = useState({})
    const [Loading, setLoading] = useState(true)
    const history = useHistory()
    useEffect(() => {
        let isMounted = true;
        const endpoint = `http://localhost:4000/products/${id}`
        fetch(endpoint, { credentials: 'include' })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                else {
                    history.push('/login')
                }
            })
            .then(result => {
                if (isMounted) {
                    setProduct(result)
                    setLoading(false)
                }
            })
            .catch(err => console.log(err))
        if (product)
            return () => { isMounted = false }
    }, [history, id, product])
    window.onload = function () {
        if (!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }
    }
    window.onload()
    if (Loading) return (
        <div>
            <Navbar></Navbar>
            <div>Loading ....</div>
        </div>
    )
    else return (
        <div>
            <Typography fontWeight="bold" fontFamily="Fredoka">
                <Navbar></Navbar>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                        <img style={{ width: "100%" }} src={product.image} alt="img"></img>
                    </Grid>
                    <Grid style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }} item xs={12} sm={6}>
                        <h1>{product.name}</h1>
                        <div>{product.description}</div>
                        <div style={{ color: "green" }}>{product.stock}</div>
                        <div>{product.price}$</div>
                        <div>
                            <Button variant="contained" onClick={() => { dispatch(add(product)); dispatch(increment()) }}>
                                Add to Card
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </Typography>

        </div >
    )
}

export default ProductPage