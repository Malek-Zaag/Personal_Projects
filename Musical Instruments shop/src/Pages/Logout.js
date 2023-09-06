import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { reset } from '../redux/cartAdder'
import { resetCounter } from '../redux/counter'
import { resetValue } from '../redux/value'


const Logout = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    fetch("http://localhost:4000/logout", { method: "GET", credentials: 'include' })
        .then((res) => { history.push('/'); dispatch(resetValue()); dispatch(resetCounter()); dispatch(reset()); console.log('successfully logged out'); })
        .catch(err => console.log(err))
    return (
        <div>Logout</div>
    )
}

export default Logout