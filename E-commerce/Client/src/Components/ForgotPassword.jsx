import axios from 'axios';
import { useState } from 'react';
import { Button } from "@mui/material"

const {REACT_APP_BACKEND_URL} = process.env 


export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const handleForgotPassword = (e) => {
        e.preventDefault();
        axios.put(`${REACT_APP_BACKEND_URL}/api/auth/forgot-password`, {
            email: email
        }).then((response) => {
            console.log(response);
            setMessage(response.data.message);
            setSuccess(true);
        }).catch((error) => {
            console.log(error);
            setMessage("Email not found or invalid request");
        })
    }

    return (
        <div>
            <h1>Forgot Password</h1>
            <p>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </p>
            <p>
                <Button variant="contained" color='error' onClick={handleForgotPassword}>Submit</Button>
            </p>
            {success && <p>{message}</p>}
        </div>
    )
}