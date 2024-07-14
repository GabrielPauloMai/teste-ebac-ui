/// <reference types="cypress" />
import { faker } from '@faker-js/faker'
describe('Funcionalidade: Cadastro', () => {

    beforeEach(() => {
        cy.visit('minha-conta')
    })

    afterEach(() => {
        cy.screenshot()
    })

    it('Deve completar o cadastro com sucesso', () => {
        cy.get("#reg_email").type(faker.internet.email())
        cy.get("#reg_password").type('Teste@123')
        cy.get("input[name='register']").click()

        cy.get(".woocommerce-MyAccount-content > :nth-child(2)")
            .should('exist')

        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get("#account_first_name").type(faker.person.firstName())
        cy.get("#account_last_name").type(faker.person.lastName())
        cy.get(".woocommerce-Button").click()

        cy.get(".woocommerce-message").should('contain', 'Detalhes da conta modificados com sucesso.')
    })

        it('Deve completar o cadastro com sucesso - Usando variáveis', () => {
            let user = {
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                password: faker.internet.password()
            }
            user.email = faker.internet.email(user.firstName)

        cy.get("#reg_email").type(user.email)
        cy.get("#reg_password").type(user.password)
        cy.get("input[name='register']").click()

        cy.get(".woocommerce-MyAccount-content > :nth-child(2)")
            .should('exist')

        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get("#account_first_name").type(user.firstName)
        cy.get("#account_last_name").type(user.lastName)
        cy.get(".woocommerce-Button").click()

        cy.get(".woocommerce-message").should('contain', 'Detalhes da conta modificados com sucesso.')
    })

})