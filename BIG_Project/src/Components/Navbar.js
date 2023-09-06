import { Button, Badge, IconButton } from '@mui/material'
import { React, useState, useEffect } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import logo from '../images/logo.png'
import classes from "./Navbar.module.css"
import CollapseButton from './CollapseButton';
import { useHistory } from "react-router-dom";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux'




const Navbar = () => {
  const number = useSelector((state) => state.counterReducer.count)
  const [items, setItems] = useState([]);
  const history = useHistory()
  useEffect(() => {
    let isMounted = true;
    fetch("http://localhost:4000/products")
      .then(res => res.json())
      .then(result => { if (isMounted) setItems(result) })
      .catch(err => console.log(err))
    return () => { isMounted = false }
  }, [])
  const handleOnHover = (result) => {
    // the item hovered
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
    history.push(`/products/${item._id}`)
    window.location.reload()
  }

  const handleOnFocus = () => {
  }
  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
  }

  const formatResult = (item) => {
    return (
      <span key={item._id} style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
    )
  }
  if (document.cookie) {
    return (
      <div className={classes.nav} style={{ backgroundColor: "#0000CD", display: "flex", alignItems: "center", justifyContent: "space-between", }}>
        <div className={classes.logo} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <a href="/"><img style={{ marginTop: "-35px", marginBottom: "-35px", width: "200px", height: "200px" }} src={logo} alt="logo"></img></a>
          <div style={{ width: "15vw" }}>
            <ReactSearchAutocomplete
              items={items}
              onSearch={handleOnSearch}
              onHover={handleOnHover}
              onSelect={handleOnSelect}
              onFocus={handleOnFocus}
              autoFocus
              formatResult={formatResult}
            />
          </div>
        </div>
        <div>
          <Button variant="contained" style={{ margin: "10px 35px 10px 35px" }} color="warning" size="medium" href="/">Home</Button>
          <Button variant="contained" style={{ margin: "10px 35px 10px 35px" }} color="warning" size="medium" href="/shop" endIcon={<KeyboardArrowDownIcon />}><CollapseButton></CollapseButton></Button>
          <Button variant="contained" style={{ margin: "10px 35px 10px 35px" }} color="success" size="medium" href="/cart"><IconButton aria-label="cart">
            <Badge color="secondary" badgeContent={number} showZero>
              <ShoppingCartIcon />
            </Badge>
          </IconButton></Button>
          <Button variant="contained" style={{ margin: "10px 35px 10px 35px" }} color="warning" size="medium" href="/logout">Logout</Button>
        </div>
      </div >
    )
  }
  else
    return (
      <div className={classes.nav} style={{ backgroundColor: "#0000CD", display: "flex", alignItems: "center", justifyContent: "space-between", }}>
        <div className={classes.logo} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <a href="/"><img style={{ marginTop: "-35px", marginBottom: "-35px", width: "200px", height: "200px" }} src={logo} alt="logo"></img></a>
          <div style={{ width: "15vw" }}>
            <ReactSearchAutocomplete
              items={items}
              onSearch={handleOnSearch}
              onHover={handleOnHover}
              onSelect={handleOnSelect}
              onFocus={handleOnFocus}
              autoFocus
              formatResult={formatResult}
            />
          </div>
        </div>
        <div>
          <Button variant="contained" style={{ margin: "10px 35px 10px 35px" }} color="warning" size="medium" href="/">Home</Button>
          <Button variant="contained" style={{ margin: "10px 35px 10px 35px" }} color="warning" size="medium" href="/shop" endIcon={<KeyboardArrowDownIcon />}><CollapseButton></CollapseButton></Button>
          <Button variant="contained" style={{ margin: "10px 35px 10px 35px" }} color="success" size="medium" href="/cart">Cart</Button>
          <Button variant="contained" style={{ margin: "10px 35px 10px 35px" }} color="warning" size="medium" href="/login">Login</Button>
        </div>
      </div >
    )
}

export default Navbar