/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react'
import {
	makeStyles,
	Theme,
	createStyles,
	ListItem,
	List,
	ListItemIcon,
	ListItemText,
	Collapse
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import DeviceHubIcon from '@material-ui/icons/DeviceHub'
import SettingsIcon from '@material-ui/icons/Settings'
import { Link, useLocation } from 'react-router-dom'
import DvrIcon from '@material-ui/icons/Dvr'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
import TuneIcon from '@material-ui/icons/Tune'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		fontSize: {
			fontSize: '3em'
		},
		linkText: {
			color: 'inherit',
			textDecoration: 'none'
		},
		fontStyle: {
			fontFamily: 'Raleway',
			fontStyle: 'normal',
			fontDisplay: 'swap',
			fontWeight: 400
		},
		nested: {
			paddingLeft: theme.spacing(4)
		}
	})
)

export const SidebarLinks = () => {
	const classes = useStyles()
	const { pathname } = useLocation()
	const [settingsSubMenuOpen, setSettingsSubMenuOpen] = useState(false)

	const handleSettingSubMenuClick = () => {
		setSettingsSubMenuOpen(!settingsSubMenuOpen)
	}

	return (
		<>
			<Link to="/" className={classes.linkText}>
				<ListItem button>
					<ListItemIcon>
						<HomeIcon
							className={classes.fontSize}
							color={pathname === '/' ? 'action' : 'disabled'}
						></HomeIcon>
					</ListItemIcon>
					<ListItemText className={classes.fontStyle} primary="Real-Time" />
				</ListItem>
			</Link>
			<Link to="/processmap" className={classes.linkText}>
				<ListItem button>
					<ListItemIcon>
						<DvrIcon
							className={classes.fontSize}
							color={pathname === '/processmap' ? 'action' : 'disabled'}
						/>
					</ListItemIcon>
					<ListItemText className={classes.fontStyle} primary="Process Map" />
				</ListItem>
			</Link>
			<Link to="/devices" className={classes.linkText}>
				<ListItem button>
					<ListItemIcon>
						<DeviceHubIcon
							className={classes.fontSize}
							color={pathname === '/devices' ? 'action' : 'disabled'}
						/>
					</ListItemIcon>
					<ListItemText className={classes.fontStyle} primary="Devices" />
				</ListItem>
			</Link>
			<ListItem button onClick={handleSettingSubMenuClick}>
				<ListItemIcon>
					<SettingsIcon
						className={classes.fontSize}
						color={pathname.startsWith('/settings') ? 'action' : 'disabled'}
					></SettingsIcon>
				</ListItemIcon>

				<ListItemText className={classes.fontStyle} primary="Settings" />
				{settingsSubMenuOpen ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={settingsSubMenuOpen} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<Link to="/settings/configurations" className={classes.linkText}>
						<ListItem button className={classes.nested}>
							<ListItemIcon>
								<TuneIcon color={pathname === '/settings/configurations' ? 'action' : 'disabled'} />
							</ListItemIcon>
							<ListItemText primary="Configurations" />
						</ListItem>
					</Link>

					<Link to="/settings/alarms" className={classes.linkText}>
						<ListItem button className={classes.nested}>
							<ListItemIcon>
								<NotificationsActiveIcon
									color={pathname === '/settings/alarms' ? 'action' : 'disabled'}
								/>
							</ListItemIcon>
							<ListItemText primary="Alarms" />
						</ListItem>
					</Link>
				</List>
			</Collapse>
		</>
	)
}
