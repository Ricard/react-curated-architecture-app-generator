import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Box, IconButton, Grid } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

interface ConfirmDialogProps {
	title: string
	children: any
	open: boolean
	setOpen: (value: boolean) => void
	onConfirm: () => void
}

export const ConfirmDialog = (props: ConfirmDialogProps) => {
	const { title, children, open, setOpen, onConfirm } = props
	const handleClose = () => {
		setOpen(false)
	}
	const handleConfirm = () => {
		setOpen(false)
		onConfirm()
	}
	return (
		<Dialog open={open} onClose={handleClose} aria-labelledby="confirm-dialog">
			<DialogTitle id="confirm-dialog">
				<Box display="flex">
					<Box width="100%">{title}</Box>
					<IconButton size="small" color="inherit" onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				</Box>
			</DialogTitle>
			<DialogContent>{children}</DialogContent>
			<DialogActions>
				<Grid container justify="flex-start">
					<Button onClick={handleClose} variant="outlined">
						No
					</Button>
				</Grid>
				<Grid container justify="flex-end">
					<Grid item>
						<Button variant="outlined" onClick={handleConfirm} color="primary">
							Si
						</Button>
					</Grid>
				</Grid>
			</DialogActions>
		</Dialog>
	)
}
