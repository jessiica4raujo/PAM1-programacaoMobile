import express from "express";

import { inserirResultado }
    from "./DAO/resultado/inserir_resultado.js";

import { listarResultados }
    from "./DAO/resultado/listar_resultados.js";


const app = express();


// Permite receber JSON
app.use(express.json());


// CORS
app.use((req, res, next) => {

    res.header(
        "Access-Control-Allow-Origin",
        "*"
    );

    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );

    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS"
    );

    next();

});


// TESTE DA API
app.get("/", (req, res) => {
    res.json({
        mensagem:
            "API do QuizPixar funcionando!"

    });

});

// POST - SALVAR RESULTADO
app.post(
    "/resultado",
    async (req, res) => {
        try {
            const {
                nome,
                email,
                idade,
                pais,
                estado,
                sexo,
                personagem,
                porcentagem
            } = req.body;


            // Validação
            if (
                !nome ||
                !email ||
                !idade ||
                !pais ||
                !estado ||
                !sexo ||
                !personagem ||
                porcentagem === undefined
            ) {
                return res.status(400).json({
                    erro:
                        "Todos os dados são obrigatórios."
                });
            }


            // Envia os dados para o DAO
            const resultado =
                await inserirResultado({
                    nome,
                    email,
                    idade,
                    pais,
                    estado,
                    sexo,
                    personagem,
                    porcentagem

                });


            // Resposta para o Front-End
            res.status(201).json({
                mensagem:
                    "Resultado salvo com sucesso!",
                id:
                    resultado.insertId
            });


        } catch (erro) {

            console.error(
                "Erro:",
                erro
            );


            res.status(500).json({
                erro:
                    "Erro ao salvar resultado.",
                detalhes:
                    erro.message
            });
        }
    }
);


// GET - LISTAR RESULTADOS
app.get(
    "/resultados",
    async (req, res) => {
        
        try {
            const resultados =
                await listarResultados();
            res.json(resultados);


        } catch (erro) {
            console.error(
                "Erro:",
                erro
            );
            res.status(500).json({
                erro:
                    "Erro ao buscar resultados."
            });
        }
    }
);


// SERVIDOR
app.listen(
    3000,
    () => {
        console.log(
            "Servidor rodando em http://localhost:3000"
        );
    }
);