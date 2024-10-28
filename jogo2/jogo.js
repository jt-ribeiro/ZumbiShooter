let tela = 0; // 0 = Título, 1 = Menu de Nível, 2 = Jogo, 3 = Fim
let heroi;
let zumbis = [];
let projeteis = [];
let alunos = [];
let vidas = 3;
let pontos = 0;
let nivel = 1;
let mic;

// Configuração para limitar o número de projéteis e inicializar variáveis para elementos do jogo e sons
let maxProjeteis = 3;
let miraImg;
let tiroSom;
let alunoMorreSom;
let vidaSom;
let subidaNivelSom;
let rondaBonusSom;
let emRondaBonus = false;
let fundoMenu;
let fundoSalaAula;
let heroiX;
let heroiY;

// Função para pré-carregar imagens e sons usados no jogo
function preload() {
  fundoMenu = loadImage('media/fundo_menu.jpg'); // Carrega a imagem de fundo para o menu
  fundoSalaAula = loadImage('media/sala_aula.png'); // Carrega a imagem de fundo para a sala de aula
  miraImg = loadImage('media/mira.png');
  tiroSom = loadSound('media/som/tiro.mp3');
  alunoMorreSom = loadSound('media/som/aluno_morre.mp3');
  vidaSom = loadSound('media/som/vida.mp3');
  subidaNivelSom = loadSound('media/som/subida_nivel.mp3');
  rondaBonusSom = loadSound('media/som/ronda_bonus.mp3');
}

// Função de configuração do canvas e ativação do microfone
function setup() {
  createCanvas(800, 600);
  mic = new p5.AudioIn();
  mic.start();
}

// Função principal de desenho que altera a tela com base no estado atual do jogo
function draw() {
  if (tela === 0) {
    telaTitulo();
  } else if (tela === 1) {
    menuNiveis();
  } else if (tela === 2) {
    // Desenha o nível atual com base no valor da variável 'nivel'
    if (nivel === 1) {
      desenharNivel1();
    } else if (nivel === 2) {
      desenharNivel2();
    } else if (nivel === 3) {
      desenharNivel3();
    } else if (nivel === 4) {
      desenharNivel4();
    }
  } else if (tela === 3) {
    telaFim();
  } else if (tela === 4) {
    telaTutorial(); 
  }
}

// Função que desenha a tela inicial do título
function telaTitulo() {
  background(fundoMenu);
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text('Zumbi Shooter - ESTG Edition', width / 2, height / 2 - 60);

  // Botão para acessar o menu de níveis
  textSize(20);
  fill(100);
  rect(width / 2 - 50, height / 2, 100, 40, 10);
  fill(255);
  textAlign(CENTER, CENTER);
  text('Níveis', width / 2, height / 2 + 20);

  // Botão para acessar o tutorial do jogo
  fill(100);
  rect(width / 2 - 50, height / 2 + 60, 100, 40, 10);
  fill(255);
  text('Tutorial', width / 2, height / 2 + 80);

  // Informações do aluno
  fill(255);
  textSize(16);
  textAlign(RIGHT, BOTTOM);
  text('João Ribeiro', width - 10, height - 70);
  text('24534', width - 10, height - 90);
  text('Curso: ECGM', width - 10, height - 110);
}

// Função que desenha o tutorial do jogo com as instruções básicas
function telaTutorial() {
  background(fundoMenu);
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text('Tutorial', width / 2, height / 2 - 60);
  
  // Instruções de jogo
  textSize(20);
  textAlign(LEFT);
  text('Usa o rato para mover o heroi.', 50, height / 2);
  text('Com a tua voz faz o heroi disparar.', 50, height / 2 + 30);
  text('Evita os zumbis e salva os alunos!', 50, height / 2 + 60);
  text('Clique para voltar ao menu.', 50, height / 2 + 90);

  // Botão "Voltar" para o menu
  fill(100);
  rect(width / 2 - 50, height / 2 + 100, 100, 40, 10);
  fill(255);
  textAlign(CENTER, CENTER);
  text('Voltar', width / 2, height / 2 + 120);

  // Informações do aluno
  fill(255);
  textSize(16);
  textAlign(RIGHT, BOTTOM);
  text('João Ribeiro', width - 10, height - 70);
  text('24534', width - 10, height - 90);
  text('Curso: ECGM', width - 10, height - 110);
}

// Função para desenhar o menu de seleção de níveis
function menuNiveis() {
  background(fundoMenu);
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text('Selecione um Nível', width / 2, height / 2 - 60);
  textSize(20);
  text('1 - Entrada da Escola', width / 2, height / 2);
  text('2 - Cantina', width / 2, height / 2 + 30);
  text('3 - Sala de Aula', width / 2, height / 2 + 60);
  text('4 - Ginásio', width / 2, height / 2 + 90);
  text('Clique em um nível para começar!', width / 2, height / 2 + 160);

  // Informações do aluno
  fill(255);
  textSize(16);
  textAlign(RIGHT, BOTTOM);
  text('João Ribeiro', width - 10, height - 70);
  text('24534', width - 10, height - 90);
  text('Curso: ECGM', width - 10, height - 110);
}

// Função para desenhar a tela de final de jogo
function telaFim() {
  background(0);
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text('Game Over!', width / 2, height / 2 - 20);
  textSize(20);
  text(`Você fez ${pontos} pontos`, width / 2, height / 2 + 20);
  text('Clique para reiniciar', width / 2, height / 2 + 60);
}

// Função que define o comportamento dos cliques do mouse para navegação e seleção de níveis
function mousePressed() {
  if (tela === 0) {
    // Verifica se o botão "Níveis" foi clicado
    if (mouseX > width / 2 - 50 && mouseX < width / 2 + 50 && mouseY > height / 2 && mouseY < height / 2 + 40) {
      tela = 1; // Vai para o menu de seleção de níveis
    }
    // Verifica se o botão "Tutorial" foi clicado
    else if (mouseX > width / 2 - 50 && mouseX < width / 2 + 50 && mouseY > height / 2 + 60 && mouseY < height / 2 + 100) {
      tela = 4; // Vai para a tela do tutorial
    }
  } else if (tela === 1) {
    // Verifica qual nível foi selecionado
    if (mouseY >= height / 2 - 10 && mouseY < height / 2 + 10) {
      nivel = 1;
      iniciarNivel1(); // Inicia o nível 1
    } else if (mouseY >= height / 2 + 20 && mouseY < height / 2 + 50) {
      nivel = 2;
      iniciarNivel2(); // Inicia o nível 2
    } else if (mouseY >= height / 2 + 50 && mouseY < height / 2 + 80) {
      nivel = 3;
      iniciarNivel3(); // Inicia o nível 3
    } else if (mouseY >= height / 2 + 80 && mouseY < height / 2 + 110) {
      nivel = 4;
      iniciarNivel4(); // Inicia o nível 4
    }
  } else if (tela === 3) {
    tela = 0; // Reinicia o jogo e volta para a tela de título
  } else if (tela === 4) {
    // Verifica se o botão "Voltar" foi clicado
    if (mouseX > width / 2 - 50 && mouseX < width / 2 + 50 && mouseY > height / 2 + 100 && mouseY < height / 2 + 140) {
      tela = 0; // Volta para a tela inicial
    }
  }
}
