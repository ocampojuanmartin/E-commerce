import React, { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
import { Login } from '@mui/icons-material';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Button, Typography } from "@mui/material";
import Swal from 'sweetalert2'


export default function LogoutButton() {
  
const navigate = useNavigate()
const [user,setUser] = useState('');

          useEffect(()=>{
	    const loggedUserJSON = window.localStorage.getItem('token')
         setUser(loggedUserJSON)
        },[])
      
const LoginButton =() => { 
    return(
    <Link to="/login" style={{ textDecoration: "none" }}
    >
    <Button
        color="navBtnColor"
        variant="contained"
        endIcon={<Login />} >
     Login
    </Button> 
   </Link> 
    )
}

const handleLogout = e => {
 
    Swal.fire({
        title: 'Are you sure?',
        text: "you are closing session",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, log out!'
      }).then((result) => {
        if(result.isConfirmed) {
           setUser(null)
          window.localStorage.removeItem('token')
          window.location.reload(false);
         navigate("/login")
          }
      })
 }

const  Logout = () => {
   return ( 
    <Button
        color="navBtnColor"
        variant="contained"
        endIcon={<ExitToAppIcon />}
        onClick= { (e) => handleLogout()} >   
        Logout
    </Button> 
   )

}

const Regtrister = () => {
    return(
        <Link to='/CreateUser' style={{ textDecoration: "none" }}
        >
        <Button
            color="navBtnColor"
            variant="contained"
            endIcon={<Login />} >
           Register
        </Button> 
       </Link> 
    )
}
return(
<div>
{   user ? Logout()  : LoginButton() }

</div>
);
}