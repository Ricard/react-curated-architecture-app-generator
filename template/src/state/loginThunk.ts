import {
	loadingSessionInfo,
	setSessionTokenSuccess,
	setSessionTokenError,
	clearSessionInfo,
	sessionUserSelector,
	setSessionUser
} from './sessionInfoSlice'
import { sessionRemote } from 'remotes/sessionRemote'

export const loginThunk = (username: string, password: string, history: any) => async (dispatch: any) => {
	try {
		dispatch(loadingSessionInfo())

		await dispatch(setSessionTokenSuccess(await sessionRemote.login(username, password)))

		history.push('/')
	} catch ({ response }) {
		dispatch(setSessionTokenError(response?.status === 400 ? 'Wrong credentials' : 'Network error'))
	}
}

export const logoutThunk = () => async (dispatch: any) => {
	sessionRemote.logout()
	dispatch(clearSessionInfo())
}

export const userInfoThunk = () => async (dispatch: any, getState: Function) => {
	const state = getState()
	const infoState = sessionUserSelector(state)

	if (infoState.username === '') {
		dispatch(setSessionUser(await sessionRemote.getUserInfo()))
	}
}
