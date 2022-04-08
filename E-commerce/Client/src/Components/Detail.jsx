import { IconButton, Button, Typography, Grid, Divider, Box, Paper } from "@mui/material";
import Rating from '@material-ui/lab/Rating';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addCart, cleanDetail, detailProduct } from "../Redux/actions";
import { makeStyles } from '@mui/styles';
import { Link } from "react-router-dom";
import { Home } from '@mui/icons-material';



export default function Detail() {

    const { _id } = useParams()
    const { detailproduct } = useSelector(state => state)
    const [selectedImage, setSelectedImage] = useState(0)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(cleanDetail())
    }, [])
    const useStyles = makeStyles((theme) => ({
        borderImg: {
            border: '#solid black',
            height: "100",
            cursor: "pointer"
        },
        root: {
            paddingTop: "10em"
        },
    }));
    const classes = useStyles();


    useEffect(() => {
        dispatch(detailProduct(_id))
    }, [])


    const myProduct = {
        _id: detailproduct._id,
        name: detailproduct.name,
        price: detailproduct.price,
        img: detailproduct.img,
        rating: detailproduct.rating,
        quantity: detailproduct.quantity
    }

    let stock = detailproduct.quantity


    const handleAddCart = () => {
        dispatch(addCart(myProduct))
    }


    let pricetoshow = myProduct.price ? myProduct.price.toFixed(2) : null

    console.log(detailproduct.category)


    return (
        <div className={classes.root}>
            {(detailproduct.name) ?
                <Grid >
                    <Grid container spacing={1} style={{ maxWidth: 1100, }}>

                        <Grid item sm={1}>
                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center">
                                {myProduct.img.map((img, index) => (
                                    <img src={img} alt="img" key={index} onClick={() => setSelectedImage(index)} height={80} width={80} style={{ border: "solid 2px #eee", cursor: "pointer" }} />
                                ))}
                            </Grid>
                        </Grid>


                        <Grid item sm={5}>

                            <img src={detailproduct.img[selectedImage]} alt="img" height="500" width="100%" />

                        </Grid>

                        <Grid item sm={6}>
                            <Grid container
                                direction="column"
                                style={{ height: '100%' }}>
                                <Typography variant="subtitle1">
                                    {detailproduct.category[1] ? detailproduct.category[1] : detailproduct.category[0]}
                                </Typography>
                                <Divider />
                                <Box mt={2}>
                                    <Typography variant="h4">{detailproduct.name}</Typography>
                                    <Typography variant="subtitle1" >{detailproduct.description}</Typography>
                                    <Typography variant="h5">${pricetoshow}</Typography>
                                    <Grid >
                                        <Typography variant="subtitle1">Rating:</Typography>
                                        <Rating name="half-rating-read" value={detailproduct.rating} precision={0.5} readOnly />
                                    </Grid>
                                    <Typography variant="subtitle1">Stock: {stock}</Typography>
                                </Box>                                
                                    <Button variant="contained" color="secondary" className={classes.btn} style={{ marginTop: "auto" }}  onClick={() => handleAddCart()} >
                                        Add to cart
                                    </Button>
                            </Grid>
                        </Grid>

                        {stock === 0 ? <h1 style={{ color: 'red' }}> Lo siento, articulo no disponible </h1> : null}


                        <Grid item sm={12} sx={{ marginTop:"5em", }}>
                            <Paper elevation={3}>
                                <Typography variant="h5"> Comments:</Typography>
                                <Divider></Divider>
                                {
                                    detailproduct.reviews.map((e, index) => (
                                        <Grid item sm={12} key={index}>
                            
                                            <Typography variant="h6">{e.description}</Typography>
                                            <Rating name="half-rating-read" value={e.rating} precision={0.5} readOnly />

                                        </Grid>
                                    ))
                                }
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                : <div style={{ marginTop: 200 }} >

                    <img src="https://c.tenor.com/L50odLAEKNgAAAAi/lifting-weights-gyms.gif" style={{ justifyContent: "center", height: "300px", width: "300px" }} alt="image-loading" />
                </div>
            }
        </div>
    )
}