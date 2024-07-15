Cypress.Commands.add('login', (email, password) => {
    cy.get('#username').type(email)
    cy.get('#password').type(password)
    cy.get('.woocommerce-form > .button').click()
})

Cypress.Commands.add('preCadastro', (user) => {
    cy.get("#reg_email").type(user.email)
    cy.get("#reg_password").type(user.password)
    cy.get("input[name='register']").click()
    cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
    cy.get("#account_first_name").type(user.firstName)
    cy.get("#account_last_name").type(user.lastName)
    cy.get(".woocommerce-Button").click()
})