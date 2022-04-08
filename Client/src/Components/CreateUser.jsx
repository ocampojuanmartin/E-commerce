import React, { useEffect, useState } from "react"
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Container, Paper, Avatar, TextField, CssBaseline } from '@material-ui/core'
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons'
import { Button, Typography } from "@mui/material";
import Swal from 'sweetalert2'
import Checkbox from '@mui/material/Checkbox';
/////////////// material ui /////////////////
const useStyles = makeStyles(theme => ({
	root: {

		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		height: '100vh',

	},
	container: {
		opacity: '0.8',
		height: '90%',
		marginTop: theme.spacing(7),
		[theme.breakpoints.down(400 + theme.spacing(2) + 2)]: {
			marginTop: 0,
			width: '100%',
			height: '100%'
		},
		border: "1px solid black",
	},
	div: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.dark
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1)
	},
	button: {
		margin: theme.spacing(3, 0, 2)
	},
	divgoogle2: {
		marginTop: theme.spacing(3),
	}
}))





export default function CreateUser() {
	const navigate = useNavigate();
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const classes = useStyles()
	const [checked, setChecked] = useState(true);
	const { REACT_APP_BACKEND_URL, REACT_APP_GOOGLEKEY } = process.env

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('token')
		if (loggedUserJSON) {
			navigate("/")
		}
	}, [navigate])

	const responseSuccessGoogle = response => {
		console.log(response)
		axios({
			method: 'POST',
			url: `${REACT_APP_BACKEND_URL}/api/auth/googlelogin`,
			data: {
				tokenId: response.tokenId
			}
		}).then(response => {
			/*{
															 googleToken,
															 user: {_id, name, email}
															 } */
			window.localStorage.setItem("token", response.data.tokenId);
			window.location.reload(false)
			navigate("/")
			window.location.reload();

		})
	}

	const responseErrorGoogle = response => {
		console.log(response)
	}
	const handleRegister = async (event) => {
		try {

			axios({
				method: 'POST',
				url: `${REACT_APP_BACKEND_URL}/api/auth/signup`,
				data: {
					name: name,
					email: email,
					password: password,
					newsLetter: checked,
				}
			}).then(response => {
				Swal.fire(response.data.message)
				navigate('/')
			}).catch(err => {
				if (err.response.status === 400) {
					Swal.fire(err.response.data.error)

				}
			})
		} catch (e) {
			console.log("HandleRegister", e)
		}
	}

	return (

		<React.StrictMode>
			<Grid container component='main' className={classes.root}>
				<CssBaseline />
				<Container component={Paper} elevation={5} maxWidth='xs' className={classes.container}>
					<div className={classes.div}>
						<Avatar className={classes.avatar}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component='h1' variant='h5'>Sign Up</Typography>
						<form className={classes.form}>
							<TextField
								fullWidth
								type='text'
								color='primary'
								margin='normal'
								variant='outlined'
								label='name'
								name='name'
								value={name}
								onChange={(e) => { setName(e.target.value) }}
							/>
							<TextField
								fullWidth
								autoFocus
								type='password'
								color='primary'
								margin='normal'
								variant='outlined'
								label='password'
								name='password'
								value={password}
								onChange={(e) => { setPassword(e.target.value) }}
							/>
							<TextField
								fullWidth
								autoFocus
								color='primary'
								margin='normal'
								variant='outlined'
								label='email'
								name='email'
								value={email}
								onChange={(e) => { setEmail(e.target.value) }}
							/>
							<Typography component='h5' variant='h8'>
								do you want to subscribe to the newsletter ?
								<Checkbox
									checked={checked}
									onChange={(e) => { setChecked(e.target.checked) }}
									inputProps={{ 'aria-label': 'controlled' }} />
							</Typography>
							<Button
								fullWidth
								variant='contained'
								color='secondary'
								className={classes.button}
								onClick={() => handleRegister()}
							>
								Register
							</Button>

						</form>
						<div className={classes.divgoogle2}>
							<GoogleLogin
								clientId={REACT_APP_GOOGLEKEY}
								buttonText="Signup with Google"
								onSuccess={responseSuccessGoogle}
								onFailure={responseErrorGoogle}
								cookiePolicy={'single_host_origin'}
							/>
							<Typography component='h5' variant='h8'> Or sign in <Link to="/login">here</Link> </Typography>
						</div>
					</div>
				</Container>
			</Grid>
		</React.StrictMode>


	);
}