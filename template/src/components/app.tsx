import React, { FC, Suspense, lazy, useEffect } from 'react'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { createMuiTheme, MuiThemeProvider, CssBaseline, LinearProgress } from '@material-ui/core'
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme'

import { store } from 'state/store'
import { configSelector, retrieveConfigThunk } from 'state/appSettingsSlice'

const Routes = lazy(() => import('components/routes').then(({ Routes }) => ({ default: Routes })))

const celsaTheme = createMuiTheme({
	palette: {
		primary: { main: '#242021' },
		secondary: { main: '#d13e44' } // #e93324
	},
	overrides: {
		MuiDialogTitle: {
			root: {
				borderBottom: '10px solid #b8373c',
				backgroundColor: '#d13e44',
				color: '#fefefe',
				textAlign: 'center'
			}
		},
		MuiPickersToolbar: {
			toolbar: {
				backgroundColor: '#545454'
				// , borderRadius: '8px'
			}
		},
		MuiPickersDay: {
			daySelected: {
				backgroundColor: '#d13e44'
			}
		}
	}
} as ThemeOptions)

export const App: FC = () => (
	<Provider store={store}>
		<MuiThemeProvider theme={celsaTheme}>
			<CssBaseline />
			<AppWithConfig />
		</MuiThemeProvider>
	</Provider>
)

const AppWithConfig: FC = () => {
	const dispatch = useDispatch()
	const { status } = useSelector(configSelector)
	const isConfigReady = status === 'success'

	useEffect(() => {
		dispatch(retrieveConfigThunk())
	}, [])

	return isConfigReady ? (
		// Lazy loading routes component
		<Suspense fallback={<LinearLoading />}>
			<Routes />
		</Suspense>
	) : (
		<LinearLoading /> // Fetch config
	)
}

const LinearLoading: FC = () => {
	return <LinearProgress color="secondary" />
}
