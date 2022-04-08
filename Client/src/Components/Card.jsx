import * as React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Rating from '@material-ui/lab/Rating';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, addToFavorites, deleteFromFavorites } from '../Redux/actions';
import { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { Button, Typography } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
}));


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export default function Productcard({ id, price, name, description, img, rating, quantity }) {
  const dispatch = useDispatch()
  const classes = useStyles();

  const _id = id
  name = name.charAt(0).toUpperCase() + name.slice(1)
  let myProduct = { _id, name, price, img, rating, quantity, description }
  const functionToAddProductsToMyCart = () => {
    dispatch(addCart(myProduct))
  }


  const addMyFavoriteProduct = () => {
    dispatch(addToFavorites(myProduct))
  }

  const { favoriteItems } = useSelector(state => state)
  useEffect(() => {
  }, [favoriteItems])


  let showHeart = new Array
  favoriteItems.forEach(x => x !== null ? showHeart.push(x) : null)


  let boolean = showHeart.find(x => x._id === _id)

  const deleteMyFavoriteProduct = () => {


    let find = favoriteItems.some(x => x._id === myProduct._id)
    const deleteItem = favoriteItems.find(x => x._id === myProduct._id)
    if (find) {
      dispatch(deleteFromFavorites(deleteItem))
    } else console.log('hubo un problema')

  }


  return (

    <Card sx={{ maxWidth: 345 }}>

      <CardHeader

        action={
          <IconButton >

            {
              boolean === undefined ? <FavoriteBorder onClick={(e) => addMyFavoriteProduct(e)} /> : <FavoriteIcon onClick={deleteMyFavoriteProduct} />
            }


          </IconButton>
        }

        title={
          <Link to={`/product/${id}`} style={{ textDecoration: "none", color: "black" }} >
            {name}
          </Link>}

      />
      <Typography variant="h5" color="text.secondary">
        ${price}
      </Typography>

      <CardMedia
        component="img"
        height="200"
        image={img[0]}
        alt="myProduct"
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>


      <CardActions disableSpacing>

        <IconButton aria-label="addShop">
          <AddShoppingCartIcon onClick={functionToAddProductsToMyCart} />
        </IconButton>

        <Rating name="half-rating-read" value={rating} precision={0.5} readOnly />
      </CardActions>

    </Card>
  );
}
