import { Avatar } from '@mui/material'
import React from 'react'

const AdminAvatar = () => {
  return (
        <footer style={{position: "fixed",width: "100%",bottom: "0",display: "flex",justifyContent: "flex-end"}}>
            <a href='/adminlogin'>
            <Avatar sx={{height: '70px', width: '70px' }} src="/broken-image.jpg" ></Avatar>
            </a>
        </footer>
  )
}

export default AdminAvatar