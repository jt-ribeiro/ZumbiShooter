class Zumbi {
    constructor(nivel) {
      this.nivel = nivel; // Nível do zumbi
      this.x = random(width); // Posição inicial aleatória em x
      this.y = 0; // Começa na parte superior da tela
      this.velocidade = 1 + nivel; // Aumenta a velocidade com o nível
      this.raio = 30; // Raio do zumbi
      this.imagem = loadImage('media/zumbi/export_move.gif'); // Carrega a imagem
    }
  
    mover() {
      this.y += this.velocidade; // Move o zumbi para baixo
    }
  
    desenhar() {
      let tamanhoZumbi = 50; // Tamanho aumentado da imagem da arma
      push(); // Salva o estado atual da transformação
      translate(this.x + tamanhoZumbi / 2, this.y + tamanhoZumbi / 2); // Move a origem para o centro da imagem
      rotate(HALF_PI); // Roda a imagem 90º
      image(this.imagem, -tamanhoZumbi / 2, -tamanhoZumbi / 2, tamanhoZumbi, tamanhoZumbi); // Desenha a imagem
      pop(); // Restaura o estado anterior da transformação
    }
  
    foraDaTela() {
      return this.y > height; // Verifica se o zumbi saiu da tela
    }
  
    atinge(heroi) {
      let d = dist(this.x, this.y, heroi.x, heroi.y); // Distância entre zumbi e herói
      return d < this.raio + heroi.altura / 2; // Verifica colisão
    }
  }
  