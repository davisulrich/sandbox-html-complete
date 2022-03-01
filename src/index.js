import Paddle from "/src/paddle";

let canvas = document.getElementById("gameScreen");

let context = canvas.getContext("2d");

context.clearRect(0, 0, 800, 600);

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

/*
context.fillStyle = "#f00";
context.fillRect(20, 20, 100, 100);

context.fillStyle = "#00f";
context.fillRect(680, 480, 100, 100);
*/

let paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);

paddle.draw(context);
