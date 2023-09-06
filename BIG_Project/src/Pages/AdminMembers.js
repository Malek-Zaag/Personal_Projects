import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AdminDashboard from './AdminDashboard'
import DeleteIcon from '@mui/icons-material/Delete';

const AdminMembers = () => {
    const [members, setMembers] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch("http://localhost:4000/members")
            .then(res => res.json())
            .then(result => {
                setMembers(result);
                setLoading(false)
            })
            .catch(err => console.log(err))

    }, [members])
    const deletion= (id) =>{
        const endpoint=`http://localhost:4000/members/${id}`
        fetch(endpoint, {method: "DELETE"})
        .then(() => console.log("item deleted"))
        .catch( err => console.log(err))
    }
    if (loading) return <div>Loading ....</div>
    else
        return (
            <div>
                <AdminDashboard></AdminDashboard>
                <div>
                    {members.map(member => (
                        <div id={member._id} style={{marginTop: "1em",marginBottom: "1em" ,display: "flex", justifyContent: "space-between"}}>
                            <span>First Name: {member.firstname}</span>
                            <span>Last Name: {member.lastname}</span>
                            <span>Last Name: {member.email}</span>
                            <span>Last Name: {member.gender}</span>
                            <Button variant='contained' onClick={() => deletion(member._id)} style={{backgroundColor: "#d50000"}}><DeleteIcon></DeleteIcon>DELETE</Button>
                        </div>
                    ))}
                </div>
            </div>
        )
}
export default AdminMembers 