/* eslint-disable @typescript-eslint/camelcase */
import axios from 'axios'
import { ConfigState } from 'state/appSettingsSlice'

class ConfigRemote {
	public getConfig = () => axios.get<Partial<ConfigState>>('/config.json').then(({ data }) => data)
}

const configRemote = new ConfigRemote()
export { configRemote as ConfigRemote }
