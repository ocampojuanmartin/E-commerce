import { useEffect, useState } from "react"
import axios from 'axios'
import Paper from "@material-ui/core/Paper";
import { Avatar, Button } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getShopsByUser } from "../Redux/actions";
import Swal from 'sweetalert2';
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
export default function Profile() {
    const { myShop } = useSelector(state => state)
    const dispatch = useDispatch()
    // const [myShop, setMyShop] = useState([])
    const clases = useStyles()

    useEffect(() => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: "Bearer " + token } }
        dispatch(getShopsByUser(config))
    }, [])



    const [edit, setEdit] = useState(false)
    const [url, setUrl] = useState('')



    function handeSelectPic(x) {
        try {
            //url = JSON.stringify(url)
            localStorage.setItem('foto', x)
            setEdit(false)
        } catch (e) { console.log(e) }
    }

    let img = localStorage.getItem('foto')

    const unsuscribe = async () => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: "Bearer " + token } }
        try {
            const news = await axios.put(`${REACT_APP_BACKEND_URL}/api/users/suscribe`, {
                newsLetter: false,
            }, config).then(response => {
                Swal.fire(response.data.message)
            }).catch(err => {
                if (err.response.status === 400) {
                    Swal.fire(err.response.data.error)
                }
            })
        } catch (e) {
            console.log("HandleRegister", e)
        }


    }

    const suscribe = async () => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: "Bearer " + token } }
        try {
            const news = await axios.put(`${REACT_APP_BACKEND_URL}/api/users/suscribe`, {
                newsLetter: true,
            }, config).then(response => {
                Swal.fire(response.data.message)
            }).catch(err => {
                if (err.response.status === 400) {
                    Swal.fire(err.response.data.error)
                }
            })
        } catch (e) {
            console.log("HandleRegister", e)
        }


    }

    let contador = 1
    return (
        <div>
            <Avatar
                sx={{ width: 98, height: 98 }}
                src={img}

            >

            </Avatar>
            <h1> Welcome to your Profile </h1>

            {
                !edit ? <Button onClick={() => setEdit(!edit)}> Change profile image </Button>
                    : <div> <input type='text' placeholder='selecciona la url de tu imagen' onChange={e => setUrl(e.target.value)} />
                        <Button onClick={() => handeSelectPic(url)}>Upload  image </Button>
                    </div>
            }

            <Button onClick={() => suscribe()}>subscribe to newsletter</Button>  or    <Button onClick={() => unsuscribe()}>unsubscribe</Button>

            {
                myShop.length < 1 ? <h2> You haven't bought anything yet.
                    What are you waiting for? See the Sports Market catalog, the best sports store in Latin America
                </h2> :
                    myShop.map(x => {
                        return <div>
                            <Paper elevation={3} className={clases.card}>
                                <h4>Compra # {contador++} </h4>
                                <span>Date of purchase: {x.createdAt.slice(0, 10)} </span>
                                <span>Purchase time: {x.createdAt.slice(11, 19)} </span>
                                {x.products.map(x => {
                                    return <div>
                                        <a href={`/product/${x.productId}`}>Product: {x.name} </a>
                                        <span> Quantity: {x.quantity} </span>
                                        <span> Price: $ {x.price} </span>
                                        <h5> Do you want to leave a comment? <Link to={`/review/${x.productId}`}> Click here</Link></h5>
                                    </div>
                                }
                                )}
                                <span> Status of the order: {x.status}</span>
                                <h4> Total: $ {x.amount} </h4>


                            </Paper>
                        </div>
                    })
            }

        </div>
    )
}