class Heroi {
  constructor() {
      this.x = width / 2; 
      this.y = height - 100; // Posição inicial
      this.largura = 60; // Largura do herói
      this.altura = 60; // Altura do herói
      this.imagem = loadImage('media/heroi/heroi2.png'); // Carrega a imagem do herói
  }

  mover() {
      this.x = mouseX; // O herói segue a posição do mouse
      this.x = constrain(this.x, this.largura / 2, width - this.largura / 2); // Limita o movimento do herói dentro da tela
  }

  desenhar() {
    let tamanhoHeroi = 60; // Tamanho da imagem do herói
    imageMode(CENTER); // Desenha o herói em relação ao centro
    push(); // Salva o estado atual do canvas
    translate(this.x, this.y); // Move o ponto de origem para a posição do herói
    rotate(PI); // Rotaciona 180 graus (PI radianos)
    image(this.imagem, 0, 0, tamanhoHeroi, tamanhoHeroi); // Desenha a imagem do herói na nova posição
    pop(); // Restaura o estado anterior do canvas
}

  atirar(projeteis) {
      projeteis.push(new Projetil(this.x, this.y)); // Dispara um novo projetil
  }
}