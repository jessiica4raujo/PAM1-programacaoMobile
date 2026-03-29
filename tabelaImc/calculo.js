export function calcularImc(altura, peso){
    let imc = peso / (altura * altura);
    return imc;
}

export function definirStatus(calculo, tdClassificacao){

    if (calculo < 18.5){
        tdClassificacao.textContent = "Abaixo do peso";

    } else if (calculo < 24.9){
        tdClassificacao.textContent = "Peso normal";

    } else if (calculo < 29.9){
        tdClassificacao.textContent = "Sobrepeso";

    } else if (calculo < 34.9){
        tdClassificacao.textContent = "Obesidade grau 1";

    } else if (calculo < 39.9){
        tdClassificacao.textContent = "Obesidade grau 2";

    } else {
        tdClassificacao.textContent = "Obesidade grau 3";
    }

}