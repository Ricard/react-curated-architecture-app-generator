describe( 'testWithValidToken', function () {

	beforeEach( () => {
		// cy.debug()
		cy.grantValidMiimetiqToken()
	} )

	it( 'can navigate to private part', function () {
		cy.visit( 'http://localhost:3000/' )

		cy.contains( 'Ernesto' )
	} )

	it( 'again and again', function () {
		cy.visit( 'http://localhost:3000/' )

		cy.contains( 'Ernesto' )
	} )

} )