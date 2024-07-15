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

    it('Deve validar o nome do usuário', () => {
        let nome = 'Gabriel Mai'
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)')
            .should('contain', nome)
    })

    // it('Deve validar o email do usuário', () => {
        //})
    })