// obtem os elementos principais
let jogo = document.querySelector(".jogo");
let personagem = document.querySelector(".personagem");
const obstaculo = document.querySelector(".obstaculo");
const pontuacaoJogador = document.querySelector(".pontos");
const gameOver = document.querySelector(".game-over");
const painel = document.querySelector(".painel");
const sol = document.querySelector('.sol');
const nuvens = document.querySelectorAll('.nuvem');
const btnStart = document.querySelector('.start');

function comecarJogo() {
    // define pontuacao inicial
    let pontos = 10;

    // trilha sonora
    let trilhaSonora = new Audio("./assets/audio/trilha.mp3");

    // volume da trilha sonora
    trilhaSonora.volume = 0.1;

    // som ao pular
    let somPulo = new Audio("./assets/audio/pulo.mp3");

    // volume do pulo
    somPulo.volume = 0.4;

    // som de game over
    let somGameOver = new Audio("./assets/audio/fim.mp3");

    // oculta botao de inicio de jogo
    btnStart.style.display = 'none';

    // exibe painel com pontuacao
    painel.style.display = 'flex';

    // inicia trilha sonora
    trilhaSonora.play();

    // exibe obstaculo
    obstaculo.style.display = 'block';

    // exibe nuvens
    nuvens.forEach(nuvem => { nuvem.style.display = 'block'});

    // exibe sol
    sol.style.display = 'block';

    let PersonagemCriado = document.querySelectorAll('.personagem');

    // cria o personagem
    if (PersonagemCriado.length == 0) {
        personagem = document.createElement("img");
        personagem.src = "./assets/img/personagem.gif";
        personagem.className = "personagem";
        personagem.alt = "Personagem jogo";
        jogo.appendChild(personagem);
    }

    // inclui e remove a animacao de pulo do personagem
    const puloPersonagem = function () {

        // executa o som do pulo
        somPulo.play();

        // executa a trilha sonora do jogo
        trilhaSonora.play();

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
            trilhaSonora.pause();
    
            // executa o som de game over
            somGameOver.play();
    
            // tempo de reproducao do  som de game over apos audio ja ter sido executado
            somGameOver.currentTime = 0;
    
            // exibe o game over
            gameOver.style.display = 'block';
    
            // add animacao para sumir personagem
            personagem.classList.add('fim');
         
            // remove o evento de pulo para evitar pontos após jogo chegar ao fim
            document.removeEventListener('keydown', puloPersonagem);
    
            // Interrompe o loop
            clearInterval(loop);

            // atualiza pagina automaticamente
            setTimeout(() => {
                window.location.reload();
            }, 2600);
        }
    }, 10)

    // evento p/ detectar quando usuario pressiona alguma tecla, ao acontecer chama a funcao puloPersonagem
    document.addEventListener('keydown', puloPersonagem);
}