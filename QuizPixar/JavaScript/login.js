const botao = document.getElementById("confirmarBtn");

botao.addEventListener("click", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nomeId").value.trim();
    const email = document.getElementById("emailId").value.trim();
    const idade = document.getElementById("idadeId").value.trim();
    const pais = document.getElementById("paisId").value.trim();
    const estado = document.getElementById("estadoId").value.trim();

    let sexo = "";
    document.querySelectorAll('input[name="sexo"]').forEach((el) => {
        if (el.checked) { sexo = el.value; }
    });

    // Validações básicas
    if (!nome || !email || !idade || !pais || !estado || !sexo) {
        alert("Por favor, preencha todos os campos.");
        return; 
    }
    
// 2. Verifica se a idade é maior que 100 ou menor/igual a 0
    const idadeNum = parseInt(idade);
    if (idadeNum > 100 || idadeNum <= 0 || isNaN(idadeNum)) {
        alert("Por favor, insira uma idade válida (entre 1 e 100 anos).");
        return; // Para a execução do código aqui
    }

    // Cria o objeto Pessoa
    const pessoa = { nome, email, idade, pais, estado, sexo };

    // SALVA CORRETAMENTE: Chave "pessoa", valor em string
    sessionStorage.setItem("pessoa", JSON.stringify(pessoa));

    alert("Login realizado!");

    // manda o user p pagina inicial
    window.location.href = "../index.html"; 
});