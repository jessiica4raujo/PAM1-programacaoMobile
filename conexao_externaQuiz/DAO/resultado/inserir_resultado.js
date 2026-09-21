import { conexao } from "../conexao.js";


async function inserirResultado(dados) {

    const sql = `
        INSERT INTO tbResultadosQuiz
        (
            nome,
            email,
            idade,
            pais,
            estado,
            sexo,
            personagem,
            porcentagem
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;


    const pool =
        await conexao();


    const [resultado] =
        await pool.execute(
            sql,
            [

                dados.nome,
                dados.email,
                dados.idade,
                dados.pais,
                dados.estado,
                dados.sexo,
                dados.personagem,
                dados.porcentagem

            ]
        );


    return resultado;

}


export {inserirResultado};