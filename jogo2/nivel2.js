let tempoUltimoTiroNivel2 = 0; // Inicializa o tempo do último disparo no nível 2
let delayDisparoNivel2 = 200;  // Define um intervalo de 200ms entre os disparos no nível 2

let nivelCompletoNivel2 = false; // Flag para verificar se o nível foi completado
let velocidadeZumbisNivel2 = 2.4; // Velocidade dos zumbis, 20% mais rápido do que no nível 1

function iniciarNivel2() {
  // Configurações iniciais do nível 2
  tela = 2; // Muda para a tela do jogo
  nivel = 2; // Define que o nível actual é o 2
  vidas = 3; // Número inicial de vidas do jogador
  pontos = 0; // Pontuação inicial
  zumbis = []; // Array para armazenar os zumbis
  projeteis = []; // Array para armazenar os projéteis
  alunos = []; // Array para armazenar os alunos

  let espacoEntreAlunos = 80; // Define o espaçamento entre os alunos
  let xHeroi = width / 2; // Define a posição inicial do herói (centro da tela)
  let yAlunos = height - 50; // Posição vertical dos alunos

  // Cria e posiciona os alunos na tela
  for (let i = 0; i < 10; i++) {
    let x = xHeroi - (espacoEntreAlunos * 5) + (i * espacoEntreAlunos); // Calcula a posição de cada aluno
    alunos.push(new Aluno(x, yAlunos)); // Adiciona o aluno ao array
  }
  heroi = new Heroi(); // Reinicializa o herói
}

function desenharNivel2() {
  background(150); // Define o fundo padrão para o nível 2

  // Verifica se a pontuação necessária para completar o nível foi atingida
  if (pontos >= 20) {
    nivelCompletoNivel2 = true; // Define o nível como completo
    fill(255); // Cor do texto
    textSize(32); // Tamanho do texto
    textAlign(CENTER, CENTER); // Alinhamento do texto
    text('Nível 2 Completo! Clique para nível 3', width / 2, height / 2); // Mensagem de conclusão do nível
    
    // Verifica se o botão do rato foi pressionado para iniciar o nível 3
    if (mouseIsPressed) {
      iniciarNivel3(); // Chama a função para iniciar o próximo nível
    }
    return; // Sai da função se o nível estiver completo
  }

  heroi.mover(); // Move o herói de acordo com a lógica definida na classe Heroi
  heroi.desenhar(); // Desenha o herói na tela

  // Desenha cada aluno na tela
  for (let aluno of alunos) {
    if (aluno) {
      aluno.desenhar();
    }
  }

  // Controle de disparo com base no volume do microfone e delay de disparo
  let volume = mic.getLevel(); // Obtém o nível de volume do microfone
  if (volume > 0.1 && millis() - tempoUltimoTiroNivel2 > delayDisparoNivel2) {
    heroi.atirar(projeteis, nivel); // O herói dispara projéteis se o volume for suficiente
    tiroSom.play(); // Toca o som do disparo
    tempoUltimoTiroNivel2 = millis(); // Actualiza o tempo do último disparo
  }

  // Controla o movimento dos projéteis e a sua remoção se saírem da tela
  for (let i = projeteis.length - 1; i >= 0; i--) {
    if (projeteis[i]) {
      projeteis[i].mover(); // Move o projétil
      projeteis[i].desenhar(); // Desenha o projétil na tela

      if (projeteis[i].foraDaTela()) {
        projeteis.splice(i, 1); // Remove o projétil se ele sair da tela
      }
    }
  }

  // Adiciona um novo zumbi a cada 60 frames
  if (frameCount % 60 === 0) {
    zumbis.push(new Zumbi(nivel)); // Cria um novo zumbi
  }

  // Controla o movimento dos zumbis e verifica colisões
  for (let i = zumbis.length - 1; i >= 0; i--) {
    if (zumbis[i] && zumbis[i].imagem) {
      zumbis[i].mover(); // Move o zumbi
      zumbis[i].desenhar(); // Desenha o zumbi na tela

      // Define a área de colisão do zumbi
      let larguraZumbi = zumbis[i].imagem.width || 50;
      let alturaZumbi = zumbis[i].imagem.height || 50;
      let xMinZumbi = zumbis[i].x - larguraZumbi / 2;
      let xMaxZumbi = zumbis[i].x + larguraZumbi / 2;
      let yMinZumbi = zumbis[i].y - alturaZumbi / 2;
      let yMaxZumbi = zumbis[i].y + alturaZumbi / 2;

      // Verifica colisões entre projéteis e zumbis
      for (let j = projeteis.length - 1; j >= 0; j--) {
        if (projeteis[j]) {
          let proj = projeteis[j];

          // Colisão entre o projétil e o zumbi
          if (proj.x > xMinZumbi && proj.x < xMaxZumbi && proj.y > yMinZumbi && proj.y < yMaxZumbi) {
            zumbis.splice(i, 1); // Remove o zumbi
            projeteis.splice(j, 1); // Remove o projétil
            pontos++; // Aumenta a pontuação
            break;
          }
        }
      }

      // Verifica colisões entre zumbis e alunos
      for (let j = alunos.length - 1; j >= 0; j--) {
        if (alunos[j]) {
          let d = dist(zumbis[i].x, zumbis[i].y, alunos[j].x, alunos[j].y);
          if (d < zumbis[i].raio + alunos[j].raio) {
            alunos.splice(j, 1); // Remove o aluno
            alunoMorreSom.play(); // Toca o som da perda do aluno
            break;
          }
        }
      }

      // Verifica colisões entre zumbis e o herói
      if (zumbis[i] && heroi && zumbis[i].atinge(heroi)) {
        vidas--; // Diminui uma vida do jogador
        vidaSom.play(); // Toca o som da perda de vida
        zumbis.splice(i, 1); // Remove o zumbi

        // Verifica se o jogador ainda tem vidas e se completou a pontuação mínima
        if (vidas <= 0 && pontos < 20) {
          tela = 3; // Muda para a tela de fim de jogo
        }
      }
    }
  }

  // Desenha as informações do jogo na tela
  fill(255);
  textSize(20);
  text(`Nível: ${nivel}`, width - 20, 30); // Mostra o nível no canto superior direito
  text(`Vidas: ${vidas}`, width - 20, 60); // Mostra as vidas no canto superior direito

  // Mostra a pontuação no canto superior esquerdo
  textSize(20);
  text(`Pontos: ${pontos}`, 100, 30);

  // Informações do aluno
  fill(255);
  textSize(16); 
  textAlign(RIGHT, BOTTOM);
  text('João Ribeiro', width - 10, height - 70); // Exibe o nome do aluno
  text('24534', width - 10, height - 90); // Exibe o número do aluno
  text('Curso: ECGM', width - 10, height - 110); // Exibe a sigla do curso

  // Verifica se todos os alunos foram eliminados antes de atingir a pontuação mínima
  if (alunos.length === 0 && pontos < 20) {
    tela = 3; // Muda para a tela de fim de jogo
  }
}

// Função para transição entre níveis
function mousePressed() {
  if (nivelCompletoNivel2) {
    tela = 1; // Retorna para o menu
    nivel = 3; // Define o próximo nível como 3
    iniciarNivel3(); // Chama a função para iniciar o nível 3
  }
}
