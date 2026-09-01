async function buscarDados(url) {
    const resposta = await fetch(url);
    return resposta.json();
}

export { buscarDados };