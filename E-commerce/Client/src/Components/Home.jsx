import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, GetFilters } from "../Redux/actions";
import { useEffect } from "react";
import { makeStyles } from '@mui/styles';
import Menu from "./Menu"
import Card from "./Card"
import Grid from '@mui/material/Grid';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: "2em",
    },

}));


export default function Home() {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetFilters({ page: 1 }))
    }, [])

    const { product } = useSelector(state => state)

    const classes = useStyles();

    let productToShow = new Array
    product.forEach(x => {
        if (x.quantity !== 0) {
            productToShow.push(x)
        }
    })

    return (
        <div className={classes.root}>

            <Menu />
            <Grid container spacing={2} >
                {
                    (product.length !== 0) ?
                        productToShow.map((e, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={4}
                                key={index}>
                                <Card
                                    rating={e.rating}
                                    id={e._id}
                                    sku={e.sku}
                                    name={e.name}
                                    description={e.description}
                                    price={e.price}
                                    quantity={e.quantity}
                                    isOnStock={e.isOnStock}
                                    img={e.img}
                                    category={e.category}
                                    __v={e.__v} />
                            </Grid>

                        )) : <><img
                            src="https://c.tenor.com/NqKNFHSmbssAAAAi/discord-loading-dots-discord-loading.gif"
                            alt="image-loading"
                            style={{ justifyContent: "center", height: "50px", margin: "auto", marginTop: "150px" }}
                        ></img></>}
            </Grid>
            {/* <Paginado /> */}



        </div>
    )
}
