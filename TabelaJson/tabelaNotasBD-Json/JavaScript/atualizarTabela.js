function atualizarTabela(trs, calcularMedia, definirStatus) {

    // Percorre todas as linhas da tabela
    for (let index = 0; index < trs.length; index++) {

        let linha = trs[index]
        let filho = linha.children;

    // Converte os valores das notas para número
        let nota1 = parseFloat(filho[1].textContent);
        let nota2 = parseFloat(filho[2].textContent);
        let nota3 = parseFloat(filho[3].textContent);

        // chama a função e os paramêtros para calcular a média
        let media = calcularMedia(nota1, nota2, nota3);

        // exibe média
        filho[4].textContent = media.toFixed(2);

        // chama a função para definir o status
        let status = definirStatus(media);
        filho[5].textContent = status;

        // estilo
        if (media < 4) {
            linha.style.color = "red"
            linha.style.fontWeight = "bold"
        } 
        else if (media < 7) {
            linha.style.fontSize = "15px"
            linha.style.backgroundColor = "gray"
        } 
        else {
            linha.style.outline = "4px solid green"
        }
    }

    return trs;
}

export { atualizarTabela }


//Filtro de busca
const input = document.querySelector('.entrada');
const linhas = document.querySelectorAll('tbody tr');

input.addEventListener('input', () => {

    linhas.forEach(tr => {

        let tds = tr.children;

        let texto = tds[5].textContent.toLowerCase();
        let busca = input.value.toLowerCase();

        if (texto.includes(busca)) {
            tr.style.display = 'table-row';
        } else {
            tr.style.display = 'none';
        }

    });

});