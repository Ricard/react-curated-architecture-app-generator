import { configureStore } from '@reduxjs/toolkit'
import { notificationReducer } from 'state/notificationsSlice'
import { sessionInfoReducer } from 'state/sessionInfoSlice'
import { appSettingsReducer } from 'state/appSettingsSlice'
import { homeReducer } from 'state/homeSlice'

export const store = configureStore({
	reducer: {
		sessionInfo: sessionInfoReducer,
		appSettings: appSettingsReducer,
		notification: notificationReducer,
		home: homeReducer
	},
	devTools: process.env.NODE_ENV !== 'production'
})
