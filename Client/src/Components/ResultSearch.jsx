import { useDispatch, useSelector } from "react-redux"
import Card from "./Card"
import Grid from '@material-ui/core/Grid';
import { Button } from "@mui/material";
import { Home } from '@mui/icons-material';
import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { cleanDetail, cleanResultSearch } from "../Redux/actions";




export default function ResultSearch() {
    const { resultSearch, haveResult } = useSelector(state => state)
    const useStyles = makeStyles({
    });
    const classes = useStyles()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(cleanResultSearch())
    }, [])

    return (<div>
        <Grid
            style={{ marginTop: "50px" }}
            container spacing={2}
            justifyContent="center"
            alignItems="center">
            {
                (resultSearch.length !== 0) ?
                    resultSearch.map((e, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3}
                            key={index}

                        >
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

                    ))
                    : ((!haveResult) ? <img src="https://c.tenor.com/L50odLAEKNgAAAAi/lifting-weights-gyms.gif" style={{ justifyContent: "center", height: "300px", width: "300px" }} alt="image-loading" />
                        : <></>)
            }</Grid>


        {(haveResult) ? <div>
            <img src="https://c.tenor.com/yGOEI_Z1jPYAAAAi/dinosandcomics-dinosaur.gif" alt="img" width={300} style={{ marginTop: 50 }} />
            <h2>Sorry! we haven't found a product </h2>

        </div> : <></>}
        <Link to="/" style={{ textDecoration: "none" }}
            onClick={() => dispatch(cleanDetail())}
        >
            <Button
                color="navBtnColor"
                variant="contained"
                endIcon={<Home />}
                style={{ backgroundColor: 'black', marginTop: "30px" }}
                className={classes.burguerButton}
            >
                Home
            </Button>
        </Link>
    </div>)
}