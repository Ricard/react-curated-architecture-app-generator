import { createSlice } from '@reduxjs/toolkit'

interface Notification {
	message: string
	type: 'error' | 'warning' | 'info' | 'success' | undefined
	open: boolean
}

const initialState: Notification = {
	message: '',
	type: undefined,
	open: false
}

export const {
	actions: { setNotification, cleanNoticationInfo },
	reducer: notificationReducer
} = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		setNotification: (state: Notification, { payload }) => ({
			...payload,
			open: true
		}),
		cleanNoticationInfo: state => {
			state.open = false
		}
	}
})

export const getNotificationSelector = ({ notification }: { notification: Notification }) => notification
