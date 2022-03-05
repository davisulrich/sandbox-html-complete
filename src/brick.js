export default class Brick {
  constructor(game, position) {
    this.image = document.getElementById("img_unicorn");
    this.position = position;
  
    this.width = 40;
    this.height = 15;

    this.game = game;
  }

  update() {

  }

  draw(context) {
    context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
  }
}