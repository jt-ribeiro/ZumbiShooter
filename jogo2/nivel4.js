let tempoUltimoTiroNivel4 = 0; // Inicializa o tempo do último disparo no nível 4
let delayDisparoNivel4 = 200;  // Define um delay de 200ms entre disparos no nível 4

let nivelCompletoNivel4 = false; // Indicador para verificar se o nível foi completado
let velocidadeZumbisNivel4 = 2.5; // Mantém a mesma velocidade de zumbis do nível 3

// Função responsável por configurar as condições iniciais do nível 4
function iniciarNivel4() {
  // Alteração do estado do jogo para o nível 4
  tela = 2; // Define a tela do jogo
  nivel = 4; // Define que o jogador se encontra no nível 4
  vidas = 3; // Reinicializa as vidas do jogador
  pontos = 0; // Reinicializa a pontuação
  zumbis = []; // Limpa a lista de zumbis
  projeteis = []; // Limpa a lista de projéteis
  alunos = []; // Limpa a lista de alunos

  let espacoEntreAlunos = 80; // Define o espaço entre alunos no ecrã
  let xHeroi = width / 2; // Posição inicial do herói no centro horizontal do ecrã
  let yAlunos = height - 50; // Posição dos alunos na base do ecrã

  // Cria uma fileira de 10 alunos no fundo do ecrã
  for (let i = 0; i < 10; i++) {
    let x = xHeroi - (espacoEntreAlunos * 5) + (i * espacoEntreAlunos);
    alunos.push(new Aluno(x, yAlunos));
  }
  heroi = new Heroi(); // Reinicializa o herói para o nível
}

// Função que desenha os elementos do nível 4 durante o jogo
function desenharNivel4() {
  background(150); // Define o fundo padrão para o nível 4

  // Condição para finalizar o nível ao atingir 40 pontos
  if (pontos >= 40) {
    nivelCompletoNivel4 = true;
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text('Parabéns! Salvaste a ESTG da invasão Zumbi! Clica para recomeçar', width / 2, height / 2);
    
    // Detecta clique para reiniciar o jogo
    if (mouseIsPressed) {
      tela = 1; // Retorna ao menu ou tela inicial
    }
    return; // Interrompe a execução do restante da função após o fim do nível
  }

  // Movimenta e desenha o herói
  heroi.mover();
  heroi.desenhar();

  // Desenha cada aluno no ecrã
  for (let aluno of alunos) {
    if (aluno) {
      aluno.desenhar();
    }
  }

  // Controle de disparo com microfone e delay entre disparos
  let volume = mic.getLevel();
  if (volume > 0.1 && millis() - tempoUltimoTiroNivel4 > delayDisparoNivel4) {
    heroi.atirar(projeteis, nivel);
    tiroSom.play();
    tempoUltimoTiroNivel4 = millis(); // Atualiza o tempo do último disparo
  }

  // Movimento e desenho dos projéteis, removendo projéteis fora do ecrã
  for (let i = projeteis.length - 1; i >= 0; i--) {
    if (projeteis[i]) {
      projeteis[i].mover();
      projeteis[i].desenhar();

      if (projeteis[i].foraDaTela()) {
        projeteis.splice(i, 1);
      }
    }
  }

  // Aumenta a frequência de zumbis, adicionando um novo a cada 45 frames
  if (frameCount % 45 === 0) {
    zumbis.push(new Zumbi(nivel, velocidadeZumbisNivel4));
  }

  // Interação dos zumbis com projéteis, alunos e herói
  for (let i = zumbis.length - 1; i >= 0; i--) {
    if (zumbis[i] && zumbis[i].imagem) {
      zumbis[i].mover();
      zumbis[i].desenhar();

      let larguraZumbi = zumbis[i].imagem.width || 50;
      let alturaZumbi = zumbis[i].imagem.height || 50;
      let xMinZumbi = zumbis[i].x - larguraZumbi / 2;
      let xMaxZumbi = zumbis[i].x + larguraZumbi / 2;
      let yMinZumbi = zumbis[i].y - alturaZumbi / 2;
      let yMaxZumbi = zumbis[i].y + alturaZumbi / 2;

      // Detecção de colisão entre projéteis e zumbis
      for (let j = projeteis.length - 1; j >= 0; j--) {
        if (projeteis[j] && projeteis[j].x !== undefined && projeteis[j].y !== undefined) {
          let proj = projeteis[j];

          if (proj.x > xMinZumbi && proj.x < xMaxZumbi && proj.y > yMinZumbi && proj.y < yMaxZumbi) {
            zumbis.splice(i, 1);
            projeteis.splice(j, 1);
            pontos++;
            break;
          }
        }
      }

      // Detecção de colisão entre zumbis e alunos
      for (let j = alunos.length - 1; j >= 0; j--) {
        if (alunos[j] && alunos[j].x !== undefined && alunos[j].y !== undefined) {
          let d = dist(zumbis[i].x, zumbis[i].y, alunos[j].x, alunos[j].y);
          if (d < zumbis[i].raio + alunos[j].raio) {
            alunos.splice(j, 1);
            alunoMorreSom.play();
            break;
          }
        }
      }

      // Detecção de colisão entre zumbis e herói
      if (zumbis[i] && heroi && zumbis[i].atinge(heroi)) {
        vidas--;
        vidaSom.play();
        zumbis.splice(i, 1);

        if (vidas <= 0 && pontos < 40) { // Verificação de fim de jogo antes de atingir 40 pontos
          tela = 3;
        }
      }
    }
  }

  // Exibição das informações do jogo
  fill(255);
  textSize(20);
  text(`Nível: ${nivel}`, width - 20, 30); // Exibe o nível no canto superior direito
  text(`Vidas: ${vidas}`, width - 20, 60); // Exibe o número de vidas
  text(`Pontos: ${pontos}`, 100, 30); // Exibe a pontuação no canto superior esquerdo
 
  // Exibe informações do aluno no canto inferior direito
  fill(255);
  textSize(16);
  textAlign(RIGHT, BOTTOM);
  text('João Ribeiro', width - 10, height - 70);
  text('24534', width - 10, height - 90);
  text('Curso: ECGM', width - 10, height - 110);

  // Condição para terminar o jogo se todos os alunos forem eliminados antes de atingir a pontuação necessária
  if (alunos.length === 0 && pontos < 40) {
    tela = 3;
  }
}

// Função para detetar clique e reiniciar o jogo ao finalizar o nível 4
function mousePressed() {
  if (nivelCompletoNivel4) {
    tela = 1; // Volta para o menu inicial após completar o nível 4
  }
}
