// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************


// cypress/support/e2e.ts
Cypress.on('uncaught:exception', (err) => {
    // Ignore Bootstrap's jQuery requirement error
    if (err.message.includes("Bootstrap's JavaScript requires jQuery")) {
      return false;
    }
    // Ignore other known errors if needed
    return true;
  });

