import {detectCollision} from "/src/collisionDetection"

export default class Ball {
  constructor(game, paddle) {
    this.image = document.getElementById("img_icecream");
    this.position = { x: 10, y: 200 };
    this.speed = { x: 2.3, y: -2.3 };
    this.size = { width: 15, height: 30 };

    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.game = game;
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

    //hitting the wall on left or right (x axis)
    if (
      this.position.x + this.size.width > this.gameWidth ||
      this.position.x < 0
    )
      this.speed.x = -this.speed.x;

    //hitting the wall on top or bottom (y axis))
    if (
      this.position.y + this.size.height > this.gameHeight ||
      this.position.y < 0
    )
      this.speed.y = -this.speed.y;

    if (detectCollision(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size.height;
    }
  }
}
