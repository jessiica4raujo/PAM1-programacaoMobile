//Função responsável por abrir a tela de impressão do navegador
function executarImpressao() {
    window.print(); 
}
  //Carrega os dados do usuário salvos no sessionStorage e preenche a página
function carregarDadosUsuario() {
    // 1. Pega os dados do sessionStorage
    const dadosSalvos = sessionStorage.getItem("pessoa");

    // 2. Se não tiver dados manda de volta pro login
    if (!dadosSalvos) {
        alert("Acesso negado! Preencha o formulário primeiro.");
        window.location.href = "login.html";
        return;
    }

    // 3. Transforma a string de volta em objeto JavaScript
    const pessoa = JSON.parse(dadosSalvos);

    // 4. Coloca os textos diretamente nos spans correspondentes
    document.getElementById("resNome").innerText = pessoa.nome;
    document.getElementById("resEmail").innerText = pessoa.email;
    document.getElementById("resIdade").innerText = pessoa.idade;
    document.getElementById("resPais").innerText = pessoa.pais;
    document.getElementById("resEstado").innerText = pessoa.estado;

    // 5. Deixa o texto do sexo mais amigável baseado no value salvo
    let sexoFormatado = "Não informado";
    if (pessoa.sexo === "MASC") sexoFormatado = "Masculino";
    if (pessoa.sexo === "FEM") sexoFormatado = "Feminino";
    if (pessoa.sexo === "OUTROS") sexoFormatado = "Outros";
    
    document.getElementById("resSexo").innerText = sexoFormatado;
}

// Quando o botão for clicado, executa a função de impressão
document.getElementById("btn-imprimir").addEventListener("click", executarImpressao);
// Quando o HTML da página estiver pronto, executa a função de carregar os dados
document.addEventListener("DOMContentLoaded", carregarDadosUsuario);