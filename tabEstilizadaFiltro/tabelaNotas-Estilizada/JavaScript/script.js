console.log("rodando!")
import { aplicarEstilo, calcularMedia } from './operacoes.js'
import { definirStatus } from './operacoes.js'

let trs = document.querySelectorAll('tbody tr')

for (let index = 0; index < trs.length; index++) {

    let colunas = trs[index].children

    let n1 = parseFloat(colunas[1].textContent)
    let n2 = parseFloat(colunas[2].textContent)
    let n3 = parseFloat(colunas[3].textContent)

    let tdMedia = colunas[4]
    let tdStatus = colunas[5]

    let media = calcularMedia(n1, n2, n3)

    tdMedia.textContent = media.toFixed(2)

    definirStatus(media, tdStatus)

    aplicarEstilo(media, trs[index])
}


//filtro dinâmico

// Seleciona o campo de input (onde o usuário digita a pesquisa)
const input = document.querySelector('.entrada');

// Seleciona todas as linhas da tabela (dentro do tbody)
const linhas = document.querySelectorAll('tbody tr');

// Adiciona um "ouvinte" que executa sempre que algo é digitado no input
input.addEventListener('input', () => {

    // Percorre (loop) todas as linhas da tabela
    trs.forEach(tr => {

        // Pega todas as colunas (td) da linha atual
        let tds = tr.children;

        // Pega o texto da 6ª coluna (índice 5) e deixa tudo minúsculo
        let texto = tds[5].textContent.toLowerCase();

        // Pega o que o usuário digitou e também transforma em minúsculo, ou seja não importa como o usuário tenha escrito ele vai buscar mesmo assim.
        let busca = input.value.toLowerCase();

        // Verifica se o texto da tabela inclui o que foi digitado
        if (texto.includes(busca)) {

            // Se incluir, mostra a linha normalmente
            tr.style.display = 'table-row';

        } else {

            // Se não incluir, esconde a linha
            tr.style.display = 'none';

        }

    });

});

//obs: optamos por colocar toLowerCase para facilitar a busca e também porque já vimos isso em Java na matéria de DS.