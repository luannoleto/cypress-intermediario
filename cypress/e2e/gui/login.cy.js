describe('Login', () => {
  it('Efetuar login com sucesso', () => {
    const user = Cypress.env('user_name')
    const password = Cypress.env('user_password')
    const options = { cacheSession: false } // não realizar o armazenamento de cache da sessão '{ cacheSession: false }'
                                            // sempre irá fazer o login preenchendo user and password.

    cy.login(user, password, options)

    cy.get('.qa-user-avatar').should('be.visible')
  })
})
