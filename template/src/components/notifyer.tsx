import React from 'react'
import { Snackbar, IconButton } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { useDispatch, useSelector } from 'react-redux'
import CloseIcon from '@material-ui/icons/Close'
import { getNotificationSelector, cleanNoticationInfo } from 'state/notificationsSlice'

const Notifyer = () => {
	const dispatch = useDispatch()
	const { type, message, open } = useSelector(getNotificationSelector)
	const closeNotification = () => {
		dispatch(cleanNoticationInfo())
	}
	return (
		<Snackbar open={open} autoHideDuration={6000} onClose={closeNotification}>
			<MuiAlert
				elevation={6}
				variant="filled"
				severity={type}
				action={
					<IconButton aria-label="close" color="inherit" size="small" onClick={closeNotification}>
						<CloseIcon />
					</IconButton>
				}
			>
				{message}
			</MuiAlert>
		</Snackbar>
	)
}

export default Notifyer
