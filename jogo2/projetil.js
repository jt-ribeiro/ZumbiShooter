
class Projetil {
    constructor(x, y) {
      this.x = x; // Posição inicial em x
      this.y = y; // Posição inicial em y
      this.raio = 5; // Raio do projetil
      this.velocidade = -5; // Velocidade de disparo (para cima)
    }
  
    mover() {
      this.y += this.velocidade; // Move o projetil para cima
    }
  
    desenhar() {
      fill(255, 0, 0); // Cor vermelha para o projetil
      noStroke();
      ellipse(this.x, this.y, this.raio * 2); // Desenha o projetil
    }
  
    foraDaTela() {
      return this.y < 0; // Verifica se o projetil saiu da tela
    }
  }
  