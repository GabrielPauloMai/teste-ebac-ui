/// <reference types="cypress" />
import produtosPage from "../../support/page-objects/produtos.page";
describe('Funcionalidade: Produtos', () => {

    beforeEach(() => {
        produtosPage.visitarUrl()
        produtosPage.getAllProducts()

    })

    afterEach(() => {
        cy.screenshot()
    })

    it('Deve selecionar o primeiro produto da lista', () => {

        cy.get('@products').first().as('firstProduct')
        cy.get('@firstProduct').then((produto) => {
            return produtosPage.getNameProduct(produto)
        }).then((productName) => {
            produtosPage.buscarProdutoLista(productName)
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

    it('Deve buscar um produto com sucesso', () => {

        produtosPage.produtoAleatorio()
        cy.get('@randonProduct').find('.name').invoke('text').then((productName) => {
            produtosPage.buscarProduto(productName)
            cy.get('.product_title').should('contain', productName)
        })
    })

    it('Deve visitar a página de um produto', () => {

        produtosPage.produtoAleatorio()

        cy.get('@randonProduct').find('.name').invoke('text').then((productName) => {
            produtosPage.visitarProduto(productName)
            cy.get('.product_title').should('contain', productName)
        })
    })

    it('Deve adicionar um produto ao carrinho', () => {

        produtosPage.produtoAleatorio()

        cy.get('@randonProduct').find('.name').invoke('text').then((productName) => {
            produtosPage.visitarProduto(productName)

            produtosPage.gerarProduto().then((produto) => {
                produto.nomeProduto = productName
                produtosPage.adicionarProdutoCarrinho(produto.tamanho, produto.cor, produto.quantidade)
                cy.get('.woocommerce-message').should('contain', produtosPage.criarMessage(produto))
            })

        })
    })

    it('Deve adicionar um produto ao carrinho buscando da massa de dados', () => {
        
        cy.fixture('produtos').each((produto) => {
            produtosPage.visitarProduto(produto.nomeProduto)
            cy.get('.product_title').should('contain', produto.nomeProduto)
            produtosPage.adicionarProdutoCarrinho(produto.tamanho, produto.cor, produto.quantidade)
            cy.get('.woocommerce-message').should('contain', produtosPage.criarMessage(produto))
        })

    })
})
