export default class Ball {
  constructor(game) {
    this.image = document.getElementById("img_icecream");
    this.position = { x: 10, y: 10 };
    this.speed = { x: 2, y: 2 };
    this.size = { width: 35, height: 70 };

    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
  }

  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    if (
      this.position.x + this.size.width > this.gameWidth ||
      this.position.x < 0
    )
      this.speed.x = -this.speed.x;

    if (
      this.position.y + this.size.height > this.gameHeight ||
      this.position.y < 0
    )
      this.speed.y = -this.speed.y;
  }
}
