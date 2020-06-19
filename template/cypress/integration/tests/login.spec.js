describe( 'login', function () {
	const username = 'elores'
	const password = 'celsa2019'

	it( 'wrong credentials', function () {
		cy.visit( 'http://localhost:3000/login' )

		cy.get( ':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input' )
			.type( 'wrongusername' )
			.should( 'have.value', 'wrongusername' )

		cy.get( ':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input' )
			.type( 'wrongpassword' )
			.should( 'have.value', 'wrongpassword' )

		cy.get( '.MuiCardActions-root' )
			.click()

		cy.contains( 'Wrong credentials' )
	} )

	it( 'logs in successful and displays username', function () {
		cy.visit( 'http://localhost:3000/login' )

		cy.get( ':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input' )
			.type( username )
			.should( 'have.value', username )

		cy.get( ':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input' )
			.type( password )
			.should( 'have.value', password )

		cy.get( '.MuiCardActions-root' )
			.click()

		cy.contains( 'Ernesto' )
	} )

	it( 'log out', function () {
		cy.get( '.MuiToolbar-root > .MuiGrid-container > :nth-child(6) > div > button' )
			.click()

		cy.contains( 'Logout' )
			.click()

		cy.contains( 'Login' )
		cy.contains( 'Username' )
	} )

	it( 'does not allow navigation to private part, because we logged out', function () {
		cy.visit( 'http://localhost:3000/' )

		cy.contains( 'Login' )
		cy.contains( 'Username' )
	} )

} )