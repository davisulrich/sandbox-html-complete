import Paddle from "./paddle";

export default class InputHandler {
  constructor(paddle) {
    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        case 37:
          Paddle.moveLeft();
          break;

        case 39:
          alert("move right");
          break;
      }
    });
  }
}
