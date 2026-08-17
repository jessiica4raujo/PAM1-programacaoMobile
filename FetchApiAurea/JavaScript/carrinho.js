// URLs da API
const urlCarrinhos = "https://fakestoreapi.com/carts";
const urlUsuarios = "https://fakestoreapi.com/users";

let todosCarrinhos = [];
let todosUsuarios = [];

// Elementos da página
const lista = document.getElementById("lista-carrinhos");
const quantidade = document.getElementById("quantidade-carrinhos");
const campoPesquisa = document.getElementById("pesquisa");
const modal = document.getElementById("modal");
const conteudoModal = document.getElementById("conteudo-modal");
const fecharModal = document.getElementById("fechar-modal");

// Carrega os dados das duas APIs automaticamente ao iniciar
console.log("Iniciando requisição para as APIs...");

Promise.all([
    fetch(urlCarrinhos).then(res => res.json()),
    fetch(urlUsuarios).then(res => res.json())
]).then(dados => {
    todosCarrinhos = dados[0];
    todosUsuarios = dados[1];

    console.log("Carrinhos recebidos:", todosCarrinhos);
    console.log("Usuários recebidos:", todosUsuarios);

    mostrarCarrinhos(todosCarrinhos);
}).catch(erro => {
    console.error("Erro ao carregar dados da API:", erro);
    if (lista) lista.innerHTML = "<p>Erro ao carregar os dados!</p>";
});

// Formata a data para o padrão brasileiro
function formatarData(data) {
    const [ano, mes, dia] = data.split("T")[0].split("-");
    return `${dia}/${mes}/${ano}`;
}

// Retorna o nome completo do usuário formatado
function nomeUsuario(usuario) {
    if (!usuario) return "Usuário Desconhecido";
    return `${usuario.name.firstname} ${usuario.name.lastname}`
        .replace(/\b\w/g, letra => letra.toUpperCase());
}

// Alterna a exibição dos detalhes do usuário dentro do modal
function abrirDetalhes(id, botao) {
    let painel = document.getElementById(`detalhes-${id}`);
    painel.classList.toggle("ativo");

    const estaAtivo = painel.classList.contains("ativo");
    console.log(`Detalhes do usuário ID #${id}: ${estaAtivo ? 'Abertos' : 'Fechados'}`);

    if (estaAtivo) {
        botao.innerHTML = `<i class="fa-solid fa-chevron-up"></i> Ver menos detalhes`;
    } else {
        botao.innerHTML = `<i class="fa-solid fa-chevron-down"></i> Ver detalhes do usuário`;
    }
}

// Exibe os cards dos carrinhos
function mostrarCarrinhos(carrinhos) {
    console.log(`Renderizando ${carrinhos.length} carrinho(s) na tela.`);
    lista.innerHTML = "";
    quantidade.textContent = `${carrinhos.length} carrinhos encontrados`;

    carrinhos.forEach(carrinho => {
        const usuario = todosUsuarios.find(u => u.id === carrinho.userId);

        lista.innerHTML += `
            <article class="carrinho">
                <div class="carrinho-topo">
                    <span class="numero-carrinho">🛒 CARRINHO #${String(carrinho.id).padStart(2, "0")}</span>
                    <span class="data-carrinho">${formatarData(carrinho.date)}</span>
                </div>

                <div class="usuario-carrinho">
                    <div class="icone"><i class="fa-solid fa-circle-user"></i></div>
                    <div>
                        <h3>${nomeUsuario(usuario)}</h3>
                        <span>@${usuario ? usuario.username : 'desconhecido'}</span>
                    </div>
                </div>

                <div class="linha"></div>

                <div class="resumo-produtos">
                    <div class="icone">📦</div>
                    <div>
                        <span>PRODUTOS NO CARRINHO</span>
                        <strong>${carrinho.products.length} tipos de produtos</strong>
                    </div>
                </div>

                <button class="botao-detalhes" data-id="${carrinho.id}">
                    Ver detalhes →
                </button>
            </article>
        `;
    });
}

// Pesquisa por nome, usuário ou ID
campoPesquisa.addEventListener("input", () => {
    const texto = campoPesquisa.value.toLowerCase().trim();
    console.log(`Pesquisando por: "${texto}"`);

    const filtrados = todosCarrinhos.filter(carrinho => {
        const usuario = todosUsuarios.find(u => u.id === carrinho.userId);
        return (usuario && nomeUsuario(usuario).toLowerCase().includes(texto)) ||
            (usuario && usuario.username.toLowerCase().includes(texto)) ||
            carrinho.id.toString().includes(texto);
    });

    console.log(`Resultados encontrados: ${filtrados.length}`);
    mostrarCarrinhos(filtrados);
});

// Abre o modal com os detalhes do carrinho
document.addEventListener("click", evento => {
    const botao = evento.target.closest(".botao-detalhes");
    if (!botao) return;

    const id = Number(botao.dataset.id);
    const carrinho = todosCarrinhos.find(c => c.id === id);
    const usuario = todosUsuarios.find(u => u.id === carrinho.userId);

    console.log(`Abrindo modal do Carrinho ID #${id}`, { carrinho, usuario });

    const total = carrinho.products.reduce(
        (soma, produto) => soma + produto.quantity, 0
    );

    const produtos = carrinho.products.map(produto => `
        <div class="produto-modal">
            <span>Produto ID #${produto.productId}</span>
            <strong>${produto.quantity} unidades</strong>
        </div>
    `).join("");

    conteudoModal.innerHTML = `
        <span class="titulo-modal">DETALHES DO CARRINHO</span>
        <h2>Carrinho #${String(carrinho.id).padStart(2, "0")}</h2>
        
        <div class="info-modal">
            <div><span>DATA</span><strong>${formatarData(carrinho.date)}</strong></div>
            <div><span>USUÁRIO ID</span><strong>#${carrinho.userId}</strong></div>
            <div><span>TOTAL ITENS</span><strong>${total} unidades</strong></div>
        </div>

        <div class="card-usuario-modal">
            <div class="card-header">
                <i class="fa-solid fa-circle-user"></i>
                <h3>${nomeUsuario(usuario)}</h3>
            </div>
            
            <div class="card-body">
                <p><i class="fa-solid fa-envelope"></i> ${usuario.email}</p>
                <p><i class="fa-solid fa-city"></i> ${usuario.address.city}</p>
            </div>

            <div class="detalhes-ocultos" id="detalhes-${usuario.id}">
                <hr class="linha-card">
                <p><strong>Username:</strong> ${usuario.username}</p>
                <p><strong>Senha:</strong> ${usuario.password}</p>
                <p><strong>Telefone:</strong> ${usuario.phone}</p>
                <p><strong>Rua:</strong> ${usuario.address.street}, nº ${usuario.address.number}</p>
                <p><strong>CEP:</strong> ${usuario.address.zipcode}</p>
                <p><strong>Geolocalização:</strong> Lat: ${usuario.address.geolocation.lat} | Long: ${usuario.address.geolocation.long}</p>
                <p><strong>Versão (__v):</strong> ${usuario.__v}</p>
            </div>

            <button class="btn-detalhes" onclick="abrirDetalhes(${usuario.id}, this)">
                <i class="fa-solid fa-chevron-down"></i> Ver detalhes do usuário
            </button>
        </div>

        <div class="produtos-modal">
            <h3>Produtos no carrinho</h3>
            ${produtos}
        </div>
    `;

    modal.classList.add("ativo");
});

// Fecha o modal
fecharModal.addEventListener("click", () => {
    console.log("Fechando modal.");
    modal.classList.remove("ativo");
});