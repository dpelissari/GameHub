// obtem os elementos principais
const personagem = document.querySelector(".personagem");
const obstaculo = document.querySelector(".obstaculo");
const pontuacaoJogador = document.querySelector(".pontos");
const gameOver = document.querySelector(".game-over");
const btnReset = document.querySelector(".reset");

// pontuacao inicial
let pontos = 10;

// trilha sonora
let trilha= new Audio("./assets/audio/trilha.mp3");

// volume da trilha sonora
trilha.volume = 0.1;

// som ao pular
let somPulo = new Audio("./assets/audio/pulo.mp3");

// volume do pulo
somPulo.volume = 0.4;

// som de game over
let somGameOver = new Audio("./assets/audio/fim.mp3");

// inclui e remove a animacao de pulo do personagem
const puloPersonagem = function () {

    // executa o som do pulo
    somPulo.play();

    trilha.play();

    // tempo de reproducao do som do pulo apos audio ter sido executado
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

    // pega a posicao do obstaculo
    const posicaoObstaculo = obstaculo.offsetLeft;

    // pega a altura do pulo do personagem 
    const alturaPuloPersonagem = +window.getComputedStyle(personagem).bottom.replace('px', '');

    if (posicaoObstaculo <= 120 && alturaPuloPersonagem < 80) {

        // remove anicacao do obstaculo
        obstaculo.style.animation = 'none';

        // define a posicao do obstaculo no momento da colis�o
        obstaculo.style.left = `${posicaoObstaculo}px`;

        // para a trilha sonora
        trilha.pause();

        // executa o som de game over
        somGameOver.play();

        // tempo de reproducao do  som de game over apos audio ja ter sido executado
        somGameOver.currentTime = 0;

        // exibe o game over
        gameOver.style.display = 'block';

        // exibe o botao reset
        btnReset.style.display = 'block';

        // remove o evento de pulo para evitar pontos após jogo chegar ao fim
        document.removeEventListener('keydown', puloPersonagem);

        // Interrompe o loop
        clearInterval(loop);
    }
}, 10)


// evento p/ detectar quando usuario pressiona alguma tecla, ao acontecer chama a funcao puloPersonagem
document.addEventListener('keydown', puloPersonagem);