import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Modal from '@material-ui/core/Modal'
import Card from '@material-ui/core/Card'
import CircularProgress from '@material-ui/core/CircularProgress'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { useDispatch, useSelector } from 'react-redux'
import Notifyer from 'components/notifyer'
import { sessionTokenStatusSelector } from 'state/sessionInfoSlice'
import { loginThunk } from 'state/loginThunk'

const useStyles = makeStyles(() => ({
	card: {
		display: 'flex'
	},

	content: {
		flex: '1 0 auto',
		paddingBottom: '4px',
		margin: 'auto',
		zIndex: 0,
		width: '18em',
		paddingTop: '45px'
	},
	actions: {
		flex: '1 0 auto',
		padding: '16px',
		paddingTop: '4px'
	},
	imageContainer: {
		width: '300px',
		height: '300px'
	},
	image: {
		position: 'relative',
		height: '100%',
		width: '100%',
		padding: '20px'
	},
	imageIcon: {
		borderRadius: '50%',
		display: 'block',
		margin: 'auto'
	},
	imageIconConteainer: {
		transform: 'translate(0px, -90px)',
		position: 'absolute',
		width: '16em'
	},
	centered: {
		position: 'fixed',
		top: '40%',
		left: '50%'
	}
}))

const Login = ({ history }: any) => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const { status, errorMsg } = useSelector(sessionTokenStatusSelector)
	const [password, setPassword] = useState('')
	const [username, setUsername] = useState('')

	const changeUsername = ({ target }: React.ChangeEvent<HTMLInputElement>) => setUsername(target.value)
	const changePassword = ({ target }: React.ChangeEvent<HTMLInputElement>) => setPassword(target.value)

	const goLoginWhenEnter = ({ key }: React.KeyboardEvent<HTMLDivElement>) => {
		if (key === 'Enter') {
			login()
		}
	}

	const login = () => {
		dispatch(loginThunk(username, password, history))
	}

	return (
		<Grid container direction="column" alignItems="center" justify="center" style={{ minHeight: '95vh' }}>
			<Notifyer />
			<Modal
				aria-labelledby="spring-modal-title"
				aria-describedby="spring-modal-description"
				open={status === 'loading'}
				closeAfterTransition
				// BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500
				}}
				disableAutoFocus={true}
			>
				<CircularProgress
					style={{ outline: 'none' }}
					className={classes.centered}
					color="secondary"
					size={80}
				/>
			</Modal>
			<Card className={classes.card}>
				<div className={classes.imageContainer}>
					<img src="/assets/logo.svg" alt="Celsa Logo" className={classes.image}></img>
				</div>
				<div>
					<FormGroup onKeyPress={goLoginWhenEnter}>
						<CardContent className={classes.content}>
							<Grid className={classes.imageIconConteainer}>
								<img src="/assets/login-icon.png" alt="login" className={classes.imageIcon} />
							</Grid>
							<Typography color="textSecondary" variant="h5" component="h2" gutterBottom align="center">
								Login
							</Typography>
							<Grid container direction="column" alignItems="center" spacing={0}>
								<FormControl>
									<TextField
										error={status === 'error'}
										label="Username"
										InputLabelProps={{ shrink: true }}
										value={username}
										onChange={changeUsername}
										margin="normal"
										fullWidth
										variant="outlined"
									/>
								</FormControl>
								<FormControl>
									<TextField
										error={status === 'error'}
										helperText={errorMsg}
										label="Password"
										InputLabelProps={{ shrink: true }}
										value={password}
										type="password"
										fullWidth
										onChange={changePassword}
										margin="normal"
										variant="outlined"
									/>
								</FormControl>
							</Grid>
						</CardContent>
						<CardActions className={classes.actions}>
							<Button
								type="submit"
								disabled={!username || !password}
								onClick={login}
								fullWidth
								variant="contained"
								color="secondary"
							>
								Sign in
							</Button>
						</CardActions>
					</FormGroup>
				</div>
			</Card>
		</Grid>
	)
}

export default Login
