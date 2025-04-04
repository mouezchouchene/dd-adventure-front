describe('Signup Component', () => {
    const apiUrl = 'http://localhost:8081/api/auth/login';
    beforeEach(() => {
        cy.visit('http://localhost:4200/');
        cy.get('header .navbar').within(() => {
            cy.contains('a.nav-link', 'Login').click();
        });
    })

    it('should display the signup form', () => {


        cy.contains('Log in to your account');
    });


    it('should validate required fields on interaction', () => {
        // Submit button should be disabled initially
        cy.get('.login-btn').should('be.disabled');

        // Trigger validation by focusing and blurring each field without entering anything
        cy.get('input[formControlName="username"]')
            .focus()
            .blur();
        cy.get('input[formControlName="password"]')
            .focus()
            .blur();


        // Check for required field errors
        cy.get('mat-error').should('contain', 'Username is required');
        cy.get('mat-error').should('contain', 'Password is required');

        // Submit button should still be disabled
        cy.get('.login-btn').should('be.disabled');

        // Fill one field and verify partial state
        cy.get('input[formControlName="username"]').type('testuser');
        cy.get('mat-error').should('not.contain', 'Username is required');
        // Other errors should still be present
        cy.get('mat-error').should('contain', 'Password is required');
        cy.get('.login-btn').should('be.disabled');
    });


    it('should submit the form and simulate success', () => {
        // Load response fixture
        cy.fixture('auth/login/response.json').then((response) => {
            // Mock API with fixture data
            cy.intercept('POST', apiUrl, {
                statusCode: 200,
                body: {
                    jwt: response.jwt
                }

            }).as('LoginRequest');
        });

        // Load request fixture
        cy.fixture('auth/login/request.json').then((request) => {
            // Fill form with fixture data
            cy.get('input[formControlName="username"]').type(request.username);
            cy.get('input[formControlName="password"]').type(request.password);

            // Submit form
            cy.get('.login-btn').click();

            // Verify request payload
            cy.wait('@LoginRequest').then((interception) => {
                expect(interception.request.body).to.deep.equal({
                    username: request.username,
                    password: request.password,
                });
            });
        });

        cy.window().its('localStorage.jwtToken').should('exist');


    });


});
