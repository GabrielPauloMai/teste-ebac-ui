/// <reference types="cypress" />

describe('Login', () => {

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
    })

    afterEach(() => {
        cy.screenshot()
    })

    it('Deve fazer login com sucesso', () => {
        cy.get('#username').type('gabriel.mai@teste.com')
        cy.get('#password').type('Mudar@123')
        cy.get('.woocommerce-form > .button').click()

        cy.get(".woocommerce-MyAccount-content > :nth-child(2)")
            .should('contain', 'Olá, gabriel.mai (não é gabriel.mai? Sair)')

    })

    it('Deve exibir uma mensagem de erro ao inserir usuário inválido', () => {
        cy.get('#username').type('gabriel@teste.com')
        cy.get('#password').type('Mudar@123')
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-error').should('contain', 'Endereço de e-mail desconhecido.')
        cy.get('.woocommerce-error').should('exist')
    })

        it('Deve exibir uma mensagem de erro ao inserir senha inválida', () => {
        cy.get('#username').type('gabriel.mai@teste.com')
        cy.get('#password').type('Mudar@1')
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-error').should('contain', 'Erro: A senha fornecida para o e-mail gabriel.mai@teste.com está incorreta. Perdeu a senha?')
        cy.get('.woocommerce-error').should('exist')
    })


})


