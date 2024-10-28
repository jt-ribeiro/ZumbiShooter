class ItemArma {
    constructor() {
        this.x = random(width); // Posição inicial aleatória
        this.y = 0; // Começa do topo da tela
        this.raio = 30; // Raio para detecção de colisão
        this.velocidade = 2; // Velocidade de descida
        this.imagem = loadImage('media/arma/arma.png'); // Carrega a imagem
    }

    mover() {
        this.y += this.velocidade; // Move o item para baixo
    }

    desenhar() {
        let tamanhoArma = 60; // Tamanho aumentado da imagem da arma
        image(this.imagem, this.x, this.y, tamanhoArma, tamanhoArma); // Desenha a imagem do item
    }

    coletado(heroi) {
        // Verifica se o herói coletou o item
        let d = dist(this.x + 30, this.y + 30, heroi.x, heroi.y); // Ajusta a posição para o centro da arma
        return d < this.raio + heroi.raio; // Verifica a colisão
    }

    foraDaTela() {
        return this.y > height; // Verifica se o item saiu da tela
    }
}