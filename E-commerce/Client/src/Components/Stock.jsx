import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, editTheProduct, deleteOneItemFromStock } from "../Redux/actions";
import {  Paper } from "@mui/material";
import InputPanel from "./InputPanel";
import Swal from 'sweetalert2'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@mui/styles';

const { REACT_APP_BACKEND_URL } = process.env

const useStyles = makeStyles({
    paper: {
        backgroundColor: 'rgb(213, 217, 222)',
        boxShadow: '0 5px 5px rgb(0,0,0,0.1)',
        borderRadius: '10px',
        border: 'solid 1px black',
        margin: '2em'
    }
})

export default function Stock() {

    const clases = useStyles()

    const navigate = useNavigate()

    useEffect(() => {
        let token = window.localStorage.getItem('token');
        let config = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        axios.get(`${REACT_APP_BACKEND_URL}/api/users/admin/verify`, config)
            .then(res => {
                //console.log(res.data)
            }).catch(err => {
                console.log(err)
                navigate('/')
            })
    }, [])

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllProducts())
    }, [])

    const [myCategory, setMyCategory] = useState([])

    const handleAddCategory = (e) => {
        setMyCategory([...myCategory, e])

    }
    const handleDeleteCategory = (name) => {
        const newCategory = myCategory.filter(x => x !== name)
        setMyCategory(newCategory)

    }

    const { product } = useSelector(state => state)

    let productsValue = product.map(x => x.quantity * x.price)
    let investment = productsValue.reduce((acc, el) => acc + el, 0)
    investment = investment.toFixed(2)

    const [myNewDataProduct, setMyNewDataProduct] = useState({
        brand: "",
        description: "",
        img: "",
        isOnStock: true,
        name: "",
        price: 0,
        quantity: 0,
        rating: 0,
        sku: "",
        __v: 0,
        _id: "",
    })

    const [price, setPrice] = useState(0)
    const handleSelectPrice = (e) => {
        setPrice(Number(e))
    }

    const [quant, setQuant] = useState(0)
    const handleSelectQuant = (e) => {
        setQuant(Number(e))
    }

    const handleChangeProduct = (x) => {
        setMyNewDataProduct({
            category: myCategory === [] ? x.category : myCategory,
            brand: x.brand,
            description: x.description,
            img: x.img,
            isOnStock: x.isOnStock,
            name: x.name,
            price: price || x.price,
            quantity: quant || x.quantity,
            rating: x.rating,
            sku: x.sku,
            __v: x.__v,
            _id: x._id,
        })
    }

    const handleSubmitChanges = (x) => {
        handleChangeProduct(x)

        let check2 = myNewDataProduct._id !== ''

        if (check2 && myNewDataProduct.price > -1 && myNewDataProduct.quantity > -1) {
            Swal.fire({
                title: 'Your product will be updated!',
                text: "This action is to modify the database, are you sure you want to continue??",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, change!'
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(editTheProduct(myNewDataProduct))
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-center',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                      })
                      Toast.fire({
                        icon: 'success',
                        title: `The product has been updated`
                      })
                      setTimeout(() => {
                        window.location.reload()
                      }, 3000)
                                         
                }
               
            })
        }
    }

    const handleDeleteProduct = (x) => {
        Swal.fire({
            title: 'Your product will be deleted!',
            text: "This action is irremediable, are you sure you want to continue?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteOneItemFromStock(x._id))
                
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-center',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                  })
                  Toast.fire({
                    icon: 'success',
                    title: `The product has been deleted`
                  })
                  setTimeout(() => {
                    window.location.reload()
                  }, 3000)
            }
        })
    }

    return (
        <div>
            <h3> Your current inventory: </h3>

            {
                product.map(x => {
                    return <div key={x._id}>
                        <Paper className={clases.paper}>
                            <InputPanel
                                key={x._id}
                                name={x.name}
                                quantity={x.quantity}
                                price={x.price}
                                brand={x.brand}
                                description={x.description}
                                img={x.img}
                                isOnStock={x.isOnStock}
                                rating={x.rating}
                                sku={x.sku}
                                __v={x.__v}
                                _id={x._id}
                                category={myCategory}
                                handleDeleteCategory={handleDeleteCategory}
                                handleAddCategory={handleAddCategory}
                                handleSelectQuant={handleSelectQuant}
                                handleSelectPrice={handleSelectPrice}
                                handleSubmitChanges={() => handleSubmitChanges(x)}
                                cate={x.category}
                                handleDeleteProduct={() => handleDeleteProduct(x)}


                            />

                            {/* <Button  variant="contained" color="error" onClick={()=> handleDeleteProduct(x)}> Eliminar Producto </Button> */}
                        </Paper>
                    </div>
                })
            }

            <h1>Your investment in SportsMarket: <b> $ {investment} </b> </h1>
        </div>
    )
}