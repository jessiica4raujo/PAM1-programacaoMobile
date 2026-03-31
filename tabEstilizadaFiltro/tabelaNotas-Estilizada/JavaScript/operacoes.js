export function calcularMedia(n1, n2, n3) {
    return (n1 + n2 + n3) / 3;
}

export function definirStatus(media, tdStatus) {
    if (media < 4) {
        tdStatus.textContent = "Reprovado";
    } else if (media < 7) {
        tdStatus.textContent = "Recuperação";
    } else {
        tdStatus.textContent = "Aprovado";
    }
}

export function aplicarEstilo(media, linha) {

    if (media < 4) {
        // Reprovado → vermelho + negrito
        linha.style.color = "red"
        linha.style.fontWeight = "bold"
    } 
    else if (media < 7) {
        // Recuperação → fonte 15px + fundo cinza
        linha.style.fontSize = "15px"
        linha.style.backgroundColor = "gray"
    } 
    else {
        // Aprovado → borda verde
        linha.style.outline = " 4px solid green"
    }
}