import React from 'react'
import { useHistory } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import { Grid, Button } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import mastercard from '../images/icons8-mastercard-credit-card-48.png'
import amex from '../images/icons8-american-express-48.png'
import paypal from '../images/icons8-paypal-an-online-payments-system-operating-worldwide-48.png'
import visa from '../images/icons8-visa-48.png'
import ClearIcon from '@mui/icons-material/Clear';
import { useSelector, useDispatch } from 'react-redux';
import { removevalue } from '../redux/value'
import { remove } from '../redux/cartAdder'
import { decrement } from '../redux/counter'

const Cart = () => {
  let totalValue = useSelector((state) => state.valueReducer.value)
  const items = useSelector((state) => state.itemReducer.items)
  const dispatch = useDispatch()
  const history = useHistory()
  const totalSum = (items) => {
    let sum = 0
    items.map(item => sum += item.price)
    return sum
  }
  totalValue = totalSum(items)
  const handleClick = () => {
    fetch('http://localhost:4000/create-checkout-session', {
      credentials: 'include',
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items,
      })
    })
      .then((res) => {
        if (res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch(err => console.log(err))
  }
  if (document.cookie)
    return (
      <div style={{ backgroundColor: "#DCDCDC" }}>
        <Navbar></Navbar>
        <div>
          <Grid style={{ marginTop: "1vw", paddingLeft: "1em", display: "flex", justifyContent: "space-between" }} container spacing={2}>
            <Grid item xs={12} sm={6} style={{ backgroundColor: "white", fontFamily: "Fredoka", fontWeight: "bold", fontSize: "2.5vw" }} >
              <div style={{ fontFamily: "Fredoka", fontWeight: "bold", fontSize: "1.5vw" }}>MY ITEMS</div>
              <div style={{ marginRight: "5vw", fontFamily: "Fredoka", fontWeight: "bold", fontSize: "1.5vw" }}>
                <hr />
                <ul>
                  {items.map(item => (
                    <li style={{ display: "flex", }}>
                      <img src={item.image} style={{ width: "250px", height: "250px" }} alt="img"></img>
                      <div style={{ width: "100%", display: "flex", justifyContent: "space-between", position: "relative" }}>
                        <div>
                          <h1>{item.price} $</h1>
                          <div>{item.description}</div>
                        </div>
                        <Button style={{ position: "absolute", right: "10%" }} variant='text' color='error' onClick={() => { dispatch(removevalue(item.price)); dispatch(remove(item)); dispatch(decrement()) }} endIcon={<ClearIcon />}></Button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div style={{ display: "flex", justifyContent: "flex-end", wordSpacing: "20px" }}>
                  SUB-TOTAL {totalValue}$
                </div>
              </div>
            </Grid>
            <Grid style={{ backgroundColor: "white" }} item xs={12} sm={6} >
              <div style={{ fontFamily: "Fredoka", fontWeight: "bold", fontSize: "1.5vw" }}>TOTAL</div>
              <div style={{ marginRight: "5vw", fontFamily: "Fredoka", fontWeight: "bold", fontSize: "1.5vw" }}>
                <hr />
                <div style={{ display: "flex", justifyContent: "space-between" }}>Sub-total  <span>{totalValue} $</span></div>
                <br />
                <div style={{ display: "flex", justifyContent: "space-between" }}>Delivery (free)<InfoOutlinedIcon></InfoOutlinedIcon></div>
                <br />
                <hr />
                <br />
                <Button size="large" fullWidth variant="contained" color="success" onClick={() => handleClick()}>CHECKOUT</Button>
                <br />
                <br />
                <div>WE ACCEPT:</div>
                <br />
                <div><img src={mastercard} alt='mastercard' /><img src={visa} alt='visa' /><img src={amex} alt='amex' /><img src={paypal} alt='paypal' /></div>
              </div>
            </Grid>
          </Grid >
        </div >
      </div >
    )
  else {
    history.push('/login')
    return (
      <div></div>
    )
  }
}

export default Cart