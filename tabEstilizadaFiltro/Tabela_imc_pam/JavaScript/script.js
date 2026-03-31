import { calcularImc } from './calculo.js'
import { definirStatus } from './calculo.js'

let trs = document.querySelectorAll('tbody tr')
let input = document.querySelector('.entrada')


for (let index = 0; index < trs.length; index++) {

    let colunas = trs[index].children

    let altura = parseFloat(colunas[2].textContent)
    let peso = parseFloat(colunas[3].textContent)

    let tdImc = colunas[4]
    let tdClassificacao = colunas[5]

    let calculo = calcularImc(altura, peso)

    tdImc.textContent = calculo.toFixed(2)

    definirStatus(calculo, tdClassificacao)


    //Estilizar tabelas com js e css(classe): 
    
    if (calculo < 18.5 || calculo >= 40){
        trs[index].classList.add("abaixoDoPeso")
    }
    else if (calculo >= 18.5 && calculo <= 24.9){
        trs[index].classList.add("pesoNormal")
    }
    else{
        trs[index].classList.add("outrosCasos")

    }
}


//filtro dinâmico

// Seleciona o campo de input (onde o usuário digita a pesquisa)
const inputs = document.querySelector('.entrada');

// Seleciona todas as linhas da tabela (dentro do tbody)
const linhas = document.querySelectorAll('tbody tr');

// Adiciona um "ouvinte" que executa sempre que algo é digitado no input
inputs.addEventListener('input', () => {

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