import { useState } from 'react'
import { Button } from "@mui/material";
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux';
import { updateOrder } from '../Redux/actions';

export default function InputOrders({ send, id }) {

    const [edit, setEdit] = useState(false)
    const dispatch = useDispatch()
    const [theStatus, setTheStatus] = useState('pending')
    const [error, setError] = useState('')

    const handleStatus = (e) => {
        setTheStatus(e)
    }

    const handleSubmitEvent = () => {

        let orderStatus = {
            "status": theStatus
        }
        let token = window.localStorage.getItem('token');
        let config = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }

        Swal.fire({
            title: 'Are you sure you want to change the order status?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, change!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(updateOrder(id, orderStatus, config))
                    .then(x => {
                        console.log(x)
                        if (x._id) {
                            const Toast = Swal.mixin({
                                toast: true,
                                position: 'top-center',
                                showConfirmButton: false,
                                timer: 3000,
                                timerProgressBar: true,
                            })

                            Toast.fire({
                                icon: 'success',
                                title: 'The status has been updated'
                            })
                            setTimeout(() => {
                                window.location.reload()
                            }, 3000)

                        } else {
                            Swal.fire(
                                x
                            )
                        }
                        //}).then(x=> {
                        //   window.location.reload()
                    }).catch(e => {
                        return e
                    })
            }
            //    setTimeout(()=> {
            //     window.location.reload()
            //    }, 2000) 
        })
    }


    return (
        <div>
            {edit ? <div style={{ marginBottom: '1rem' }}>
                <select onChange={e => handleStatus(e.target.value)}>
                    <option value='s'> Select the status of the order</option>
                    <option value='pending'>Pending </option>
                    <option value='dispatched'> Dispatched </option>
                    <option value='completed'> Complete </option>
                    <option value='canceled'> Canceled </option>
                </select>
                <Button variant='contained' color='secondary' style={{ marginBottom: '1rem' }} onClick={() => handleSubmitEvent()}>  Save Change </Button>
            </div>
                : <div style={{ marginBottom: '1rem' }}>
                    <span> Shipment status <b> {send} </b> </span>
                    <Button variant='contained' color='secondary' style={{ marginBottom: '1rem', marginTop: '0.5rem' }} onClick={() => setEdit(!edit)}> Change order status </Button>
                </div>
            }
        </div>
    )
}