class ProdutosPage{

    visitarUrl(){
        cy.visit('produtos')
    }

    buscarProduto(nomeProduto){
        let search = cy.get('.search').type(nomeProduto)
        cy.get(".button-search").eq(1).click()
    }

    buscarProdutoLista(nomeProduto){
        cy.get('.products > .row').contains(nomeProduto).click()
    }

    getNameProduct(product){
        return product.find('.name').text()
    }

    visitarProduto(){

    }

    adicionarProdutoCarrinho(){

    }

    getAllProducts(){
        cy.get('.product-block').as('products')
    }

    produtoAleatorio(){
        cy.get('@products').then(($el) => {
            let randomProduct = this.getRandom(0, $el.length - 1)
            cy.get('@products').eq(randomProduct).as('randonProduct')
        })
    }

    getRandom(min, max){
        return Math.floor(Math.random() * (max - min + 1) + min)
    }


}

export default new ProdutosPage()