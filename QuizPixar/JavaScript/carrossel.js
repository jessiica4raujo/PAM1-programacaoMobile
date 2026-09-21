
    const carrossel = document.getElementById("carrossel");

        function moverDireita() {
            carrossel.scrollBy({
                left: 500,
                behavior: "smooth"
            });
        }

        function moverEsquerda() {
            carrossel.scrollBy({
                left: -500,
                behavior: "smooth"
            });
        }

