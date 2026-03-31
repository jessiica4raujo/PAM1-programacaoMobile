
function calcularMedia(n1Id, n2Id, n3Id, mediaId, statusId) { // cria a funcao chamada calcular Media

let n1 = Number(document.getElementById(n1Id).innerText); //aqui cria e converte a varivel para numero, pegando o valor do elemento com o id definido
let n2 = Number(document.getElementById(n2Id).innerText); 
let n3 = Number(document.getElementById(n3Id).innerText); 
let media = (n1 + n2 + n3) / 3; // declara variavel como media, e calcula a media
document.getElementById(mediaId).innerText = media.toFixed(1); // Exibe a média com 1 casa decimal 


// Com auxílio do If Else, o programa verifica a situação do aluno e exibe o resultado na coluna "Status" 
if (media <4){
    document.getElementById(statusId).innerText = "Reprovado!";
}else if (media >= 4 && media < 7){
    document.getElementById(statusId).innerText = "Recuperação!";  
} else{
    document.getElementById(statusId).innerText = "Aprovado!";
}
}

// Chama a função calcularMedia para cada aluno, passando os IDs correspondentes para as notas, média e status
calcularMedia("n1", "n2", "n3", "media", "status");
calcularMedia("n1_1", "n2_1", "n3_1", "media_1", "status_1");
calcularMedia("n1_2", "n2_2", "n3_2", "media_2", "status_2");
calcularMedia("n1_3", "n2_3", "n3_3", "media_3", "status_3");
calcularMedia("n1_4", "n2_4", "n3_4", "media_4", "status_4");
calcularMedia("n1_5", "n2_5", "n3_5", "media_5", "status_5");
