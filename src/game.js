class Game {
  constructor(){
    this.config = {
      atkRate: 0.05,
      atkMinV: 50,
      atkMaxV: 50,
      saberIniV: 25,
      saberAccel: 0,
      saberDropDis: 20,
      laserV: 120,
      laserFR: 2,
      gameWidth: 400,
      gameHeight: 300,
      fps: 50,
      saberRanks: 5,
      saberFiles: 10,
      heroineSpd: 120,
      levelMultiplier: 0.2,
      ptsPerSaber: 5,
      levelCap: 25
    }

    this.lives = 3;
    this.width = 0;
    this.height = 0;
    this.bounds = { left: 0, top: 0, right: 0, bottom: 0};
    this.intID = 0;
    this.score = 0;
    this.level = 1;

    this.stack = [];

    this.inputKeys = {};
    this.gameCanvas = null;

    this.sounds = null;

    this.prevX = 0

  };

  init(gameCanvas) {
    this.gameCanvas = gameCanvas;

    this.width = gameCanvas.width;
    this.height = gameCanvas.height;

    this.bounds ={
      left: gameCanvas.width / 2 - this.config.gameWidth / 2,
      right: gameCanvas.width / 2 + this.config.gameWidth / 2,
      top: gameCanvas.height / 2 - this.config.gameHeight / 2,
      bottom: gameCanvas.height / 2 + this.config.gameHeight / 2,
    };

  };

  moveState (state) {
    if (this.currentState() && this.currentState().leave) {
      this.currentState().leave(game);
      this.stack.pop();
    }

    if (state.enter) {
      state.enter(game);
    }

    this.stack.pop();
    this.stack.push(state);
  };

  start () {
    this.moveState( new State());

    this.lives = 3;
    
    const game = this;
    this.intID = setInterval(function () {
      GameLoop(game);
    }, 1000 / this.config.fps);
  };

  currentState () {
    return this.stack.length > 0 ? this.stack[this.stack.length - 1] : null;
  }
  

};