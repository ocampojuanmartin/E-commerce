import { ErrorSharp } from "@material-ui/icons"
import { Card, TextField, Button } from "@mui/material"
import axios from "axios"
import { useFormik } from "formik"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Swal from 'sweetalert2'
import { makeStyles } from "@mui/styles";

const { REACT_APP_BACKEND_URL } = process.env


const useStyles = makeStyles({
    container: {
        display: 'grid'
    },
    card: {
        backgroundColor: 'rgb(173, 184, 175)',
        boxShadow: '0 5px 5px rgb(0,0,0,0.1)',
        borderRadius: '5px',
        border: 'solid 1px black',
        alignSelf: "center",
        justifyContent: "center",
        display: "flex",
    }
})



export function Review() {
    const clases = useStyles()
    const { productId } = useParams()
    const { myShop } = useSelector(state => state)
    const navigate = useNavigate()
    // console.log(222222, productId)
    // console.log(333333, myShop[0].userId)
    //    0 ${myShop[0].products[0]}

    const formik = useFormik({
        onSubmit: async (valores, { resetForm }) => {
            let review = await axios.post(`${REACT_APP_BACKEND_URL}/api/review/create?userId=${myShop[0].userId}&productId=${productId}`, valores)
            if (review.data.status === false) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Something was wrong, you can't submmit a review of a product if you don't buy yet, 
                    or give a review twice.`,
                   

                })

            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Thanks for your comments!',
                })
                resetForm("")
            }
        },
        initialValues: {
            description: "",
            rating: ""
        },
        validate: (valores) => {
            let errors = {}

            if (!valores.description) {
                errors.description = "You must add a comment about the product"
            }

            if (!valores.rating) {
                errors.rating = "You must add a rating of the product between 0 to 5"
            } else if (valores.rating > 5 || valores.rating < 0) {
                errors.rating = "Only can submit values between 0 to 5"
            } else if (!/^[0-9.0-9]{1,3}$/.test(valores.rating)) {
                errors.rating = "Only numbers and a decimal"
            }

            return errors
        }
    })
    return (<div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", }}>
        <h2> Give us some comments about the product:</h2>
         <form onSubmit={formik.handleSubmit}  style={{width: '70%'}}>
            <Card
                style={{ backgroundColor: "#e9e9e9", display: "flex", alignItems: "center", color: 'white', borderRadius: '5px', justifyContent: "center", flexDirection: "column", width: '90%'  }}
                sx={{ width: '95%' }} className={clases.card}>
                <TextField
                    multiline
                    minRows={5}
                    style={{ marginTop: "30px", width: "90%", justifyContent: "center", backgroundColor: "white" }}
                    id="description"
                    name="description"
                    label="Give us your comments"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                    onBlur={formik.handleBlur}
                />

                <TextField

                    style={{ marginTop: "30px", width: '80%', justifySelf: "center", backgroundColor: "white" }}
                    id="rating"
                    name="rating"
                    label="Rating"
                    value={formik.values.rating}
                    onChange={formik.handleChange}
                    error={formik.touched.rating && Boolean(formik.errors.rating)}
                    helperText={formik.touched.rating && formik.errors.rating}
                    onBlur={formik.handleBlur}
                />
                <Button style={{ backgroundColor: "black", color: 'white', borderRadius: '5px', width: "80%", margin: "15px" }} color="primary" variant="contained" fullWidth type="submit">
                    Send comments
                </Button>

            </Card>
        </form>
    </div>)
}
