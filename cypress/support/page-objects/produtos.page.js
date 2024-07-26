class ProdutosPage {

    visitarUrl() {
        cy.visit('produtos')
    }

    buscarProduto(nomeProduto) {
        let search = cy.get('.search').type(nomeProduto)
        cy.get(".button-search").eq(1).click()
    }

    buscarProdutoLista(nomeProduto) {
        cy.get('.products > .row').contains(nomeProduto).click()
    }

    getNameProduct(product) {
        return product.find('.name').text()
    }

    visitarProduto(nomeProduto) {
        cy.visit(`produtos/${nomeProduto.replace(/ /g, '-')}`)
    }

    adicionarProdutoCarrinho(tamanho, cor, quantidade) {
        cy.get(`.button-variable-item-${tamanho}`).click()
        cy.get(`.button-variable-item-${cor}`).click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()

    }

    getAllProducts() {
        cy.get('.product-block').as('products')
    }

    produtoAleatorio() {
        cy.get('@products').then(($el) => {
            let randomProduct = this.getRandom(0, $el.length - 1)
            cy.get('@products').eq(randomProduct).as('randonProduct')
        })
    }

    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    criarMessage(produto) {
        if (produto.quantidade === 1) return `“${produto.nomeProduto}” foi adicionado no seu carrinho.`
        return `${produto.quantidade} × “${produto.nomeProduto}” foram adicionados no seu carrinho.`
    }

    getOptionsProduct() {

        let syzes = []
        let colors = []

        cy.get('select[data-attribute_name$=\'size\']').find('option').then(($el) => {
            $el.each((index, el) => {
                if (el.value !== '') syzes.push(el.value)
            })
        })
        cy.get('select[data-attribute_name$=\'color\']').find('option').then(($el) => {
            $el.each((index, el) => {
                if (el.value !== '') colors.push(el.value)
            })
        })

        return {
            sizes: syzes,
            colors: colors
        }
    }

    gerarProduto() {

        let produto = cy.wrap(this.getOptionsProduct()).then((product) => {
            let tamanho = product.sizes;
            let cor = product.colors;

            return {
                nomeProduto: '',
                tamanho: tamanho[this.getRandom(0, tamanho.length - 1)],
                cor: cor[this.getRandom(0, cor.length - 1)],
                quantidade: this.getRandom(1, 5)
            };
        })

        return produto
    }
}

export default new ProdutosPage()