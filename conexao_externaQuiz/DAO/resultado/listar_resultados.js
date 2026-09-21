import { conexao } from "../conexao.js"

async function listarResultados() {

    const sql = `
        SELECT
            id,
            nome,
            email,
            idade,
            pais,
            estado,
            sexo,
            personagem,
            porcentagem
        FROM tbResultadosQuiz
    `

    const pool = await conexao()

    const [resultados] = await pool.execute(sql)

    return resultados
}

export { listarResultados }