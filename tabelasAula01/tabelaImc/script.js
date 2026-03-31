import { calcularImc } from './calculo.js'
import { definirStatus } from './calculo.js'

let trs = document.querySelectorAll('tbody tr')

for (let index = 0; index < trs.length; index++) {

    let colunas = trs[index].children

    let altura = parseFloat(colunas[2].textContent)
    let peso = parseFloat(colunas[3].textContent)

    let tdImc = colunas[4]
    let tdClassificacao = colunas[5]

    let calculo = calcularImc(altura, peso)

    tdImc.textContent = calculo.toFixed(2)

    definirStatus(calculo, tdClassificacao)
}