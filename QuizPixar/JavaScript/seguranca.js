// 1. Tenta buscar o objeto "pessoa" que deveria ter sido salvo no login
const cadastroExiste = sessionStorage.getItem("pessoa");

// 2. Se NÃO existir 
if (!cadastroExiste) {
    alert("Acesso negado! Você precisa preencher o formulário primeiro.");
    
    // 3. Redireciona o usuário de volta para a sua página de login
    window.location.href = "../Login/login.html"; 
}