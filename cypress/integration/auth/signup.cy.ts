describe('Signup Component', () => {
  const apiUrl = 'http://localhost:8081/api/auth/register';
  beforeEach(() => {
    cy.visit('http://localhost:4200/');
    cy.get('header .navbar').within(() => {
      cy.contains('a.nav-link', 'Sign Up').click();
    });
  })

  it('should display the signup form', () => {


    cy.contains('Sign Up');
  });

  it('should display the signup form', () => {
    cy.get('.signup-container').should('be.visible');
    cy.get('.signup-box h2').should('contain', 'Create an account');
  });

  it('should validate required fields on interaction', () => {
    // Submit button should be disabled initially
    cy.get('.signup-btn').should('be.disabled');

    // Trigger validation by focusing and blurring each field without entering anything
    cy.get('input[formControlName="username"]')
      .focus()
      .blur();
    cy.get('input[formControlName="email"]')
      .focus()
      .blur();
    cy.get('input[formControlName="password"]')
      .focus()
      .blur();
    cy.get('input[formControlName="phoneNumber"]')
      .focus()
      .blur();
    cy.get('mat-checkbox[formControlName="termsAndConditions"]')
      .click() // Check
      .click(); // Uncheck to trigger validation

    // Check for required field errors
    cy.get('mat-error').should('contain', 'Username is required');
    cy.get('mat-error').should('contain', 'Email is required');
    cy.get('mat-error').should('contain', 'Password is required');
    cy.get('mat-error').should('contain', 'Phone Number is required');
    cy.get('mat-error').should('contain', 'You must agree to terms and conditions');

    // Submit button should still be disabled
    cy.get('.signup-btn').should('be.disabled');

    // Fill one field and verify partial state
    cy.get('input[formControlName="username"]').type('testuser');
    cy.get('mat-error').should('not.contain', 'Username is required');
    // Other errors should still be present
    cy.get('mat-error').should('contain', 'Email is required');
    cy.get('.signup-btn').should('be.disabled');
  });


  it('should submit the form and simulate success', () => {
    // Load response fixture
    cy.fixture('auth/signUp/response.json').then((response) => {
      // Mock API with fixture data
      cy.intercept('POST', apiUrl, {
        success: response.saved.success,
        message: response.saved.message
      }).as('registerRequest');
    });

    // Load request fixture
    cy.fixture('auth/signUp/request.json').then((request) => {
      // Fill form with fixture data
      cy.get('input[formControlName="username"]').type(request.valid.username);
      cy.get('input[formControlName="email"]').type(request.valid.email);
      cy.get('input[formControlName="password"]').type(request.valid.password);
      cy.get('input[formControlName="phoneNumber"]').type(request.valid.phoneNumber);
      cy.get('mat-checkbox[formControlName="termsAndConditions"]').click();

      // Submit form
      cy.get('.signup-btn').click();

      // Verify request payload
      cy.wait('@registerRequest').then((interception) => {
        expect(interception.request.body).to.deep.equal({
          username: request.valid.username,
          password: request.valid.password,
          email: request.valid.email,
          phoneNumber: request.valid.phoneNumber,
          roleId: request.valid.roleId,
        });
      });
    });



    // Verify success message
    cy.contains('Log in to your account')
    cy.get('mat-dialog-container').should('exist'); // Login dialog
    cy.get('input[formControlName="username"]').should('have.value', '');
  });


});