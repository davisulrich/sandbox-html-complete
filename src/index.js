import Paddle from "/src/paddle";
import Input from "/src/input";
import InputHandler from "./input";

let canvas = document.getElementById("gameScreen");

let context = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);

new InputHandler();

paddle.draw(context);

let lastTime = 0;

function gameLoop(timestamp) {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  context.clearRect(0, 0, 800, 600);
  paddle.update(deltaTime);
  paddle.draw(context);

  requestAnimationFrame(gameLoop);
}

gameLoop();
