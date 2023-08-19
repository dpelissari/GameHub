// obtem os elementos principais
const personagem = document.querySelector(".personagem");
const obstaculo = document.querySelector(".obstaculo");
const pontuacaoJogador = document.querySelector(".pontos");
const gameOver = document.querySelector(".game-over");

const botaoIniciar = document.querySelector("iniciarJogo");

// pontuacao inicial
let pontos = 10;

// som ao pular
let somPulo = new Audio("./assets/audio/pulo.mp3");

// som de game over
let somGameOver = new Audio("./assets/audio/fim.mp3");

// inclui e remove a animacao de pulo do personagem
const puloPersonagem = function () {

    // executa o som do pulo
    somPulo.play();

    // tempo de reprodução após audio ter sido executado
    somPulo.currentTime = 0;

    // adiciona a animacao do pulo
    personagem.classList.add('pulo-personagem');
    
    setTimeout(() => {
        personagem.classList.remove('pulo-personagem')
        pontos += (3 * 2) / 1;
        pontuacaoJogador.textContent = pontos;
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

        // executa o som de game over
        somGameOver.play();

        // tempo de reprodução após audio ter sido executado
        somGameOver.currentTime = 0;

        // exibe o game over
        gameOver.style.display = 'block';

        // Interrompe o loop
        clearInterval(loop);
    }

}, 10)

// evento p/ detectar quando usuário pressiona alguma tecla, ao acontecer chama a função puloPersonagem
document.addEventListener('keydown', puloPersonagem);
     