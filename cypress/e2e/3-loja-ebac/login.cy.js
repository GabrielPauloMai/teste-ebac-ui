/// <reference types="cypress" />

describe('Login', () => {

    it('Deve fazer login com sucesso', () => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
        cy.get('#username').type('gabriel.mai@teste.com')
        cy.get('#password').type('Mudar@123')
        cy.get('.woocommerce-form > .button').click()

        cy.get("html > body > div:nth-of-type(1) > div:nth-of-type(5) > section:nth-of-type(2) > div > div > main > div > div > p:nth-of-type(1)")
            .should('contain', 'Olá, gabriel.mai (não é gabriel.mai? Sair)')

    })

    it('Deve exibir uma mensagem de erro ao inserir usuário inválido', () => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
        cy.get('#username').type('gabriel@teste.com')
        cy.get('#password').type('Mudar@123')
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-error').should('contain', 'Endereço de e-mail desconhecido.')
        cy.get('.woocommerce-error').should('exist')
    })

})


