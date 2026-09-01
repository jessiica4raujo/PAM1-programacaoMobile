const urlCarrinhos = "https://fakestoreapi.com/carts";

const btnCarregarCarrinhos = document.querySelector("#btnCarregarCarrinhos");
const btnVerTodosCarrinhos = document.querySelector("#btnVerTodosCarrinhos");
const containerCarrinhos = document.querySelector("#container-carrinhos");

// Cria o card de cada carrinho
function criarCardCarrinho(carrinho) {
    const data = new Date(carrinho.date).toLocaleDateString("pt-BR");

    return `
        <div class="card card-carrinho">
            <div class="card-header">
                <i class="fa-solid fa-cart-shopping"></i>
                <h3>Carrinho #${carrinho.id}</h3>
            </div>

            <div class="card-body">
                <p><i class="fa-solid fa-user"></i> Usuário #${carrinho.userId}</p>
                <p><i class="fa-solid fa-calendar"></i> ${data}</p>
                <p><i class="fa-solid fa-box"></i> ${carrinho.products.length} tipos de produtos</p>
            </div>
        </div>
    `;
}

// Exibe os carrinhos na página
function renderizarCarrinhos(lista) {
    containerCarrinhos.innerHTML = "";
    lista.forEach(carrinho => {
        containerCarrinhos.innerHTML += criarCardCarrinho(carrinho);
    });
}

// Busca os dados da API
btnCarregarCarrinhos.addEventListener("click", async () => {
    containerCarrinhos.innerHTML = "<p>Carregando dados...</p>";

    try {
        const resposta = await fetch(urlCarrinhos);

        if (!resposta.ok) {
            throw new Error("Erro na resposta da API");
        }

        const carrinhos = await resposta.json();

        console.log("Dados recebidos da API:", carrinhos);
        
        // Mostra apenas os 4 primeiros carrinhos
        renderizarCarrinhos(carrinhos.slice(0, 4));

    } catch (erro) {
        containerCarrinhos.innerHTML = "<p>Erro ao carregar dados!</p>";
        console.error(erro);
    }
});

// Abre a página com todos os carrinhos
btnVerTodosCarrinhos.addEventListener("click", () => {
    window.location.href = "./carrinhos/carrinhos.html";
});