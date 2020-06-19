import { Dispatch, createSlice, createSelector } from '@reduxjs/toolkit'

// Take a look on Consume & CONSUMES for defining global enums and types:
import { /*Consume, CONSUMES,*/ setNotification } from 'state/notificationsSlice'
// import homeRemote from 'remotes/homeRemote'

const initialState = {
	consumeMonitors: null,
	status: 'empty'
}

type HomeState = typeof initialState

export const {
	actions: { loadingMonitorsData },
	reducer: homeReducer
} = createSlice({
	name: 'home',
	initialState,
	reducers: {
		loadingMonitorsData: state => {
			state.status = 'loading'
		}
	}
})

const homeSelector = ({ home }: { home: HomeState }) => home
export const homeDataStatusSelector = createSelector([homeSelector], home => home.status)

export const loadHomeDataThunk = () => async (dispatch: Dispatch<any>, getState: Function) => {
	try {
		// const homeDataStatus = homeDataStatusSelector(getState())
		// if (homeDataStatus === 'empty') {
		// dispatch(loadingMonitorsData())
		// const [monitors] = await Promise.all([homeRemote.getMonitors()])
		// dispatch(setMonitorsData(monitors))
		// }
	} catch (response) {
		dispatch(setNotification({ message: "Can't load home data", type: 'error' }))
	}
}
