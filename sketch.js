let ball;

let leftPaddle, rightPaddle;

let leftScore = 0, rightScore = 0;

function setup() {

  createCanvas(800, 400);

  ball = new Ball();

  leftPaddle = new Paddle(true);

  rightPaddle = new Paddle(false);

}

function draw() {

  background(0);

  // Mostrar a bola e as paletas

  ball.show();

  ball.update();

  leftPaddle.show();

  rightPaddle.show();

  

  // Movimentação das paletas

  leftPaddle.update(true);

  rightPaddle.update(false);

  // Verificar colisões com as paletas

  ball.checkPaddleLeft(leftPaddle);

  ball.checkPaddleRight(rightPaddle);

  // Mostrar pontuação

  displayScore();

}

function displayScore() {

  fill(255);

  textSize(32);

  text(leftScore, width / 4, 50);

  text(rightScore, 3 * width / 4, 50);

}

class Ball {

  constructor() {

    this.x = width / 2;

    this.y = height / 2;

    this.xspeed = 5;

    this.yspeed = 3;

    this.r = 12;

  }

  update() {

    this.x += this.xspeed;

    this.y += this.yspeed;

    // Colisão com as bordas superiores e inferiores

    if (this.y < 0 || this.y > height) {

      this.yspeed *= -1;

    }

    // Pontuação

    if (this.x < 0) {

      rightScore++;

      this.reset();

    } else if (this.x > width) {

      leftScore++;

      this.reset();

    }

  }

  reset() {

    this.x = width / 2;

    this.y = height / 2;

    this.xspeed *= random([-1, 1]);

  }

  show() {

    fill(255);

    ellipse(this.x, this.y, this.r * 2);

  }

  checkPaddleLeft(p) {

    if (this.x - this.r < p.x + p.w && this.y > p.y && this.y < p.y + p.h) {

      this.xspeed *= -1;

      this.x = p.x + p.w + this.r; // Evita a bola de entrar na paleta

    }

  }

  checkPaddleRight(p) {

    if (this.x + this.r > p.x && this.y > p.y && this.y < p.y + p.h) {

      this.xspeed *= -1;

      this.x = p.x - this.r; // Evita a bola de entrar na paleta

    }

  }

}

class Paddle {

  constructor(isLeft) {

    this.w = 10;

    this.h = 100;

    this.y = height / 2 - this.h / 2;

    this.x = isLeft ? 0 : width - this.w;

    this.yspeed = 0;

  }

  update(isLeft) {

    if (isLeft) {

      if (keyIsDown(87)) { // W

        this.y -= 10;

      } else if (keyIsDown(83)) { // S

        this.y += 10;

      }

    } else {

      if (keyIsDown(UP_ARROW)) {

        this.y -= 10;

      } else if (keyIsDown(DOWN_ARROW)) {

        this.y += 10;

      }

    }

    

    // Limitar dentro do canvas

    this.y = constrain(this.y, 0, height - this.h);

  }

  show() {

    fill(255);

    rect(this.x, this.y, this.w, this.h);

  }

}