/// <reference types="cypress" />
describe('Funcionalidade: Produtos', () => {

    beforeEach(() => {
        cy.visit('produtos')
         cy.get('.product-block').as('products')
    })

    afterEach(() => {
        cy.screenshot()
    })

    it('Deve selecionar o primeiro produto da lista', () => {

        cy.get('@products').first().as('firstProduct')

        cy.get('@firstProduct').find('.name').invoke('text').then((productName) => {
            cy.get('@firstProduct').click()
            cy.get('.product_title').should('contain', productName)
        })
    })

    it('Deve selecionar o último produto da lista', () => {
        cy.get('@products').last().as('lastProduct')

        cy.get('@lastProduct').find('.name').invoke('text').then((productName) => {
            cy.get('@lastProduct').click()
            cy.get('.product_title').should('contain', productName)
        })

    })

    it('Deve selecionar um produto específico', () => {
        let productName = 'Ariel Roll Sleeve Sweatshirt'
        cy.get('@products').contains(productName).click()
        cy.get('.product_title').should('contain', productName)

    })
})