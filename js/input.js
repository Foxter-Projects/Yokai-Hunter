class InputHandler {
  constructor() {
    this.keys = [];
    window.addEventListener("keydown", e => {
      if (
        ["ArrowLeft", "ArrowRight", "Space", "KeyA"].includes(e.code) &&
        this.keys.indexOf(e.code) === -1
      ) {
        this.keys.push(e.code);
      }
    });
    window.addEventListener("keyup", e => {
      if (["ArrowLeft", "ArrowRight", "Space", "KeyA"].includes(e.code)) {
        this.keys.splice(this.keys.indexOf(e.code), 1);
      }
    });
  }
}
