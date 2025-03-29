import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    env: {
      apiUrl: 'http://localhost:4200/api'
    },

    specPattern: "cypress/integration/**/*.cy.ts",
    supportFile: "cypress/support/e2e.ts",

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});