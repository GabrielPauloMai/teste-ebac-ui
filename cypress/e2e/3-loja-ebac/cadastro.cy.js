/// <reference types="cypress" />
import { faker } from '@faker-js/faker'
describe('Funcionalidade: Cadastro', () => {

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
    })

    it('Deve completar o cadastro com sucesso', () => {
        cy.get("#reg_email").type(faker.internet.email())
        cy.get("#reg_password").type('Teste@123')
        cy.get("input[name='register']").click()

        cy.get("html > body > div:nth-of-type(1) > div:nth-of-type(5) > section:nth-of-type(2) > div > div > main > div > div > p:nth-of-type(1)")
            .should('exist')

        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get("#account_first_name").type(faker.person.firstName())
        cy.get("#account_last_name").type(faker.person.lastName())

        cy.wait(1000)

        cy.get(".woocommerce-Button").click()

        cy.get(".woocommerce-message").should('contain', 'Detalhes da conta modificados com sucesso.')




    })

})