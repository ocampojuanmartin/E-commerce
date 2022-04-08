import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getAllOrders } from "../Redux/actions"
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@mui/styles';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import InputOrders from './InputOrders';

const { REACT_APP_BACKEND_URL } = process.env

const useStyles = makeStyles({
    card: {
        margin: '1.5rem',
        backgroundColor: 'rgb(213, 217, 222)',
    },
    button: {
        backgroundColor: 'rgb(180, 250, 130)'
    }
})


export default function Orders() {

    const clases = useStyles()

    const navigate = useNavigate()
    let token = window.localStorage.getItem('token');
    let config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }

    useEffect(() => {
        let token = window.localStorage.getItem('token');
        let config = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        axios.get(`${REACT_APP_BACKEND_URL}/api/users/admin/verify`, config)
            .then(res => {
                //    console.log(res.data)
            }).catch(err => {
                console.log(err)
                navigate('/')
            })
    }, [navigate])

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllOrders(config))
    }, [])

    const [allOrders, setAllOrders] = useState([])

    const { orders } = useSelector(state => state)

    if (typeof orders === 'object' && typeof orders.then === 'function') {
        orders.then(x => {
            setAllOrders(x.data)
        })
    }

    let contador = 1

    const statusOrders = allOrders.map(x => x.status)

    let orderStatusToShow = statusOrders.reduce((a, e) => { //ELIMINAR DUPLICADOS
        if (!a.find(d => d === e)) a.push(e)
        return a
    }, [])

    const [activeOrder, setActiveOrder] = useState('')
    //  console.log(activeOrder)
    let orderInList
    activeOrder === 'all' || activeOrder === '' ? orderInList = allOrders :
        orderInList = allOrders.filter(x => x.status === activeOrder)

    return (<>

        <h1> These are your Sales Orders </h1>
        {/* <select onChange={e=> setActiveOrder(e.target.value)}  > 
            <option value='all'> Selecciona el status que deseas filtrar </option>
            {
                orderStatusToShow.map(x=> <option value={x}> {x} </option> )
               
            }
        </select>     */}
        <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'> Filter by Status</InputLabel>
            <Select onChange={e => setActiveOrder(e.target.value)}  >
                <MenuItem value='all'> All </MenuItem>
                {
                    orderStatusToShow.map(x => <MenuItem value={x}> {x} </MenuItem>)

                }
            </Select>
        </FormControl>
        {
            orderInList.map(x => {
                return <div>
                    <Paper elevation={3} className={clases.card}>
                        <span><b> Sale Number:{contador++} </b> </span>
                        <span>UserId: {x.userId} </span>
                        <span>Fecha de compra: <b>{x.createdAt.slice(0, 10)}</b> </span>
                        {x.products.map(x => {
                            return <div style={{ borderBottom: '1.5px solid black' }}>

                                <span style={{ marginTop: '2rem', marginBottom: '-2.5rem' }}>  Product Name: <h2> {x.name} </h2> </span>
                                <span> Price: <b>$ {x.price}</b> </span>
                                <span>  Quantity:<b> {x.quantity} </b></span>
                            </div>
                        })}
                        <span> Total: <b> $ {x.amount}</b> </span>

                        <h4> Shipping Address </h4>
                        <span>Street: {x.address.line1} </span>
                        <span>City: {x.address.city} </span>
                        <span>Country:  {x.address.country} </span>
                        <span> C.P: {x.address.postal_code} </span>
                        <InputOrders
                            send={x.status}
                            id={x.orderId}
                        />
                    </Paper>
                </div>
            })
        }


    </>)
}