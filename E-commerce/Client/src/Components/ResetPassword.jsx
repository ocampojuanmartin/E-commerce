import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { Button } from "@mui/material"

const { REACT_APP_BACKEND_URL } = process.env

export default function ResetPassword() {
    const [newPass, setNewPass] = useState('');
    const { token } = useParams();
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const handleResetPassword = (e) => {

        e.preventDefault();
        axios.put(`${REACT_APP_BACKEND_URL}/api/auth/reset-password`, {
            newPass: newPass,
            resetLink: token
        }).then((response) => {
            console.log(response);
            setMessage(response.data.message);
            setSuccess(true);
        }).catch((error) => {
            console.log(error);
            setMessage("Invalid request or expired link");
        })
    }


    return (
        <div>
            <h1>Reset Password</h1>
            <p>
                <label>New Password:</label>
                <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} />
            </p>
            <p>
                <Button variant="contained" color='primary' onClick={handleResetPassword}>Reset Password</Button>
            </p>
            {success && <p>{message}</p>}
        </div>
    );
}