import { useState } from "react"
import { Button, Paper } from "@mui/material"
import Swal from 'sweetalert2'
import { useDispatch } from "react-redux"
import { resetPasswordByAdmin } from "../Redux/actions"
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  paper: {
    backgroundColor: 'rgb(213, 217, 222)',
    boxShadow: '0 5px 5px rgb(0,0,0,0.1)',
    borderRadius: '10px',
    border: 'solid 1px black'
  },
  btn: {
    display: 'flex',
    //gridTemplateRows: 'repeat(1, 1fr)'

  },
  btn1: {
    padding: '1.5rem'
  }
})

export default function InputUsers({ id, name, role, email, handleChangeRole, handleEditUser, deleteUser }) {

  const clases = useStyles()

  const dispatch = useDispatch()
  const [edit, setEdit] = useState(false)
  const handleEditProduct = () => {
    setEdit(!edit)
  }
  let token = window.localStorage.getItem('token')
  let config = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  }
  let objeto = {
    _id: id
  }

  const handleResetPassword = () => {
    Swal.fire({
      title: `You are about to Reset the Password of ${name}!`,
      text: "This action is irremediable and will modify the database, are you sure you want to continue?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reset!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(resetPasswordByAdmin(objeto, config))
        //window.location.reload()
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-center',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
        Toast.fire({
          icon: 'success',
          title: `${name} has received an email to modify the password`
        })
        setTimeout(() => {
          window.location.reload()
        }, 3000)
      }
    })
  }

  return (
    <Paper className={clases.paper}>
      <span> ID: {id} </span>
      <span>Name: {name}</span>

      {edit ? <span> Rol:   <select onChange={(e) => handleChangeRole(e.target.value)}>
        <option> Select the new rol for the user </option>
        <option value="admin"> administrator </option>
        <option value="client"> client </option>
      </select> </span> : <span> Rol: <b>{role} </b></span>}

      <span> email: {email}</span>

      <div className={clases.btn} style={{ display: 'grid', gridTemplateColumns: 'repeate(1, 1fr)', marginLeft: '3rem' }}>

        {edit ?
          <Button variant="contained" color="primary" className={clases.btn1} style={{ maxWidth: '40%', marginLeft: '30%', marginTop: '1em' }} onClick={(x) => handleEditUser(x)} > Update User </Button>
          : <Button variant="contained" color="secondary" style={{ maxWidth: '40%', marginLeft: '30%', marginTop: '1em' }} onClick={handleEditProduct}> Update User </Button>
        }

        <Button variant="contained" className={clases.btn1} color='error' style={{ maxWidth: '40%', marginLeft: '30%', marginTop: '1em' }} onClick={() => handleResetPassword()}>Reset Password </Button>

        <Button variant="contained" color="error" className={clases.btn1} onClick={() => deleteUser()} style={{ maxWidth: '40%', marginLeft: '30%', marginTop: '1em' }} > Delete User </Button>
      </div>

    </Paper>
  )
}