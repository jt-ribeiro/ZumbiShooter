// Classe Aluno
class Aluno {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.raio = 20; // Tamanho do aluno
      this.imagem = loadImage('media/aluno/aluno.png');
    }
  
    desenhar() {
      let tamanhoAluno = 30; // Tamanho da imagem do herói
    imageMode(CENTER); // Desenha o herói em relação ao centro
    push(); // Salva o estado atual do canvas
    translate(this.x, this.y); // Move o ponto de origem para a posição do herói
    
    image(this.imagem, 0, 0, tamanhoAluno, tamanhoAluno); // Desenha a imagem do herói na nova posição
    pop(); // Restaura o estado anterior do canvas
    }
  }