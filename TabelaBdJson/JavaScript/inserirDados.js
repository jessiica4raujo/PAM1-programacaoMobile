// Função assíncrona que busca os dados do arquivo JSON
async function inserirDados(trs){

    // Faz a requisição do arquivo bd.json
    let req = await fetch('./JavaScript/bd.json') 
    let alunos = await req.json()

    console.log(alunos)

    // Percorre os alunos e preenche cada linha da tabela
    for (let index = 0; index < alunos.length; index++){
        
    // Converte os filhos da linha em array
        let filhos = Array.from(trs[index].children)
        
        // Preenche nome e notas
        filhos[0].textContent = alunos[index].nome  
        filhos[1].textContent = alunos[index].nota_1
        filhos[2].textContent = alunos[index].nota_2
        filhos[3].textContent = alunos[index].nota_3
    }

    return trs
}

export { inserirDados }