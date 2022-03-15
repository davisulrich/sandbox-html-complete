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
  }

  start() {
    this.gamestate = GAME_STATE.RUNNING;
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);

    let bricks = buildLevel(this, level1);
    
    this.gameObjects = [this.ball, this.paddle, ...bricks];

    new InputHandler(this.paddle, this);
  }

  update(deltaTime) {
    if (this.gamestate == GAME_STATE.PAUSED) return;

    this.gameObjects.forEach((object) => object.update(deltaTime));
    this.gameObjects = this.gameObjects.filter(object => !object.markedForDeletion);
  }

  draw(context) {
    this.gameObjects.forEach((object) => object.draw(context));
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
