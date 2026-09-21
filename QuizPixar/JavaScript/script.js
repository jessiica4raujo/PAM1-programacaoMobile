// Recupera os pontos salvos no sessionStorage
let pontos = JSON.parse(sessionStorage.getItem("quiz_pontos")) || {
    remy: 0,
    buzz: 0,
    mcqueen: 0,
    dory: 0,
    nojinho: 0
};


// Identifica qual questão está sendo exibida
const bodyElement = document.body;

const questaoAtualIndex = parseInt(
    bodyElement.getAttribute("data-questao")
);


// Busca os elementos do HTML
const identificador = document.querySelector("#identificador");
const questionElement = document.querySelector(".question");
const answerButtons = document.querySelector("#answear-buttons");
const nextButton = document.querySelector("#nextBtn");
const posterFilmeElemento = document.querySelector("#personagem-filme-poster");


// Variáveis temporárias
let personagemSelecionadoTemporariamente = null;
let respostaTextoTemporaria = "";


// CARREGAR QUESTÃO
function carregarQuestaoNaTela() {
    if (nextButton) {
        nextButton.style.display = "block";
        nextButton.disabled = true;
    }

    // Se for a página de resultado
    if (
        bodyElement &&
        bodyElement.getAttribute("data-questao") === "resultado"
    ) {
        mostrarResultado();
        return;
    }

    // Se não tiver um número de questão
    if (isNaN(questaoAtualIndex)) {
        return;
    }
    // Pega a questão correspondente
    const dadosQuestao = quiz[questaoAtualIndex];
    if (!dadosQuestao) {
        console.error(
            "Erro: Pergunta não encontrada para o índice " +
            questaoAtualIndex
        );
        return;
    }

    // Mostra o número da questão
    if (identificador) {
        identificador.innerHTML =
            `Questão ${questaoAtualIndex + 1}`;
    }

    // Mostra a pergunta
    if (questionElement) {
        questionElement.innerHTML =
            dadosQuestao.pergunta;
    }


    // Cria os botões das respostas
    if (answerButtons) {
        answerButtons.innerHTML = "";
        dadosQuestao.opcoes.forEach(opcao => {
            const button =
                document.createElement("button");
            button.innerHTML =
                opcao.texto;
            button.classList.add("btn");

            button.addEventListener("click", () => {
                // Remove seleção dos outros botões
                Array.from(
                    answerButtons.children
                ).forEach(btn => {

                    btn.classList.remove("selected");
                });

                // Seleciona o botão clicado
                button.classList.add("selected");


                // Guarda a resposta
                personagemSelecionadoTemporariamente =
                    opcao.personagem;

                respostaTextoTemporaria =
                    opcao.texto;


                // Libera o botão Próxima
                if (nextButton) {
                    nextButton.disabled = false;
                }
            });

            answerButtons.appendChild(button);
        });
    }
}

// BOTÃO PRÓXIMA
if (nextButton) {
    nextButton.addEventListener("click", () => {
        if (!personagemSelecionadoTemporariamente) {
            return;
        }

        // Adiciona ponto para o personagem escolhido
        pontos[
            personagemSelecionadoTemporariamente
        ]++;

        // Salva os pontos
        sessionStorage.setItem(
            "quiz_pontos",
            JSON.stringify(pontos)
        );

        // Recupera respostas anteriores
        let respostasSalvas =
            JSON.parse(
                sessionStorage.getItem(
                    "quiz_respostas_usuario"
                )
            ) || [];

        // Salva a resposta atual
        respostasSalvas[questaoAtualIndex] = {

            pergunta:
                quiz[questaoAtualIndex].pergunta,
            resposta:
                respostaTextoTemporaria

        };


        // Salva o histórico
        sessionStorage.setItem(
            "quiz_respostas_usuario",
            JSON.stringify(respostasSalvas)
        );

        // Vai para a próxima questão
        let proximoIndex =
            questaoAtualIndex + 1;

        if (proximoIndex < quiz.length) {

            window.location.href =
                `questao0${proximoIndex + 1}.html`;

        } else {

            window.location.href =
                "../resultado.html";
        }
    });
}

// MOSTRAR RESULTADO
async function mostrarResultado() {
    let vencedor = "nojinho";
    let maiorPontuacao = -1;

    // Descobre o personagem vencedor
    for (let personagem in pontos) {
        if (
            pontos[personagem] >
            maiorPontuacao
        ) {
            maiorPontuacao =
                pontos[personagem];
            vencedor =
                personagem;
        }
    }

    // Total de perguntas
    let totalPerguntas =
        quiz.length;

    // Pontos do vencedor
    let pontosVencedor =
        pontos[vencedor];

    // Calcula porcentagem
    let porcentagemVencedor =
        Math.round(
            (pontosVencedor /
                totalPerguntas) * 100
        );


    // DADOS DO PERSONAGEM
    const dadosPersonagens =
        resultados[0];

    const dadosDoVencedor =
        dadosPersonagens[vencedor];

    if (dadosDoVencedor) {
        const topoNome =
            document.querySelector(
                "#topo-nome-personagem"
            );

        const personagemNome =
            document.querySelector(
                "#personagem-nome"
            );

        const personagemImagem =
            document.querySelector(
                "#personagem-imagem"
            );

        const personagemDescricao =
            document.querySelector(
                "#personagem-descricao"
            );

        const personagemCuriosidade =
            document.querySelector(
                "#personagem-curiosidade"
            );

        const personagemFrase =
            document.querySelector(
                "#personagem-frase"
            );

        const personagemAutor =
            document.querySelector(
                "#personagem-autor"
            );

        const tituloCuriosidade =
            document.querySelector(
                "#titulo-curiosidade"
            );

        const personagemPontos =
            document.querySelector(
                "#personagem-pontos"
            );

        if (topoNome) {

            topoNome.innerText =
                dadosDoVencedor.nome.toUpperCase();
        }

        if (personagemNome) {

            personagemNome.innerText =
                dadosDoVencedor.nome.toUpperCase();
        }

        if (personagemPontos) {

            personagemPontos.innerText =
                `${porcentagemVencedor}% Compatível`;
        }

        if (personagemImagem) {

            let caminhoImagem =
                dadosDoVencedor.Imagem;

            if (caminhoImagem.startsWith("/")) {

                caminhoImagem =
                    caminhoImagem.substring(1);
            }

            personagemImagem.src =
                caminhoImagem;

            personagemImagem.alt =
                dadosDoVencedor.nome;
        }

        if (
            posterFilmeElemento &&
            dadosDoVencedor.filmePoster
        ) {

            posterFilmeElemento.src =
                dadosDoVencedor.filmePoster;

            posterFilmeElemento.alt =
                `Pôster do filme do personagem ${dadosDoVencedor.nome}`;
        }

        if (personagemDescricao) {

            personagemDescricao.innerText =
                dadosDoVencedor.descricao;
        }

        if (tituloCuriosidade) {

            tituloCuriosidade.innerText =
                `Curiosidades da ${dadosDoVencedor.nome.toUpperCase()}`;
        }

        if (personagemCuriosidade) {

            personagemCuriosidade.innerText =
                dadosDoVencedor.curiosidade;
        }

        if (personagemFrase) {

            personagemFrase.innerText =
                `"${dadosDoVencedor.frase}"`;
        }

        if (personagemAutor) {

            personagemAutor.innerText =
                dadosDoVencedor.autor;
        }
    }
    // SALVAR RESULTADO NO BANCO
    // Verifica se esse resultado já foi salvo
    const resultadoJaSalvo =
        sessionStorage.getItem(
            "resultado_salvo"
        );

    if (resultadoJaSalvo === "true") {
        console.log(
            "Esse resultado já foi salvo no banco."
        );

    } else {
        try {

            // Pega os dados da pessoa
            const pessoa =
                JSON.parse(
                    sessionStorage.getItem(
                        "pessoa"
                    )
                );

            if (!pessoa) {
                console.error(
                    "Dados da pessoa não encontrados."
                );
                return;
            }


            // Dados que serão enviados para o Back-End
            const dadosResultado = {
                nome: pessoa.nome,
                email: pessoa.email,
                idade: Number(pessoa.idade),
                pais: pessoa.pais,
                estado: pessoa.estado,
                sexo: pessoa.sexo,
                personagem: vencedor,
                porcentagem: porcentagemVencedor

            };
            console.log(
                "Enviando resultado:",
                dadosResultado
            );


            // MÉTODO POST
            const resposta =
                await fetch(
                    "http://localhost:3000/resultado",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json",

                            "Accept":
                                "application/json"
                        },
                        body:
                            JSON.stringify(
                                dadosResultado
                            )

                    }
                );


            // Verifica se o servidor respondeu corretamente
            if (!resposta.ok) {
                throw new Error(
                    "Erro HTTP: " +
                    resposta.status
                );

            }
            const dados =
                await resposta.json();


            console.log(
                "Resultado salvo no banco:",
                dados
            );

            // Marca que o resultado já foi salvo
            sessionStorage.setItem(
                "resultado_salvo",
                "true"
            );

        } catch (erro) {
            console.error(
                "Erro ao enviar resultado para o banco:",
                erro
            );
        }
    }


    // BOTÃO REFAZER QUIZ
    const btnRefazer =
        document.querySelector(
            "#btn-refazer"
        );


    if (btnRefazer) {

        btnRefazer.addEventListener(
            "click",
            () => {

                sessionStorage.removeItem(
                    "quiz_pontos"
                );

                sessionStorage.removeItem(
                    "quiz_respostas_usuario"
                );

                sessionStorage.removeItem(
                    "resultado_salvo"
                );


                window.location.href =
                    "Questoes/questao01.html";

            }
        );

    }

}
// Executa o código
carregarQuestaoNaTela();