let urlApi = "https://fakestoreapi.com/users";

let container = document.querySelector("#container-cards");

let todosUsuarios = []; // vetorzinho para guardar todos os users

// Função de criar cards com todos os dados dos usuários:
function criarCardUsuario(usuario) {
    return `
        <div class="card">
            <div class="card-header">
                <i class="fa-solid fa-circle-user"></i>
                <h3>
                    ${usuario.name.firstname} ${usuario.name.lastname}
                </h3>
                <small>ID: ${usuario.id}</small>
            </div>

            <div class="card-body">
                <p>
                    <i class="fa-solid fa-envelope"></i>
                    ${usuario.email}
                </p>

                <p>
                    <i class="fa-solid fa-city"></i>
                    ${usuario.address.city}
                </p>
            </div>

            <!-- Detalhes que ficam ocultos -->
            <div class="detalhes-ocultos" id="detalhes-${usuario.id}">
                <hr class="linha-card">
                <p>
                    <strong>Username:</strong>
                    ${usuario.username}
                </p>

                <p>
                    <strong>Senha:</strong>
                    ${usuario.password}
                </p>

                <p>
                    <strong>Telefone:</strong>
                    ${usuario.phone}
                </p>

                <p>
                    <strong>Rua:</strong>
                    ${usuario.address.street}, nº ${usuario.address.number}
                </p>

                <p>
                    <strong>CEP:</strong>
                    ${usuario.address.zipcode}
                </p>

                <p>
                    <strong>Geolocalização:</strong>
                    Lat: ${usuario.address.geolocation.lat} | Long: ${usuario.address.geolocation.long}
                </p>

                <p>
                    <strong>Versão (__v):</strong>
                    ${usuario.__v}
                </p>
            </div>

            <!-- Botão para mostrar detalhes -->
            <button class="btn-detalhes" onclick="abrirDetalhes(${usuario.id}, this)">
                <i class="fa-solid fa-chevron-down"></i> Ver detalhes
            </button>
        </div>
    `;
}

// Função para a visualização dos detalhes
function abrirDetalhes(id, botao) {
    let painel = document.getElementById(`detalhes-${id}`);
    painel.classList.toggle("ativo");

    if (painel.classList.contains("ativo")) {
        botao.innerHTML = `
            <i class="fa-solid fa-chevron-up"></i>
            Ver menos
        `;
    } else {
        botao.innerHTML = `
            <i class="fa-solid fa-chevron-down"></i>
            Ver detalhes
        `;
    }
}

// Renderizar a lista de usuários
function renderizarUsuarios(lista) {
    container.innerHTML = "";
    lista.forEach(usuario => {
        container.innerHTML += criarCardUsuario(usuario);
    });
}

// Função para carregar os dados automaticamente
async function carregarUsuarios() {
    container.innerHTML = "<p>Carregando dados...</p>";
    try {
        let apiResponse = await fetch(urlApi);

        if (!apiResponse.ok) {
            throw new Error("Erro na resposta da API");
        }
        
        todosUsuarios = await apiResponse.json();
        console.log("Dados recebidos da API:", todosUsuarios);

        // Renderiza todos os usuários encontrados
        renderizarUsuarios(todosUsuarios);

    } catch (erro) {
        container.innerHTML = "<p>Erro ao carregar dados!</p>";
        console.error(erro);
    }
}

// Executa automaticamente assim que a página é carregada
document.addEventListener("DOMContentLoaded", carregarUsuarios);