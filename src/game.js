import Paddle from "/src/paddle";
import InputHandler from "/src/input";
import Ball from "/src/ball";
import Brick from "/src/brick";
import { buildLevel, level1 } from "/src/levels";

const GAME_STATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3
};
export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gamestate = GAME_STATE.MENU;
    this.ball = new Ball(this);
    this.paddle = new Paddle(this);
    this.gameObjects = [];
    this.lives = 3;
    this.bricks = [];
    new InputHandler(this.paddle, this);
  }

  start() {
    if (this.gamestate !== GAME_STATE.MENU) return;

    this.bricks = buildLevel(this, level1);
    this.gameObjects = [this.ball, this.paddle];
    this.gamestate = GAME_STATE.RUNNING;
  }

  update(deltaTime) {
    if (this.lives === 0) this.gamestate = GAME_STATE.GAMEOVER;
    if (
      this.gamestate === GAME_STATE.PAUSED ||
      this.gamestate === GAME_STATE.MENU ||
      this.gamestate === GAME_STATE.GAMEOVER
    )
      return;

    [...this.gameObjects, ...this.bricks].forEach((object) =>
      object.update(deltaTime)
    );
    this.gameObjects = this.gameObjects.filter(
      (object) => !object.markedForDeletion
    );
  }

  draw(context) {
    [...this.gameObjects, ...this.bricks].forEach((object) =>
      object.draw(context)
    );

    if (this.gamestate === GAME_STATE.PAUSED) {
      context.rect(0, 0, this.gameWidth, this.gameHeight);
      context.fillStyle = "rgba(100, 100, 0, 0.5)";
      context.fill();

      context.font = "30px Arial";
      context.fillStyle = "black";
      context.textAlign = "center";
      context.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gamestate === GAME_STATE.MENU) {
      context.fillStyle = "pink";
      context.rect(0, 0, this.gameWidth, this.gameHeight);
      context.fill();

      context.font = "30px Arial";
      context.fillStyle = "blue";
      context.textAlign = "center";
      context.fillText(
        "Press SPACEBAR to Start",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }

    if (this.gamestate === GAME_STATE.GAMEOVER) {
      context.fillStyle = "red";
      context.rect(0, 0, this.gameWidth, this.gameHeight);
      context.fill();

      context.font = "30px Arial";
      context.fillStyle = "black";
      context.textAlign = "center";
      context.fillText(
        "LOSER LOSER LOSER",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }
  }

  //pause game
  togglePause() {
    if (this.gamestate === GAME_STATE.PAUSED) {
      this.gamestate = GAME_STATE.RUNNING;
    } else {
      this.gamestate = GAME_STATE.PAUSED;
    }
  }
}
