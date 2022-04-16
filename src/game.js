import Paddle from "/src/paddle";
import InputHandler from "/src/input";
import Ball from "/src/ball";
import Brick from "/src/brick";
import {buildLevel, level1} from "/src/levels";

const GAME_STATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3
}
export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.gamestate = GAME_STATE.MENU;
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.gameObjects = [];

    new InputHandler(this.paddle, this);
  }

  start() {
    let bricks = buildLevel(this, level1);
    this.gameObjects = [this.ball, this.paddle, ...bricks];
    this.GAME_STATE = GAME_STATE.RUNNING;
  }

  update(deltaTime) {
    if (this.gamestate === GAME_STATE.PAUSED || this.gamestate === GAME_STATE.MENU) return;

    this.gameObjects.forEach((object) => object.update(deltaTime));
    this.gameObjects = this.gameObjects.filter(object => !object.markedForDeletion);
  }

  draw(context) {
    this.gameObjects.forEach((object) => object.draw(context));

    if (this.gamestate === GAME_STATE.PAUSED) {
      context.rect(0, 0, this.gameWidth, this.gameHeight)
      context.fillstyle = "rgba(0, 0, 0, 0.5)";
      context.fill();
      context.font = "30px Arial";
      context.fillStyle = "white";
      context.textAlign = "center";
      context.fillText("Paused", this.gameWidth/2, this.gameHeight/2);
    }

    if (this.gamestate === GAME_STATE.MENU) {
      context.rect(0, 0, this.gameWidth, this.gameHeight)
      context.fillstyle = "rgba(0, 0, 0, 1)";
      context.fill();
      context.font = "30px Arial";
      context.fillStyle = "white";
      context.textAlign = "center";
      context.fillText("Press SPACEBAR to Start.", this.gameWidth/2, this.gameHeight/2);
    }
    
  }

  //pause game
  togglePause() {
    if (this.gamestate == GAME_STATE.PAUSED) {
      this.gamestate = GAME_STATE.RUNNING;
    } else {
      this.gamestate = GAME_STATE.PAUSED;
    }
  }
}
