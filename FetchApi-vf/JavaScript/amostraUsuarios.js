const urlApi = "https://fakestoreapi.com/users";

const btnCarregar = document.querySelector("#btnCarregarDados");
const btnVerMais = document.querySelector("#btnVerMais");
const container = document.querySelector("#container-cards");

let todosUsuarios = [];

// Cria o card com os dados do usuário
function criarCardUsuario(usuario) {
    return `
        <div class="card">
            <div class="card-header">
                <i class="fa-solid fa-circle-user"></i>
                <h3>${usuario.name.firstname} ${usuario.name.lastname}</h3>
            </div>

            <div class="card-body">
                <p><i class="fa-solid fa-envelope"></i> ${usuario.email}</p>
                <p><i class="fa-solid fa-city"></i> ${usuario.address.city}</p>
            </div>

            <div class="detalhes-ocultos" id="detalhes-${usuario.id}">
                <hr class="linha-card">

                <p><strong>Username:</strong> ${usuario.username}</p>
                <p><strong>Telefone:</strong> ${usuario.phone}</p>
                <p><strong>Rua:</strong> ${usuario.address.street}, nº ${usuario.address.number}</p>
                <p><strong>CEP:</strong> ${usuario.address.zipcode}</p>
            </div>

            <button class="btn-detalhes" onclick="abrirDetalhes(${usuario.id}, this)">
                <i class="fa-solid fa-chevron-down"></i> Ver detalhes
            </button>
        </div>
    `;
}

// Abre ou fecha os detalhes do usuário
function abrirDetalhes(id, botao) {
    const painel = document.getElementById(`detalhes-${id}`);
    painel.classList.toggle("ativo");

    botao.innerHTML = painel.classList.contains("ativo")
        ? '<i class="fa-solid fa-chevron-up"></i> Ver menos'
        : '<i class="fa-solid fa-chevron-down"></i> Ver detalhes';
}

// Exibe os usuários na página
function renderizarUsuarios(lista) {
    container.innerHTML = "";
    lista.forEach(usuario => {
        container.innerHTML += criarCardUsuario(usuario);
    });
}

// Busca os usuários na API
btnCarregar.addEventListener("click", async () => {
    container.innerHTML = "<p>Carregando dados...</p>";

    try {
        const resposta = await fetch(urlApi);

        if (!resposta.ok) {
            throw new Error("Erro na resposta da API");
        }

        todosUsuarios = await resposta.json();
        console.log("Dados recebidos da API:", todosUsuarios);

        // Mostra apenas os 4 primeiros usuários
        renderizarUsuarios(todosUsuarios.slice(0, 4));

    } catch (erro) {
        container.innerHTML = "<p>Erro ao carregar dados!</p>";
        console.error(erro);
    }
});

// Abre a página com todos os usuários
btnVerMais.addEventListener("click", () => {
    window.location.href = "./usuarios/usuarios.html";
});