/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { Drawer, makeStyles, Theme, createStyles, Divider, List, Box } from '@material-ui/core'
import clsx from 'clsx'
import { ReactFragment } from 'react'

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
			whiteSpace: 'nowrap'
		},
		drawerOpen: {
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen
			})
		},
		drawerClose: {
			overflowX: 'hidden',
			width: theme.spacing(7) + 1,
			[theme.breakpoints.up('sm')]: {
				width: theme.spacing(9) + 1
			}
		},
		drawerHeader: {
			display: 'flex',
			alignItems: 'center',
			paddingTop: '7em',
			justifyContent: 'center'
		}
	})
)

const Sidebar = ({ children }: { children: ReactFragment }) => {
	const classes = useStyles()
	const [sideBarOpen, setSidebarOpen] = React.useState(false)

	const HandleSideBarOnMouseEnter = () => {
		setSidebarOpen(true)
	}

	const HandleSideBarOnMouseLeave = () => {
		setSidebarOpen(false)
	}

	return (
		<Drawer
			variant="permanent"
			className={clsx(classes.drawer, {
				[classes.drawerOpen]: sideBarOpen,
				[classes.drawerClose]: !sideBarOpen
			})}
			classes={{
				paper: clsx({
					[classes.drawerOpen]: sideBarOpen,
					[classes.drawerClose]: !sideBarOpen
				})
			}}
			onMouseEnter={HandleSideBarOnMouseEnter}
			onMouseLeave={HandleSideBarOnMouseLeave}
		>
			<Box className={classes.drawerHeader} />
			<List component="nav">{children}</List>
			<Divider />
		</Drawer>
	)
}

export default Sidebar
