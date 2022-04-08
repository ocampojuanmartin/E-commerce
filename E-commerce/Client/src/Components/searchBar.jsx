import { Button } from "@mui/material";
import { Search } from '@mui/icons-material';
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux"
import { Link, useNavigate } from 'react-router-dom';
import { searchProduct } from "../Redux/actions";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from "axios";
import Grid from '@mui/material/Grid';
import Swal from 'sweetalert2'

const { REACT_APP_BACKEND_URL } = process.env

export default function SearchBar() {




    const navigate = useNavigate()
    const [search, setSearch] = useState()
    const [productos, setProductos] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        getProductFromBack()
    }, [])

    const onSubmitSearch = (event) => {
        if (!event) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'We need something to search',
            })
        } else {
            dispatch((searchProduct(event)))
            setSearch("")
            navigate("/result")
        }

    }

    function onHandleSearch(event) {
        event.preventDefault()
        setSearch(event.target.value)
        console.log(222, event.target.value)
    }
    const getProductFromBack = async () => {
        const productillos = await axios.get(`${REACT_APP_BACKEND_URL}/api/products`)
        setProductos(productillos.data)
    }
    const optionProduct = []
    productos.forEach(e => {
        optionProduct.push({ label: e.name })
    })

    return (<>
        <div className="inputsearch">

            {/* <form onSubmit={() => onSubmitSearch(search)}> */}
            <Grid container spacing={2} justifyContent="center"
                alignItems="center">
                <Autocomplete
                    name="search"
                    style={{
                        backgroundColor: "white",
                        borderRadius: "5px",
                        margin: "5px"
                    }}
                    clearOnBlur
                    onSelect={(event) => onHandleSearch(event)}
                    value={search}
                    // disablePortal
                    id="combo-box-demo"
                    options={optionProduct}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} placeholder="Search..." />}
                    type="submit"
                    disableListWrap={false}

                />

                {/* <Link to="/result" style={{ textDecoration: "none" }}> */}
                <Button
                    style={{

                        borderRadius: "5px",
                        margin: "5px"
                    }}
                    type="submit"
                    color="navBtnColor"
                    variant="contained"
                    startIcon={<Search />}

                    onClick={() => onSubmitSearch(search)
                    }
                >
                    Search
                </Button>
                {/* </Link> */}
            </Grid>
            {/* </form> */}
        </div>

    </>)
}
