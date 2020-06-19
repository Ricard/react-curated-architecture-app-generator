import { BaseRemote } from 'remotes/baseRemote'

class HomeRemote extends BaseRemote {
	public constructor() {
		super()
	}

	// public getMonitors = () => this.client.get(this.CONFIG.HOME.REALTIME_URL).then(({ data }) => data)
}

export default new HomeRemote()
