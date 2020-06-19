import { createSlice, createSelector, Dispatch } from '@reduxjs/toolkit'
import { ConfigRemote } from 'remotes/configRemote'

const config = {
	AUTH: {
		LOGIN_URL: '',
		LOGOUT_URL: '',
		INFO_URL: ''
	},
	HOME: {
		REALTIME_URL: ''
	},
	status: 'empty'
}

const initialState: { config: ConfigState } = {
	config
}

export type ConfigState = typeof config

export const {
	actions: { setConfig },
	reducer: appSettingsReducer
} = createSlice({
	name: 'appSettings',
	initialState,
	reducers: {
		setConfig: (state, { payload }) => ({
			...state,
			config: { ...payload, status: 'success' }
		})
	}
})

const appSettingsSelector = ({ appSettings }: { appSettings: any }) => appSettings

export const configSelector = createSelector(
	[appSettingsSelector],
	(appSettings: { config: ConfigState }) => appSettings.config
)

export const retrieveConfigThunk = () => async (dispatch: Dispatch, getState: Function) => {
	try {
		const state = getState()
		const stateConfig = configSelector(state)

		if (['empty', 'error'].includes(stateConfig.status)) {
			const config: Partial<ConfigState> = await ConfigRemote.getConfig()
			dispatch(setConfig(config))
		}
	} catch ({ response }) {
		// TODO need for handling error loading config?
	}
}
