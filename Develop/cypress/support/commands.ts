// cypress/support/commands.ts

// Extend Cypress.Chainable to include the custom command
export {};

declare global {
  namespace Cypress {
	interface Chainable {
	  customCommand(): void;
	}
  }
}

// Example custom command (empty for now)
Cypress.Commands.add('customCommand', () => {});
