const sessionInfo = {}
const localStorageKey = 'energy-management-session-info'

Cypress.Commands.add( "grantValidMiimetiqToken", () => {
	const sessionElapsedTime = ( new Date().getTime() - ( sessionInfo.timestamp || '' ) ) / 1000 / 60
	const sessionHasExpired = sessionElapsedTime > 30

	if ( sessionHasExpired ) {
		cy.request( {
			method: 'POST',
			url: 'http://api.stg2-miimetiq.celsagroup.com/authn/login',
			body: { username: "elores", password: "celsa2019" }
		} ).then( ( { body } ) => {
			Cypress.log( { body } )

			sessionInfo.token = body.token
			sessionInfo.timestamp = new Date().getTime()

			localStorage.setItem( localStorageKey, JSON.stringify( sessionInfo ) )
		} )
	} else {
		localStorage.setItem( localStorageKey, JSON.stringify( sessionInfo ) )
	}
} )