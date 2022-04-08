import { useEffect } from "react"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const { REACT_APP_BACKEND_URL } = process.env

export default function EmailActivate() {
    const navigate = useNavigate()
    const { token } = useParams()

    useEffect(() => {
        axios.post(`${REACT_APP_BACKEND_URL}api/auth/email-activate/${token}`)
            .then(response => {
                console.log(response)

            })
            .catch(error => {
                console.log(error)

            })
    }, [navigate, token])


    return <h1> Account activated satisfactory </h1>
}