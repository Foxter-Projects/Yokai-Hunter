const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const game = {
  width: canvas.width,
  height: canvas.height,
  lastTime: 0,
  deltaTime: 0,
};

const input = new InputHandler();
const background = new Background();
const player = new Player(input, game.width, background);
const enemy = new Enemy();

function gameLoop(timestamp) {
  game.deltaTime = timestamp - game.lastTime;
  game.lastTime = timestamp;

  ctx.clearRect(0, 0, game.width, game.height);

  background.draw(ctx); 
  player.update(game.deltaTime);
  player.draw(ctx);
  enemy.update();
  enemy.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
