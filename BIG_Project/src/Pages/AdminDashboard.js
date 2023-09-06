import { Button} from '@mui/material'
import React from 'react'


const AdminDashboard = () => {
  return (
    <div>
      <div style={{ backgroundColor: '#0000CD', display: "flex", justifyContent: "space-between" }}>
          <Button style={{ margin: "10px 35px 10px 35px" }} color="warning" size="medium" variant="contained" href="/admindashboard/members">Members</Button>
          <Button style={{ margin: "10px 35px 10px 35px" }} color="warning" size="medium" variant="contained" href="/">Home</Button>
          <Button style={{ margin: "10px 35px 10px 35px" }} color="warning" size="medium" variant="contained" href="/admindashboard/products">Products</Button>
      </div>
    </div>
  )
}

export default AdminDashboard