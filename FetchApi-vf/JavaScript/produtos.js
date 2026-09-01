import { buscarDados } from "./buscarDados.js";
import { criarTag } from "./criarElementos.js";

const urlProdutos = "https://fakestoreapi.com/products";

const lista = document.getElementById("lista-produtos");
const quantidade = document.getElementById("quantidade-produtos");

function criarProduto(produto) {

    const card = criarTag("article");
    card.className = "produto";

    const imagem = criarTag("img");
    imagem.src = produto.image;
    imagem.alt = produto.title;

    const info = criarTag("div");
    info.className = "produto-info";

    const categoria = criarTag("span");
    categoria.className = "categoria";
    categoria.textContent = produto.category;

    const titulo = criarTag("h3");
    titulo.textContent = produto.title;

    const preco = criarTag("span");
    preco.className = "preco";
    preco.textContent = `$ ${produto.price}`;

    const botao = criarTag("a");
    botao.className = "btn-produto";
    botao.href = `detalhesProduto.html?id=${produto.id}`;
    botao.textContent = "Ver detalhes →";

    info.append(categoria, titulo, preco, botao);

    card.append(imagem, info);

    return card;
}

function mostrarProdutos(produtos) {

    lista.innerHTML = "";

    quantidade.textContent =
        `${produtos.length} produtos encontrados`;

    produtos.forEach(produto => {

        const cardProduto = criarProduto(produto);

        lista.append(cardProduto);

    });
}

async function carregarProdutos() {

    try {

        const produtos = await buscarDados(urlProdutos);

        mostrarProdutos(produtos);

    } catch (erro) {

        quantidade.textContent =
            "Erro ao carregar produtos";

        console.error(erro);

    }
}

carregarProdutos();