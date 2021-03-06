import Game from "/src/game";

let canvas = document.getElementById("gameScreen");

let context = canvas.getContext("2d");

const GAME_WIDTH = 400;
const GAME_HEIGHT = 300;

let game = new Game(GAME_WIDTH, GAME_HEIGHT);

let lastTime = 0;

// images
// let imgIceCream = document.getElementById("img_icecream");

function gameLoop(timestamp) {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  game.update(deltaTime);
  game.draw(context);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
