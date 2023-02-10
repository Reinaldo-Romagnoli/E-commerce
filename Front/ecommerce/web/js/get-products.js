const divProdutos = document.querySelector('#produtos')

async function consultarProdutos () {
    const retorno = await fetch('http://localhost:3000/products')
    const produtos = await retorno.json()
    preencherTela(produtos)
}

function preencherTela (produtos) {
    produtos.forEach(produtos => {
        const novoProdutoHTML = `
        <div class="produto">
            <h3>${produto.nome}</h3>
            <h3>${produto.descricao}</h3>
            <h3>${produto.categoria}</h3>
            <h3>${produto.imagem}</h3>
            <h3>${produto.preco}</h3>
            <h3>${produto.material}</h3>
            <h3>${produto.departamento}</h3>
        </div>
        `

        divProdutos.innerHTML = divProdutos.innerHTML + novoProdutoHTML
    });
}

consultarProdutos()