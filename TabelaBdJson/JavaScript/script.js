// Importa as funções responsáveis pelos cálculos e manipulação da tabela
import { calcularMedia, definirStatus } from './operacoes.js'
import { inserirDados } from './inserirDados.js'
import { atualizarTabela } from './atualizarTabela.js'

// Seleciona todas as linhas da tabela
let trs = document.querySelectorAll('tbody tr')

// Preenche a tabela com os dados do bd.json
trs = await inserirDados(trs)

// Calcula a média, define o status e aplica estilos nas linhas
trs = atualizarTabela(trs, calcularMedia, definirStatus)