import { buscarDados } from "./buscarDados.js";

const urlCarrinhos = "https://fakestoreapi.com/carts";
const urlUsuarios = "https://fakestoreapi.com/users";

const container = document.getElementById("detalhes-carrinho");

// ID da URL
const id = Number(new URLSearchParams(window.location.search).get("id"));

function formatarData(data) {
    return data.split("T")[0].split("-").reverse().join("/");
}

function nomeUsuario(usuario) {
    return `${usuario.name.firstname} ${usuario.name.lastname}`
        .replace(/\b\w/g, letra => letra.toUpperCase());
}

async function carregarDetalhes() {
    try {
        // Busca os dados
        const [carrinhos, usuarios] = await Promise.all([
            buscarDados(urlCarrinhos),
            buscarDados(urlUsuarios)
        ]);

        const carrinho = carrinhos.find(c => c.id === id);
        const usuario = usuarios.find(u => u.id === carrinho.userId);

        const total = carrinho.products.reduce(
            (soma, produto) => soma + produto.quantity, 0
        );

        const produtos = carrinho.products.map(produto => `
            <div class="produto-modal">
                <span>Produto ID #${produto.productId}</span>
                <strong>${produto.quantity} unidades</strong>
            </div>
        `).join("");

        // Mostra os detalhes
        container.innerHTML = `
            <section class="detalhes-topo">
                <span>DETALHES DO CARRINHO</span>
                <h2>Carrinho #${String(carrinho.id).padStart(2, "0")}</h2>
            </section>

            <div class="info-modal">
                <div><span>DATA</span><strong>${formatarData(carrinho.date)}</strong></div>
                <div><span>USUÁRIO ID</span><strong>#${carrinho.userId}</strong></div>
                <div><span>TOTAL ITENS</span><strong>${total} unidades</strong></div>
            </div>

            <section class="card-usuario-modal">
                <div class="card-header">
                    <i class="fa-solid fa-circle-user"></i>
                    <h3>${nomeUsuario(usuario)}</h3>
                </div>

                <div class="card-body">
                    <p><i class="fa-solid fa-envelope"></i> ${usuario.email}</p>
                    <p><i class="fa-solid fa-city"></i> ${usuario.address.city}</p>
                </div>

                <div class="detalhes-usuario">
                    <p><strong>Username:</strong> ${usuario.username}</p>
                    <p><strong>Telefone:</strong> ${usuario.phone}</p>
                    <p><strong>Rua:</strong> ${usuario.address.street}, nº ${usuario.address.number}</p>
                    <p><strong>CEP:</strong> ${usuario.address.zipcode}</p>
                </div>
            </section>

            <section class="produtos-modal">
                <h3>Produtos no carrinho</h3>
                ${produtos}
            </section>
        `;

    } catch (erro) {
        container.innerHTML = "<p>Erro ao carregar os detalhes!</p>";
        console.error(erro);
    }
}

carregarDetalhes();