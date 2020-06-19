import React, { lazy, Suspense } from 'react'

import { Route, RouteProps, Redirect } from 'react-router-dom'
// import { useSelector } from 'react-redux'

import { makeStyles, Theme, createStyles, Box, LinearProgress } from '@material-ui/core'

// import { sessionTokenValueSelector } from 'state/sessionInfoSlice'

// NOTE: React.lazy requires modules exported as default, because of this we return an object with default property:
const Notifyer = lazy(() => import('components/notifyer'))
const Header = lazy(() => import('components/header'))
const Sidebar = lazy(() => import('components/sidebar'))

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		content: {
			flexGrow: 1,
			transition: theme.transitions.create('margin', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen
			}),
			marginLeft: '73px',
			marginTop: '80px'
		}
	})
)
/*
	Redirects to login when token is wrong
	Adds Header and Sidebar
*/
export const PrivateRoute = ({
	component: Component,
	sidebarLinks: SidebarLinks,
	sessionRemote,
	...routeProps
}: any) => {
	// const token = useSelector(sessionTokenValueSelector)
	const token = true // TODO this unlocks the private part :)

	const classes = useStyles()

	return !token ? (
		<Redirect to="/login" />
	) : (
		<Route
			{...routeProps}
			render={(props: RouteProps) => (
				<>
					<Header />
					<Sidebar>
						<SidebarLinks />
					</Sidebar>
					{/* Lazy loading each route component */}
					<Suspense fallback={<LinearProgress style={{ top: 87, zIndex: 1500 }} color="secondary" />}>
						<Box className={classes.content}>{Component ? <Component {...props} /> : <></>}</Box>
					</Suspense>
					<Notifyer />
				</>
			)}
		/>
	)
}
