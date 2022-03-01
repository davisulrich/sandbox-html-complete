export default class Paddle {
  constructor(gameWidth, gameHeight) {
    this.width = 200;
    this.height = 25;
    this.gameWidth = gameWidth;

    this.maxSpeed = 5;
    this.speed = 0;

    this.position = {
      x: gameWidth / 2 - this.width / 2,
      y: gameHeight - this.height - 10
    };
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  moveRight() {
    this.speed = this.maxSpeed;
  }

  stop() {
    this.speed = 0;
  }

  draw(context) {
    context.fillStyle = "#0f0";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(deltaTime) {
    this.position.x += this.speed;

    if (this.position.x < 0) this.position.x = 0;

    if (this.position.x + this.width > this.gameWidth)
      this.position.x = this.gameWidth - this.width;
  }
}
