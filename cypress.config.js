const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost',
    env: {
      hideCredentials: true, // serve para o access token não vazar na execução via API
      requestMode: true // ter feedback visual de estamos fazendo o uso do comendo cy.request
      // snapshotOnly: true //serve apresentar um feedback visual dos métodos de chamada api quando executados via GUI
    },
  },
  fixturesFolder: false,
  video: false,
});
