import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit'

const localStorageKey = 'energy-management-session-info'
const localStorageSession = JSON.parse(localStorage.getItem(localStorageKey) || '{}')
const sessionElapsedTime = (new Date().getTime() - localStorageSession.timestamp) / 1000 / 60
const sessionHasExpired = sessionElapsedTime > 30
const initialToken = sessionHasExpired ? '' : localStorageSession.token

const user = {
	username: '',
	firstName: '',
	lastName: '',
	isAdmin: false,
	mail: ''
}
export type SessionUserState = typeof user

const initialState = {
	token: {
		value: initialToken,
		timestamp: new Date().getTime(),
		status: 'empty',
		errorMsg: ''
	},
	user
}
type SessionInfoState = typeof initialState

export const {
	actions: {
		setSessionUser,
		setSessionTokenSuccess,
		setSessionTokenError,
		loadingSessionInfo,
		clearSessionInfo,
		updateTokenTimestamp,
		checkTokenExpirity
	},
	reducer: sessionInfoReducer
} = createSlice({
	name: 'sessionInfo',
	initialState,
	reducers: {
		loadingSessionInfo: ({ token }) => {
			token.status = 'loading'
		},

		clearSessionInfo: ({ token }) => {
			localStorage.removeItem(localStorageKey)
			token.value = ''
		},
		setSessionUser: (info, { payload }: PayloadAction<SessionUserState>) => ({ ...info, user: payload }),
		setSessionTokenSuccess: ({ token }, { payload }: PayloadAction<string>) => {
			const now = new Date().getTime()

			if (now - token.timestamp > 500) {
				const localStorageSession = JSON.stringify({ token: payload, timestamp: now })
				localStorage.setItem(localStorageKey, localStorageSession)
				token.timestamp = now
			}

			token.value = payload
			token.status = 'success'
		},
		setSessionTokenError: ({ token }, { payload }: PayloadAction<string>) => {
			token.value = ''
			token.status = 'error'
			token.errorMsg = payload
		},
		updateTokenTimestamp: ({ token }) => {
			token.timestamp = new Date().getTime()
		},
		checkTokenExpirity: ({ token }) => {
			const now = new Date().getTime()
			const halfHourMs = 1800000

			if (now - token.timestamp > halfHourMs) {
				localStorage.removeItem(localStorageKey)
				token.value = ''
				token.status = 'error'
				token.errorMsg = 'Session has expired'
			}
		}
	}
})

const sessionInfoSelector = ({ sessionInfo }: { sessionInfo: SessionInfoState }) => sessionInfo

export const sessionTokenStatusSelector = createSelector([sessionInfoSelector], sessionInfo => sessionInfo.token)
export const sessionTokenValueSelector = createSelector(
	[sessionTokenStatusSelector],
	sessionToken => sessionToken.value
)
export const sessionUserSelector = createSelector([sessionInfoSelector], sessionInfo => sessionInfo.user)
