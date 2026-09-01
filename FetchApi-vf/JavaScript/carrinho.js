import { buscarDados } from "./buscarDados.js";
import { criarTag } from "./criarElementos.js";

const urlCarrinhos = "https://fakestoreapi.com/carts";
const urlUsuarios = "https://fakestoreapi.com/users";

let todosCarrinhos = [];
let todosUsuarios = [];

const lista = document.getElementById("lista-carrinhos");
const quantidade = document.getElementById("quantidade-carrinhos");
const pesquisa = document.getElementById("pesquisa");

function formatarData(data) {
    return data.split("T")[0].split("-").reverse().join("/");
}

function pegarUsuario(id) {
    return todosUsuarios.find(usuario => usuario.id === id);
}

function nomeUsuario(usuario) {
    return usuario
        ? `${usuario.name.firstname} ${usuario.name.lastname}`
        : "Usuário Desconhecido";
}

// Cria o card
function criarCarrinho(carrinho) {
    const usuario = pegarUsuario(carrinho.userId);

    const card = criarTag("article");
    card.className = "carrinho";

    const topo = criarTag("div");
    topo.className = "carrinho-topo";

    const numero = criarTag("span");
    numero.className = "numero-carrinho";
    numero.textContent = `🛒 CARRINHO #${String(carrinho.id).padStart(2, "0")}`;

    const data = criarTag("span");
    data.className = "data-carrinho";
    data.textContent = formatarData(carrinho.date);
    topo.append(numero, data);

    const usuarioCarrinho = criarTag("div");
    usuarioCarrinho.className = "usuario-carrinho";

    const iconeUsuario = criarTag("div");
    iconeUsuario.className = "icone";

    const icone = criarTag("i");
    icone.className = "fa-solid fa-circle-user";
    iconeUsuario.append(icone);

    const infoUsuario = criarTag("div");
    const nome = criarTag("h3");
    const username = criarTag("span");

    nome.textContent = nomeUsuario(usuario);
    username.textContent = `@${usuario?.username || "desconhecido"}`;

    infoUsuario.append(nome, username);
    usuarioCarrinho.append(iconeUsuario, infoUsuario);

    const linha = criarTag("div");
    linha.className = "linha";

    // Produtos
    const resumo = criarTag("div");
    resumo.className = "resumo-produtos";

    const iconeProduto = criarTag("div");
    iconeProduto.className = "icone";
    iconeProduto.textContent = "📦";

    const infoProdutos = criarTag("div");
    const tituloProdutos = criarTag("span");
    const quantidadeProdutos = criarTag("strong");

    tituloProdutos.textContent = "PRODUTOS NO CARRINHO";
    quantidadeProdutos.textContent = `${carrinho.products.length} tipos de produtos`;

    infoProdutos.append(tituloProdutos, quantidadeProdutos);
    resumo.append(iconeProduto, infoProdutos);

    const botao = criarTag("button");
    botao.className = "botao-detalhes";
    botao.textContent = "Ver detalhes →";

    botao.onclick = () => {
        window.location.href = `detalhesCarrinho.html?id=${carrinho.id}`;
    };

    card.append(topo, usuarioCarrinho, linha, resumo, botao);

    return card;
}

function mostrarCarrinhos(carrinhos) {
    lista.innerHTML = "";
    quantidade.textContent = `${carrinhos.length} carrinhos encontrados`;

    carrinhos.forEach(carrinho => {
        lista.append(criarCarrinho(carrinho));
    });
}

// Busca os dados
async function carregarDados() {
    try {
        [todosCarrinhos, todosUsuarios] = await Promise.all([
            buscarDados(urlCarrinhos),
            buscarDados(urlUsuarios)
        ]);

        mostrarCarrinhos(todosCarrinhos);

    } catch (erro) {
        lista.innerHTML = "<p>Erro ao carregar os dados!</p>";
        console.error(erro);
    }
}

// Pesquisa
pesquisa.addEventListener("input", () => {
    const texto = pesquisa.value.toLowerCase();

    const filtrados = todosCarrinhos.filter(carrinho => {
        const usuario = pegarUsuario(carrinho.userId);

        return nomeUsuario(usuario).toLowerCase().includes(texto) ||
            usuario?.username.toLowerCase().includes(texto) ||
            carrinho.id.toString().includes(texto);
    });

    mostrarCarrinhos(filtrados);
});

carregarDados();