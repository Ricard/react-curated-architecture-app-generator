/* eslint-disable @typescript-eslint/camelcase */
import axios from 'axios'
import { BaseRemote } from 'remotes/baseRemote'
import { SessionUserState } from 'state/sessionInfoSlice'

class SessionRemote extends BaseRemote {
	public constructor() {
		super()
	}

	public login = (username: string, password: string) =>
		axios
			.post<{ token: string }>(
				this.CONFIG.AUTH.LOGIN_URL,
				{
					username,
					password
				},
				{
					headers: {
						'Content-Type': 'application/json',
						'Cache-Control': 'no-cache'
					}
				}
			)
			.then(({ data }) => data.token)

	public logout = () => this.client.get<{ token: string }>(this.CONFIG.AUTH.LOGOUT_URL).then(({ data }) => data.token)

	public getUserInfo = () => {
		return this.client
			.get(this.CONFIG.AUTH.INFO_URL)
			.then(({ data }) => data)
			.then(
				({ username, first_name, last_name, is_admin, mail }: any): SessionUserState => ({
					username,
					firstName: first_name,
					lastName: last_name,
					isAdmin: is_admin,
					mail
				})
			)
	}
}

export const sessionRemote = new SessionRemote()
