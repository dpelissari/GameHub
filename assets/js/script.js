const personagem = document.querySelector(".personagem");
const obstaculo = document.querySelector(".obstaculo");
const pontuacaoJogador = document.querySelector(".pontos");



const puloPersonagem = function () {
    personagem.classList.add('pulo-personagem');
    setTimeout(() => {
        personagem.classList.remove('pulo-personagem')
    }, 600);
}

// evento para pulo ao pressionar alguma tecla
document.addEventListener('keydown', puloPersonagem);
     