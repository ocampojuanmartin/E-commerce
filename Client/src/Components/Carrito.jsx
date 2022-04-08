import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Typography, Paper, Divider } from "@mui/material";
import { clearCart, deleteOneItemFromCart, addCart, deleteAllSingleItemFromCart } from "../Redux/actions";
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom";
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios';
import { useMediaQuery, } from "@mui/material";


const useStyles = makeStyles({
    root: {
        marginTop: 70,
    },

})

export default function Carrito() {
    const { REACT_APP_BACKEND_URL } = process.env
    const navigate = useNavigate()
    const classes = useStyles()
    const { shopingCart } = useSelector(state => state)
    const { shopingCart2 } = useSelector(state => state)
    const dispatch = useDispatch()
    const isActive = useMediaQuery("(max-width: 576px)")
    const [stripeToken, setStripeToken] = useState(null);
    // STRIPE -------------------- /// STRIPE 
    // STRIPE -------------------- /// STRIPE 
    const onToken = (token) => {

        setStripeToken(token)
    }
    //calcular el total de la compra 
    const myPayToStore = () => {
        let myItemPrice = shopingCart.map(x => x.price)
        let myFinallPay = myItemPrice.reduce((x, y) => x + y)
        return myFinallPay
    }
    let myPay = shopingCart.length > 0 ? myPayToStore().toFixed(2) : null
    const clearMyCart = () => {
        dispatch(clearCart())
    }
    const deleteOneItemFromMyCart = (id) => {
        dispatch(deleteOneItemFromCart(id))
    }

    const addOneItem = (id) => {
        dispatch(addCart(id))
    }
    const deleteAllSingleItems = (e) => {
        dispatch(deleteAllSingleItemFromCart(e))
    }
    //obtener cantidad de un articulo en particular 
    const countMyItem = () => {
        let myItemName = shopingCart.map(x => Object.assign({
            _id: x._id,
            piece: 1,
            name: x.name,
            price: x.price,
            quantity: x.quantity,
            img: x.img
        }))

        let myCartWithoutTwoItems = myItemName.reduce((acc, el) => {
            let existingElement = acc.find(e => e._id === el._id)
            if (existingElement) {
                return acc.map(x => {
                    if (x._id === el._id) {
                        return {
                            ...x,
                            piece: x.piece + el.piece
                        }
                    }
                    return x
                })
            }
            return [...acc, el]
        }, [])

        return myCartWithoutTwoItems
    }
    let countMyItemResult = shopingCart.length > 0 ? countMyItem() : null
    //console.log(countMyItemResult)
    useEffect(() => {

        const makePay = async () => {
            console.log(stripeToken)
            let amount = parseInt(myPay).toFixed(2)
            const token = localStorage.getItem("token")
            let config = { headers: { Authorization: 'Bearer ' + token } }
            try {
                const res = await axios.post(`${REACT_APP_BACKEND_URL}/api/payment/create`, {
                    tokenId: stripeToken.id,
                    amount: amount
                }, config).then(response => {
                    console.log(response.data)
                    window.localStorage.removeItem('carrito');
                    return response.data

                }).catch(error => {
                    console.log(error)
                })
                dispatch(clearCart())
                navigate("/success", {
                    state: {
                        userId: res.userId,
                        products: countMyItemResult.map(prod => {
                            return {
                                name: prod.name,
                                price: prod.price,
                                quantity: prod.piece,
                                img: prod.img,
                                productId: prod._id,
                            }
                        }),
                        amount: amount,
                        address: res.address,
                        orderId: res.orderId,
                        email: res.email
                    }
                })
            }
            catch (e) {
                console.log(e)
            }

        }
        stripeToken && makePay()
    }, [shopingCart, navigate, stripeToken, myPay, shopingCart2, countMyItemResult, REACT_APP_BACKEND_URL])

    return (
        <div className={classes.root}>
            <Grid >
                <Paper elevation={5} sx={{ padding: "3em" }}>
                    <Grid item sm={12} direction="row">
                        <Typography variant="h5">Shopping Cart: </Typography>
                    </Grid>
                    <Divider></Divider>
                    {
                        isActive ?
                            shopingCart.length > 0 ?
                                countMyItemResult.map(x => {
                                    return (
                                        <Grid container sx={{ padding: "2em" }}>
                                            <Grid item sm={2}>
                                                <img src={x.img[0]} alt={x.name} width={"80%"} height={"100"} />
                                            </Grid>
                                            <Grid item sm={3}>
                                                <Typography variant="h6" sx={{ marginTop: "1.5em" }} >{x.name}</Typography>
                                            </Grid>
                                            <Grid item sm={3}>
                                                <Typography variant="h6" sx={{ marginTop: "1.5em" }} >${x.price.toFixed(2)}</Typography>
                                            </Grid>

                                            <Grid container sm={3} direction="row" sx={{ paddingBottom: "3em" }}>
                                                <Button size='small' color="secondary" sx={{ marginTop: "2em", marginBottom: "2em" }} onClick={() => deleteOneItemFromMyCart(x._id)}> - </Button>
                                                <Typography variant="subtittle1" sx={{ marginTop: "2em" }} >{x.piece}</Typography>
                                                <Button size='small' color="secondary" sx={{ marginTop: "2em", marginBottom: "2em" }} onClick={() => addOneItem(x)}  > + </Button>
                                            </Grid>

                                            <Grid item sm={1}>
                                                <Button size='small' color="secondary" sx={{ marginTop: "2em", marginBottom: "2em" }} onClick={() => deleteAllSingleItems(x)}> Delete </Button>
                                            </Grid>
                                        </Grid>
                                    )
                                }
                                ) : 'Your cart is empty' :

                            shopingCart.length > 0 ? countMyItemResult.map(x => {
                                return (
                                    <Grid container sx={{ padding: "2em" }}>
                                        <Grid item sm={2}>
                                            <img src={x.img[0]} alt={x.name} width={"80%"} height={"100"} />
                                        </Grid>
                                        <Grid item sm={3}>
                                            <Typography variant="h6" sx={{ marginTop: "1.5em" }} >{x.name}</Typography>
                                        </Grid>
                                        <Grid item sm={3}>
                                            <Typography variant="h6" sx={{ marginTop: "1.5em" }} >${x.price.toFixed(2)}</Typography>
                                        </Grid>

                                        <Grid container sm={3} direction="row" sx={{ paddingBottom: "3em" }}>
                                            <Button size='small' color="secondary" sx={{ marginTop: "2em", marginBottom: "2em" }} onClick={() => deleteOneItemFromMyCart(x._id)}> - </Button>
                                            <Typography variant="subtittle1" sx={{ marginTop: "2em" }} >{x.piece}</Typography>
                                            <Button size='small' color="secondary" sx={{ marginTop: "2em", marginBottom: "2em" }} onClick={() => addOneItem(x)}  > + </Button>
                                        </Grid>

                                        <Grid item sm={1}>
                                            <Button size='small' color="secondary" sx={{ marginTop: "2em", marginBottom: "2em" }} onClick={() => deleteAllSingleItems(x)}> Remove </Button>
                                        </Grid>
                                    </Grid>
                                )
                            }) : 'Hey!, your cart is empty'}

                    <Divider></Divider>

                    <Grid container direction="row-reverse">
                        <Grid item sm={4} >

                            {shopingCart.length > 0 ? <Typography variant="h6"> Total: ${myPay}</Typography> : null}
                            {shopingCart.length > 0 ?
                                <Button
                                    sx={{ margin: "0.2em" }}
                                    variant="contained"
                                    color='error'
                                    onClick={clearMyCart}>
                                    Clear Basket
                                </Button>
                                : null
                            }
                            {myPay ?
                                <StripeCheckout
                                    token={onToken}
                                    stripeKey="pk_test_51KgvfFHEEv1tXsVZEpffi9X0VHCJ2XpgfPxentUc7Hx1qiTrS3uR1vXz0KDqpDkKBI5YX8ZLhxqah7FJhqK2vKXC00G70EZnc4"
                                    name="Sport Market"
                                    billingAddress
                                    shippingAddress
                                    description={`Your total is ${myPay}`}
                                    amount={myPay * 100}
                                >
                                    <Button variant="contained" color="secondary" sx={{ margin: "0.2em" }} >pay with card</Button>
                                </StripeCheckout>
                                : null}
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    )
}