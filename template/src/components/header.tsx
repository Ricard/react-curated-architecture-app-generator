import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Box from '@material-ui/core/Box'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { Toolbar, makeStyles, Theme, AppBar, createStyles, Typography } from '@material-ui/core'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import styled from 'styled-components'

import { sessionUserSelector, SessionUserState } from 'state/sessionInfoSlice'
import { logoutThunk, userInfoThunk } from 'state/loginThunk'

const Styles = styled.div`
	.iconButton {
		color: #fefefe;
	}
	.logo {
		max-width: 10em;
	}
`
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		appBar: {
			backgroundColor: '#d13e44',
			zIndex: theme.zIndex.drawer + 1
		}
	})
)

const Header = () => {
	const dispatch = useDispatch()
	const logout = () => dispatch(logoutThunk())
	const { isAdmin, firstName }: SessionUserState = useSelector(sessionUserSelector)

	const classes = useStyles()

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	useEffect(() => {
		dispatch(userInfoThunk())
	}, [])

	return (
		<Styles>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<Box p={1} justifyContent="center">
						<img src="/assets/header/Celsa_Logo_White.png" alt="Celsa" className="logo" />
					</Box>
					<Box p={1} flexGrow={1} justifyContent="center" textAlign="center">
						<Typography variant="h5">Title</Typography>
					</Box>
					<IconButton onClick={handleClick} className="iconButton">
						<AccountCircleIcon fontSize="large"></AccountCircleIcon>
					</IconButton>
					<Menu
						id="simple-menu"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<MenuItem onClick={logout}>Logout</MenuItem>
					</Menu>
					<Box justifyContent="center">
						{firstName}
						<br></br>
						{isAdmin ? 'Admin' : ''}
					</Box>
				</Toolbar>
				<Box width="100%" bgcolor="#b8373c" color="primary.contrastText" p={1}></Box>
			</AppBar>
		</Styles>
	)
}

export default Header
