import { Input, Paper } from "@material-ui/core"
import { useState } from 'react'
import { deleteCategory, updateCategoy } from "../Redux/actions"
import Swal from 'sweetalert2'
import { useDispatch } from "react-redux"
import { Button } from "@mui/material"

export default function InputCategories({ category }) {
  const dispatch = useDispatch()
  const [edit, setEdit] = useState(false)

  const [editCategory, setEditCategory] = useState('')

  const handleEditCategory = (e) => {
    setEditCategory(e)
  }
  let token = window.localStorage.getItem('token')
  let config = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  }
  
  const objeto = {
    name: editCategory
  }

  const handleSubmitCategory = () => {
    Swal.fire({
      title: `You are about to edit a category!`,
      text: "This action will modify the database, are you sure you want to continue?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, edit!',
      allowEnterKey: true
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updateCategoy(category, objeto))
        window.location.reload()
      }
    })
  }

  const handleDeleteCategory = (x) => {
    Swal.fire({
      title: `You are about to delete a category!`,
      text: "This action will modify the database, are you sure you want to continue?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete!'
    }).then((result) => {
      if (result.isConfirmed) {

        dispatch(deleteCategory(x))
        // window.location.reload()
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-center',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
        Toast.fire({
          icon: 'success',
          title: 'The category has been removed.'
        })
        setTimeout(() => {
          window.location.reload()
        }, 3000)
      }
    })
  }


  return (
    <div>
      <Paper elevation={3}>
        {!edit ? <div>
          <h2> <b> {category} </b> </h2>
          <Button variant="contained" color='secondary' style={{ marginTop: '1rem', width: '40%' }} onClick={() => setEdit(!edit)}
          > Edit Category</Button>
        </div> : <div>
          <Input type="text"
            placeholder={category}
            onChange={e => handleEditCategory(e.target.value)} />
          <Button variant="contained" color='secondary' style={{ marginTop: '1rem', width: '50%' }} onClick={() => handleSubmitCategory()}
            disabled={editCategory.trim() === ''}
          > Save changes </Button>
        </div>
        }
        <Button variant="contained" color="error"
          style={{ marginTop: '1rem', marginBottom: '1rem', width: '40%' }}
          onClick={() => handleDeleteCategory(category)}
        >Delete Category </Button>
        {/* <span> {category} </span> */}
      </Paper>
    </div>
  )
}