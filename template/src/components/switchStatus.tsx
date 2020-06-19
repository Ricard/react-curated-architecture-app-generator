import React, { ReactElement } from 'react'
import { Grid, Typography, Box } from '@material-ui/core'
import Loader from 'components/loader'
import WarningIcon from '@material-ui/icons/Warning'
import CancelIcon from '@material-ui/icons/Cancel'
import { RemoteStatus } from 'common'

interface StatusProp {
	status: RemoteStatus
	children: ReactElement
}
export const SwitchStatus = ({ status, children }: StatusProp) => {
	interface MessageProps {
		title: string
	}
	const Message = ({ title }: MessageProps) => {
		return (
			<Grid container style={{ placeContent: 'center', paddingTop: '2em' }}>
				<Typography
					variant="button"
					style={{
						backgroundColor: '#d13e44',
						color: 'white',
						padding: '0.5em',
						paddingLeft: '1em',
						paddingRight: '1em'
					}}
				>
					{title}
				</Typography>
			</Grid>
		)
	}
	switch (status) {
		case 'loading':
			return (
				<>
					<Grid container style={{ placeContent: 'center', paddingTop: '1em' }}>
						<Loader fullscreen={false} />
					</Grid>
				</>
			)
		case 'empty':
			return (
				<>
					<Grid container style={{ placeContent: 'center', paddingTop: '1em' }}>
						<WarningIcon style={{ fontSize: '3em', color: '#d13e44' }} />
					</Grid>
					<Message title="There is no Data"></Message>
				</>
			)
		case 'error':
			return (
				<>
					<Grid container style={{ placeContent: 'center', paddingTop: '1em' }}>
						<CancelIcon style={{ fontSize: '4em', color: '#d13e44' }} />
					</Grid>
					<Message title="Failed to import Data"></Message>
				</>
			)
		case 'success':
			return <Box className="content">{children}</Box>
		default:
			return <> </>
	}
}
