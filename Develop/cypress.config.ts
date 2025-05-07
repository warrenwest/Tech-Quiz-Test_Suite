import { defineConfig } from 'cypress';
import viteConfig from './vite.config';

export default defineConfig({
  // In cypress.config.ts
component: {
  devServer: {
    framework: 'react',
    bundler: 'vite',
    viteConfig,
  },
  port: 3001, // match vite.config.ts
},


  e2e: {
    baseUrl: 'http://localhost:3001',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: 'cypress/support/e2e.ts',
  },
});
