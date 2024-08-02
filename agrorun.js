const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

const areaJogadorLargura = canvas.width * 0.3;

let personagemX = 50;
let personagemY = canvas.height - 80;
let personagemLargura = 30;
let personagemAltura = 50;
let velocidadeX = 0;
let velocidadeY = 0;
const velocidadePersonagem = 6;

let itens = [];
let velocidadeItens = 4;
let intervaloItens = 800;
let ultimoItem = 0;

let pontuacao = 0;
let vidas = 5;

const itensInfo = {
  "Adubo": { pontos: 1, cor: "brown", imagem: null, aura: "green", escala: 1.5 },
  "Drone": { pontos: 3, cor: "gray", imagem: null, aura: "green", escala: 2.0 },
  "Semente Dourada": { pontos: 5, cor: "gold", imagem: null, aura: "green", escala: 1.5 },
  "Gafanhoto": { pontos: -1, cor: "green", imagem: null, aura: "red", escala: 1.0 },
  "Erva Daninha": { pontos: -3, cor: "darkgreen", imagem: null, aura: "red", escala: 2.0 }
};

// Variáveis para armazenar as imagens
let fundoImg, personagemImg;

// Variáveis de escala - Preencha com os valores desejados
let escalaPersonagemX = 3.0;
let escalaPersonagemY = 3.0;

// Variável para controlar o estado do jogo (declarada no escopo global)
let jogoIniciado = false;

// Função para carregar as imagens
function carregarImagens() {
  fundoImg = new Image();
  fundoImg.src = "imagens AgroRun/fundo.jpg";

  personagemImg = new Image();
  personagemImg.src = "imagens AgroRun/fazendeiro.png";

  // Carregue as imagens dos itens aqui
  itensInfo["Adubo"].imagem = new Image();
  itensInfo["Adubo"].imagem.src = "imagens AgroRun/adubo.png";

  itensInfo["Drone"].imagem = new Image();
  itensInfo["Drone"].imagem.src = "imagens AgroRun/drone.png";

  itensInfo["Semente Dourada"].imagem = new Image();
  itensInfo["Semente Dourada"].imagem.src = "imagens AgroRun/semente.png";

  itensInfo["Gafanhoto"].imagem = new Image();
  itensInfo["Gafanhoto"].imagem.src = "imagens AgroRun/gafanhoto.png";

  itensInfo["Erva Daninha"].imagem = new Image();
  itensInfo["Erva Daninha"].imagem.src = "imagens AgroRun/erva.png";

  // Verificar se as imagens foram carregadas corretamente
  let imagensCarregadas = 0;
  let totalImagens = Object.keys(itensInfo).length + 2; // Itens + fundo + personagem

  function verificarCarregamentoCompleto() {
    imagensCarregadas++;
    if (imagensCarregadas === totalImagens) {
      console.log("Todas as imagens foram carregadas com sucesso!");
      desenharCenario(); // Desenha o cenário inicial 
    }
  }

  fundoImg.onload = verificarCarregamentoCompleto;
  fundoImg.onerror = function() {
    console.error("Erro ao carregar a imagem de fundo. Verifique o caminho da imagem.");
  };

  personagemImg.onload = verificarCarregamentoCompleto;
  personagemImg.onerror = function() {
    console.error("Erro ao carregar a imagem do personagem. Verifique o caminho da imagem.");
  };

  for (const itemNome of Object.keys(itensInfo)) {
    itensInfo[itemNome].imagem.onload = verificarCarregamentoCompleto;
    itensInfo[itemNome].imagem.onerror = function() {
      console.error(`Erro ao carregar a imagem do ${itemNome}. Verifique o caminho da imagem.`);
    };
  }
}

// Cenário da Fazenda
function desenharCenario() {
  ctx.drawImage(fundoImg, 0, 0, canvas.width, canvas.height); // Desenhe o fundo
}

function criarItem() {
  const itensPossiveis = Object.keys(itensInfo);
  const itemAleatorio = itensPossiveis[Math.floor(Math.random() * itensPossiveis.length)];
  let itemY = Math.random() * (canvas.height - 50);
  itens.push({ nome: itemAleatorio, x: canvas.width, y: itemY, largura: 30, altura: 30 });
}

// Eventos de teclado
document.addEventListener("keydown", (evento) => {
  if (evento.key === "ArrowUp" && personagemY > 0) {
    velocidadeY = -velocidadePersonagem;
  } else if (evento.key === "ArrowDown" && personagemY < canvas.height - personagemAltura * escalaPersonagemY) {
    velocidadeY = velocidadePersonagem;
  }
  if (evento.key === "ArrowLeft" && personagemX > 0) {
    velocidadeX = -velocidadePersonagem;
  } else if (evento.key === "ArrowRight" && personagemX < areaJogadorLargura - personagemLargura * escalaPersonagemX) {
    velocidadeX = velocidadePersonagem;
  }
  // Prevenir o comportamento padrão das teclas de seta
  if (evento.key === "ArrowUp" || evento.key === "ArrowDown" || evento.key === "ArrowLeft" || evento.key === "ArrowRight") {
    evento.preventDefault();
  }
});

document.addEventListener("keyup", () => {
  velocidadeX = 0;
  velocidadeY = 0;
});

function mostrarPopupVitoria() {
  // ... (lógica para mostrar o popup de vitória )
}

function reiniciarJogo() {
  // Reiniciar variáveis do jogo
  personagemX = 50;
  personagemY = canvas.height - 80;
  velocidadeX = 0;
  velocidadeY = 0;
  itens = [];
  ultimoItem = 0;
  pontuacao = 0;
  vidas = 5;

  // Esconder a mensagem de "Game Over"
  document.getElementById("gameOver").style.display = "none";

  // Reativar o botão de iniciar
  document.getElementById("iniciarBtn").disabled = false;

  // Esconder a mensagem de "Parabéns"
  document.getElementById("vitoria").style.display = "none";

  // Reiniciar o estado do jogo
  jogoIniciado = false;

  // Redesenhar a tela para mostrar o personagem e o HUD
  desenhar();
}

// Função para iniciar o jogo
function iniciarJogo() {
  if (!jogoIniciado) {
    jogoIniciado = true;
    requestAnimationFrame(desenhar); // Inicia o loop de desenho apenas uma vez
  }
}

// Adicionar um ouvinte de evento ao botão de iniciar
document.getElementById("iniciarBtn").addEventListener("click", iniciarJogo);

function desenhar() {
  if (!jogoIniciado) return; // Não faz nada se o jogo não estiver iniciado

  desenharCenario();

  // Criar novos itens
  let agora = Date.now();
  if (agora - ultimoItem > intervaloItens) {
    criarItem();
    ultimoItem = agora;
  }

  // Desenhar e mover os itens
  for (let i = 0; i < itens.length; i++) {
    let item = itens[i];

    // Desenhar a aura
    ctx.strokeStyle = itensInfo[item.nome].aura;
    ctx.lineWidth = 2;
    ctx.strokeRect(item.x - 2, item.y - 2, item.largura * itensInfo[item.nome].escala + 4, item.altura * itensInfo[item.nome].escala + 4);

    // Desenhar o item usando a imagem e a escala correta
    ctx.drawImage(itensInfo[item.nome].imagem, item.x, item.y, item.largura * itensInfo[item.nome].escala, item.altura * itensInfo[item.nome].escala);

    // Mover o item para a esquerda
    item.x -= velocidadeItens;

    // Remover o item se ele sair da tela
    if (item.x + item.largura * itensInfo[item.nome].escala < 0) {
      itens.splice(i, 1);
      i--;
    }

    // Verificar colisão (ajuste as dimensões do personagem e do item na colisão)
    if (
    personagemX < item.x + item.largura * itensInfo[item.nome].escala &&
    personagemX + personagemLargura * escalaPersonagemX > item.x &&
    personagemY < item.y + item.altura * itensInfo[item.nome].escala &&
    personagemY + personagemAltura * escalaPersonagemY > item.y
    ) {
    itens.splice(i, 1);
    i--;
    pontuacao += itensInfo[item.nome].pontos;

      if (itensInfo[item.nome].aura === "red") {
        vidas--;
        if (vidas <= 0) {
          // Exibir a mensagem de "Game Over"
          document.getElementById("gameOver").style.display = "block";

          // Adicionar um ouvinte de evento ao botão de reiniciar
          document.getElementById("reiniciarBtn").addEventListener("click", reiniciarJogo);

          // Desativar o botão de iniciar
          document.getElementById("iniciarBtn").disabled = true;

          jogoIniciado = false; // Para o loop de desenho
        }
      }
    }
    }

    // Verificar se o jogador ganhou
    if (pontuacao >= 50) {
    // Exibir a mensagem de "Parabéns"
    document.getElementById("vitoria").style.display = "block";

    // Adicionar um ouvinte de evento ao botão de reiniciar na tela de vitória
    document.getElementById("reiniciarBtnVitoria").addEventListener("click", reiniciarJogo);

    // Desativar o botão de iniciar
    document.getElementById("iniciarBtn").disabled = true;

    jogoIniciado = false; // Para o loop de desenho
    }

    // Verificar se o jogador perdeu - Se sim, o personagem e outros elementos não são desenhados
    if (vidas > 0) {
    // Desenhar o personagem
    ctx.drawImage(personagemImg, personagemX, personagemY, personagemLargura * escalaPersonagemX, personagemAltura * escalaPersonagemY);

    // Mover o personagem
    personagemX += velocidadeX;
    personagemY += velocidadeY;

    // Limitar o movimento do personagem à área do jogador (ajuste as dimensões do personagem)
    personagemX = Math.max(0, Math.min(personagemX, areaJogadorLargura - personagemLargura * escalaPersonagemX));
    personagemY = Math.max(0, Math.min(personagemY, canvas.height - personagemAltura * escalaPersonagemY));

    // Desenhar a pontuação e vidas
    ctx.fillStyle = "black";
    ctx.font = "24px Arial";
    ctx.fillText("Pontuação: " + pontuacao, 10, 30);
    ctx.fillText("Vidas: " + vidas, 10, 60);
    }

    if (jogoIniciado) {
    requestAnimationFrame(desenhar);
    }
    }

    // Carregar as imagens
    carregarImagens();


