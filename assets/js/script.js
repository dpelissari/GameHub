// obtem os elementos principais
const personagem = document.querySelector(".personagem");
const obstaculo = document.querySelector(".obstaculo");
const pontuacaoJogador = document.querySelector(".pontos");

// inclui e remove a animacao de pulo do personagem
const puloPersonagem = function () {
    personagem.classList.add('pulo-personagem');
    setTimeout(() => {
        personagem.classList.remove('pulo-personagem')
    }, 600);
}

const loop = setInterval(() => {

    // pega a posição do obstaculo
    const posicaoObstaculo = obstaculo.offsetLeft;

    // pega a altura do pulo do personagem 
    const alturaPuloPersonagem = +window.getComputedStyle(personagem).bottom.replace('px', '');

    if (posicaoObstaculo <= 120 && alturaPuloPersonagem < 80) {

        // remove anicacao do obstaculo
        obstaculo.style.animation = 'none';

        // define a posicao do obstaculo no momento da colisão
        obstaculo.style.left = `${posicaoObstaculo}px`;
        pontos.textContent = "Game over";

        // Interrompe o loop
        clearInterval(loop);
    }
}, 10)

// evento p/ detectar quando usuário pressiona alguma tecla, ao acontecer chama a função puloPersonagem
document.addEventListener('keydown', puloPersonagem);
     