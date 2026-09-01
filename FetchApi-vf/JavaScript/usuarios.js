import { buscarDados } from "./buscarDados.js";
import { criarTag } from "./criarElementos.js";

const urlApi = "https://fakestoreapi.com/users";
const container = document.querySelector("#container-cards");
const pesquisa = document.querySelector("#pesquisa");

let todosUsuarios = [];

// Cria o card
function criarCardUsuario(usuario) {
    const card = criarTag("div");
    card.className = "card";

    const header = criarTag("div");
    header.className = "card-header";

    const foto = criarTag("img");
    foto.className = "foto-perfil";
    foto.src = `https://i.pravatar.cc/150?img=${usuario.id}`;
    foto.alt = usuario.name.firstname;

    const nome = criarTag("h3");
    nome.textContent = `${usuario.name.firstname} ${usuario.name.lastname}`;

    const id = criarTag("small");
    id.textContent = `ID: ${usuario.id}`;
    header.append(foto, nome, id);

    const body = criarTag("div");
    body.className = "card-body";

    const email = criarTag("p");
    email.innerHTML = `<i class="fa-solid fa-envelope"></i> ${usuario.email}`;

    const cidade = criarTag("p");
    cidade.innerHTML = `<i class="fa-solid fa-city"></i> ${usuario.address.city}`;
    body.append(email, cidade);

    const detalhes = criarTag("div");
    detalhes.className = "detalhes-ocultos";
    detalhes.innerHTML = `
        <hr class="linha-card">
        <p><strong>Username:</strong> ${usuario.username}</p>
        <p><strong>Senha:</strong> ${usuario.password}</p>
        <p><strong>Telefone:</strong> ${usuario.phone}</p>
        <p><strong>Rua:</strong> ${usuario.address.street}, nº ${usuario.address.number}</p>
        <p><strong>CEP:</strong> ${usuario.address.zipcode}</p>
        <p><strong>Geolocalização:</strong> ${usuario.address.geolocation.lat} | ${usuario.address.geolocation.long}</p>
    `;

    const botao = criarTag("button");
    botao.className = "btn-detalhes";
    botao.innerHTML = `<i class="fa-solid fa-chevron-down"></i> Ver detalhes`;

    botao.addEventListener("click", () => {
        detalhes.classList.toggle("ativo");

        botao.innerHTML = detalhes.classList.contains("ativo")
            ? `<i class="fa-solid fa-chevron-up"></i> Ver menos`
            : `<i class="fa-solid fa-chevron-down"></i> Ver detalhes`;
    });

    card.append(header, body, detalhes, botao);
    return card;
}

// Mostra os usuários
function mostrarUsuarios(lista) {
    container.innerHTML = "";
    lista.forEach(usuario => container.append(criarCardUsuario(usuario)));
}

// Busca os usuários
async function carregarUsuarios() {
    container.innerHTML = "<p>Carregando dados...</p>";

    try {
        todosUsuarios = await buscarDados(urlApi);
        mostrarUsuarios(todosUsuarios);
    } catch (erro) {
        container.innerHTML = "<p>Erro ao carregar dados!</p>";
        console.error(erro);
    }
}

// Pesquisa
pesquisa.addEventListener("input", () => {
    const texto = pesquisa.value.toLowerCase().trim();

    const filtrados = todosUsuarios.filter(usuario => {
        const nome = `${usuario.name.firstname} ${usuario.name.lastname}`.toLowerCase();

        return nome.includes(texto) ||
            usuario.username.toLowerCase().includes(texto) ||
            usuario.id.toString().includes(texto);
    });

    mostrarUsuarios(filtrados);
});

document.addEventListener("DOMContentLoaded", carregarUsuarios);