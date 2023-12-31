// obtem os elementos principais
let jogo = document.querySelector(".jogo");
let personagem = document.querySelector(".personagem");
let tempo = document.querySelector(".tempo");
const obstaculo = document.querySelector(".obstaculo");
const pontuacaoJogador = document.querySelector(".pontos");
const gameOver = document.querySelector(".game-over");
const painel = document.querySelector(".painel");
const sol = document.querySelector(".sol");
const nuvens = document.querySelectorAll(".nuvem");
const btnStart = document.querySelector(".start");
const painelUltimasPontuacoes = document.querySelector(".ultimas-pontuacoes");

let ultimasPontuacoes = [];
let tempoDecorrido = 0; 

function comecarJogo() {
    // define pontuacao inicial
    let pontos = 10;

    // incrementa o tempo decorrido a cada segundo
    const tempoInterval = setInterval(() => {
        tempoDecorrido++;
        tempo.textContent = `Tempo: ${tempoDecorrido}`;  
    }, 1000);

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

    // oculta painel com ultimas pontuacoes
    painelUltimasPontuacoes.style.display = 'none';

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
    const puloPersonagem = function (event) {
        // se a tecla pressionada for espaço
        if (event.key === ' ') {
            // executa o som do pulo
            somPulo.play();

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
    }

    const loop = setInterval(() => {

        // pega a posicao do obstaculo
        const posicaoObstaculo = obstaculo.offsetLeft;
    
        // pega a altura do pulo do personagem 
        const alturaPuloPersonagem = +window.getComputedStyle(personagem).bottom.replace('px', '');
    
        if (posicaoObstaculo <= 120 && alturaPuloPersonagem < 80) {
    
            // remove anicacao do obstaculo
            obstaculo.style.animation = 'none';
    
            // define a posicao do obstaculo no momento da colisao
            obstaculo.style.left = `${posicaoObstaculo}px`;
    
            // para a trilha sonora
            trilhaSonora.pause();
    
            // executa o som de game over
            somGameOver.play();
    
            // tempo de reproducao do  som de game over apos audio ja ter sido executado
            somGameOver.currentTime = 0;

            const pontuacaoAtual = { pontos: pontos, tempo: tempoDecorrido, data: Date.now() };
            const pontuacoesAnteriores = JSON.parse(localStorage.getItem('pontuacoes')) || [];

            // mantem apenas as últimas 3 pontuacoes
            if (pontuacoesAnteriores.length > 3)
                // Remove o elemento mais antigo
                pontuacoesAnteriores.shift();  
                            
            // verifica se a pontuação atual já existe nas pontuações anteriores
            const pontuacaoJaExiste = pontuacoesAnteriores.some(pontuacao => pontuacao.data === pontuacaoAtual.data);

            if (!pontuacaoJaExiste)
                pontuacoesAnteriores.push(pontuacaoAtual);

            // salva pontuacao no localstorage
            localStorage.setItem('pontuacoes', JSON.stringify(pontuacoesAnteriores));
    
            // exibe o game over
            gameOver.style.display = 'block';
    
            // add animacao para sumir personagem
            personagem.classList.add('fim');
         
            // remove o evento de pulo para evitar pontos após jogo chegar ao fim
            document.removeEventListener('keydown', puloPersonagem);
    
            // interrompe o loop
            clearInterval(loop);

            // interrompe o tempo
            clearInterval(tempoInterval); 

            // atualiza pagina automaticamente
            setTimeout(() => {
                window.location.reload();
            }, 2600);
        }
    }, 10)

    // evento p/ detectar quando usuario pressiona alguma tecla, ao acontecer chama a funcao puloPersonagem
    document.addEventListener('keydown', puloPersonagem);
}

function exibirUltimasPontuacoes() { 

    // obtem as pontuacoes armazenadas no LS
    const pontuacoesLS = localStorage.getItem('pontuacoes');

    if (pontuacoesLS) {

        // converte as pontuacoes armazenadas de JSON para array de objetos
        const ultimasPontuacoes = JSON.parse(pontuacoesLS);

        // ordena as pontuacoes pelo mais recente com base na propriedade data
        ultimasPontuacoes.sort((a, b) => b.data - a.data);

        // mantem apenas as 3 ultimas pontuacoes
        const ultimasTresPontuacoes = ultimasPontuacoes.slice(0, 3);

        // limpa o conteudo anterior das pontuacoes exibidas
        painelUltimasPontuacoes.innerHTML = '';

        // cria elementos para exibicao
        ultimasTresPontuacoes.forEach(pontuacao => {
            const pontuacaoItem = document.createElement('div');
            const conteudoPontuacao = document.createElement('p');
            const ConteudoTempo = document.createElement('p');
            conteudoPontuacao.textContent = `Pontos: ${pontuacao.pontos}`;
            ConteudoTempo.textContent = `Tempo: ${pontuacao.tempo} segundos`;
            pontuacaoItem.appendChild(conteudoPontuacao);
            pontuacaoItem.appendChild(ConteudoTempo);
            painelUltimasPontuacoes.appendChild(pontuacaoItem);
        });
        
        // exibe o painel com ultimas pontuacoes
        painelUltimasPontuacoes.style.display = 'block';
    }
}

exibirUltimasPontuacoes();