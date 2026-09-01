const urlProdutos = "https://fakestoreapi.com/products";

const containerProdutos = document.getElementById("container-produtos");

async function carregarProdutos() {
    containerProdutos.innerHTML = "<p>Carregando produtos...</p>";

    try {
        const resposta = await fetch(urlProdutos);
        const produtos = await resposta.json();

        // Mostra apenas 4 produtos na página inicial
        const produtosInicio = produtos.slice(0, 4);

        containerProdutos.innerHTML = "";

        produtosInicio.forEach(produto => {
            containerProdutos.innerHTML += `
                <article class="produto-inicio">

                    <img src="${produto.image}" alt="${produto.title}">

                    <div>
                        <span class="categoria">${produto.category}</span>

                        <h3>${produto.title}</h3>

                        <strong>$ ${produto.price}</strong>

                        <a href="./produtos/detalhesProduto.html?id=${produto.id}">
                            Ver detalhes →
                        </a>
                    </div>

                </article>
            `;
        });

    } catch (erro) {
        console.error(erro);
        containerProdutos.innerHTML = "<p>Erro ao carregar produtos.</p>";
    }
}

carregarProdutos();