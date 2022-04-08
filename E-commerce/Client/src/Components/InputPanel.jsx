import { useState, useEffect } from 'react'
import { Button, Paper, Typography, Grid } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../Redux/actions';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    paper: {
        backgroundColor: 'rgb(173, 184, 175)',
        boxShadow: '0 5px 5px rgb(0,0,0,0.1)',
        borderRadius: '5px',
        border: 'solid 1px black'
    },
    card: {
        margin: '1.5em'
    }
})

export default function InputPanel({ name, quantity, price, brand, description, img, isOnStock, rating, sku,
    __v, _id, handleSelectQuant, handleSelectPrice, handleSubmitChanges, category, handleAddCategory,
    handleDeleteCategory, cate, handleDeleteProduct
}) {

    const clases = useStyles()
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)
    const handleEditProduct = () => {
        setEdit(!edit)
    }

    useEffect(() => {
        dispatch(getAllCategories())
    }, [])
    const { categories } = useSelector(state => state)

    return (
        <div className={clases.card}>
            <Typography variant='subtittle1'>
                Product_ID: {_id}
            </Typography>
            <Typography variant='h5'>
                {name}
            </Typography>
            {edit ?
                <span> Stock: <input type="number" name='quantity' min='0' placeholder={quantity} onChange={e => handleSelectQuant(e.target.value)} /></span>
                : <span>  Stock: <b>{quantity}</b> </span>}


            {edit ?
                <span> Price: <input type="number" name='quantity' min='0' placeholder={price} onChange={e => handleSelectPrice(e.target.value)} /></span>
                : <span> Price: <b> $ {price}  </b> </span>}

            {edit ?
                <div>
                    <select onChange={e => handleAddCategory(e.target.value)}>
                        <option value={category}> Select the categories for your product </option>
                        {categories.map(x => <option key={x} value={x}> {x} </option>)}

                    </select>
                    <Paper>
                        Your selected categories:

                        {category.map(x => {
                            return <div>
                                <h4> {x} </h4>
                                <Button variant="contained" color="error" onClick={() => handleDeleteCategory(x)}> X </Button>
                            </div>
                        })}

                    </Paper>
                </div>
                :
                <div>

                    <span> Categories: </span>
                    {cate.map(x => <span key={x}> <b> {x} </b> </span>)}
                </div>
            }

            <Grid container direction='column' sx={{ paddingLeft: '3em', paddingRight: '3em' }}>
                {edit ?

                    <Button variant="contained" color="secondary"
                        style={{ marginTop: '1em' }}
                        onClick={(x) => handleSubmitChanges(x)}
                    >
                        Save change
                    </Button> : <Button variant="contained" color="secondary" style={{ marginTop: '1em' }} onClick={() => handleEditProduct()} >
                        Edit Product
                    </Button>}
                <Button variant="contained" color="error" onClick={() => handleDeleteProduct()} style={{ marginTop: '1em' }}> Delete Product </Button>
            </Grid>

        </div>


    )
}