import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import { Button, Typography, Grid } from "@mui/material";

const { REACT_APP_BACKEND_URL } = process.env

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(5),
  }
}))


export default function Success() {
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location)
  const classes = useStyles()
  useEffect(() => {
    const token = localStorage.getItem("token")
    let config = { headers: { Authorization: 'Bearer ' + token } }
    if (location.state) {
      axios.post(`${REACT_APP_BACKEND_URL}/api/orders`, location.state, config).then(response => {
      })
        .catch(error => {
          console.log(error)
        })
    } else {
      navigate('/')
    }
  })
  const rows = location.state.products
  const amount = location.state.amount
  const addres = location.state.address
  return (
    <React.StrictMode>
      <Typography component='h1' variant='h5'>thanks for shopping at sport market</Typography>
      <Typography component='h5' variant='h6'>your dates:</Typography>
      <Typography component='h5' variant='h7'>city: {addres.city}</Typography>
      <Typography component='h5' variant='h7'>country: {addres.country}</Typography>
      <Typography component='h5' variant='h7'>postal code: {addres.postal_code}</Typography>
      <TableContainer component={Paper} className={classes.container}>
        <Table sx={{ maxWidth: '100%' }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                Details
              </TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Desc</TableCell>
              <TableCell align="right">Qty</TableCell>
              <TableCell align="right">Unit</TableCell>
              <TableCell align="right">Sum</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.price * row.quantity}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2} align="right">Amount</TableCell>
              <TableCell align="right">{amount}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </React.StrictMode>

  )
}


////////////////////////////////






