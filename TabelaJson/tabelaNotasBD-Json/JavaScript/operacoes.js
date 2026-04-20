export function calcularMedia(nota1, nota2, nota3) {
    return (nota1 + nota2 + nota3) / 3;
}

export function definirStatus(media) {
    if (media < 4) return "Reprovado"
    else if (media < 7) return "Recuperação"
    else return "Aprovado"
}