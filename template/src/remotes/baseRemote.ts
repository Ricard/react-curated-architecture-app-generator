import axios, { AxiosInstance } from 'axios'
import { ConfigState, configSelector } from 'state/appSettingsSlice'
import { ERROR_TYPE } from 'common'
import {
	sessionTokenValueSelector,
	checkTokenExpirity,
	updateTokenTimestamp,
	setSessionTokenError
} from 'state/sessionInfoSlice'
import { store } from 'state/store'

export class BaseRemote {
	public CONFIG!: ConfigState
	public client!: AxiosInstance

	public constructor() {
		this.CONFIG = configSelector(store.getState())
		this.initClient()
	}

	private initClient = () => {
		this.client = axios.create({
			// headers: {
			// 	'Access-Token': sessionTokenValueSelector(store.getState()) // , Cache-Control': cache
			// 	// 'Content-Type': 'application/json'
			// }
		})

		this.client.interceptors.request.use(request => {
			store.dispatch(checkTokenExpirity())
			request.headers['Access-Token'] = sessionTokenValueSelector(store.getState())

			return request
		})

		this.client.interceptors.response.use(
			response => {
				store.dispatch(updateTokenTimestamp())

				return response
			},
			error => {
				if (error.response.status === 401) {
					store.dispatch(setSessionTokenError(error.response.data.message))
				}

				return Promise.reject(axios.isCancel(error) ? ERROR_TYPE.CANCEL : error)
			}
		)
	}
}
