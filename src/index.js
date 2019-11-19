document.addEventListener('DOMContentLoaded', (event) => {
  const gameCanvas = document.getElementById("game-canvas");
  const ctx = gameCanvas.getContext("2d")
  
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 690, 420);

  // const game = new Game();
  // game.draw(ctx);
  
  // const gameView = new GameView(game, ctx);
  // gameView.start();
});


console.log("Webpack is working!")