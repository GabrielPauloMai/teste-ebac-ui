/// <reference types="cypress" />

describe('Funcionalidade: Detalhes da Conta', () => {

    beforeEach(() => {
        cy.visit('minha-conta/edit-account/')
        cy.fixture('perfil').then(dados => {
            cy.login(dados.usuario, dados.senha)
        })
    })

    afterEach(() => {
        cy.screenshot()
    })

 it('Deve completar os detalhes da conta com sucesso', () => {
    cy.detalhesConta({
        firstName: "Gabriel",
        lastName: "Mai",
        login: "gabriel.mai"
    })
     cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.')
 })
})