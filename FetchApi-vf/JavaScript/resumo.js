async function carregarResumo() {
    try {
        let respostas = await Promise.all([
            fetch("https://fakestoreapi.com/users"),
            fetch("https://fakestoreapi.com/carts"),
            fetch("https://fakestoreapi.com/products")
        ]);

        let dados = await Promise.all(
            respostas.map(resposta => resposta.json())
        );

        document.querySelector("#total-usuarios").textContent = dados[0].length;
        document.querySelector("#total-carrinhos").textContent = dados[1].length;
        document.querySelector("#total-produtos").textContent = dados[2].length;

    } catch (erro) {
        console.error("Erro ao carregar resumo:", erro);
    }
}

carregarResumo();