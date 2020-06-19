import React, { lazy } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { PrivateRoute } from 'components/privateRoute'
import { SidebarLinks } from 'components/sidebarLinks'

// NOTE: React.lazy requires modules exported as default, because of this we return an object with default property:
const Login = lazy(() => import('components/login'))
const Home = lazy(() => import('components/home'))

const history = createBrowserHistory()

// TODO no need for separated sidebarlinks from sidebar component (and pass it as dependency...)
const commonProps = {
	exact: true,
	sidebarLinks: SidebarLinks
}

export const Routes = () => (
	<Router history={history}>
		<Switch>
			<Route exact path="/login" render={() => <Login history={history} />} />
			<PrivateRoute {...commonProps} component={Home} />
		</Switch>
	</Router>
)
