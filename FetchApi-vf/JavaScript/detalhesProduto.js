const detalhes = document.getElementById("detalhes-produto");

const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

console.log("ID recebido:", id);

async function carregarProduto() {

    if (!id) {
        detalhes.innerHTML = "<p>Produto não encontrado.</p>";
        return;
    }

    try {
        const resposta = await fetch(
            "https://fakestoreapi.com/products/" + id
        );

        console.log("Status:", resposta.status);

        if (!resposta.ok) {
            throw new Error("Erro na API");
        }

        const produto = await resposta.json();

        detalhes.innerHTML = `
            <div class="produto-detalhes">

                <div class="imagem-produto">
                    <img src="${produto.image}" alt="${produto.title}">
                </div>

                <div class="info-produto">

                    <span class="categoria">${produto.category}</span>

                    <h1>${produto.title}</h1>

                    <div class="preco">
                        $ ${produto.price}
                    </div>

                    <div class="avaliacao">
                        <i class="fa-solid fa-star"></i>
                        ${produto.rating.rate} / 5
                        <span>(${produto.rating.count} avaliações)</span>
                    </div>

                    <div class="descricao">
                        <h3>Sobre o produto</h3>
                        <p>${produto.description}</p>
                    </div>

                </div>

            </div>
        `;

    } catch (erro) {
        console.error("ERRO:", erro);
        detalhes.innerHTML = "<p>Erro ao carregar produto.</p>";
    }
}

carregarProduto();