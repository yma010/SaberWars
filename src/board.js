let gameState = 'startscreen';

const gameOverElement = document.getElementById('gameover');

let startButton = document.getElementById('startbutton');

startButton.addEventListener('click', function(){
  gameState = 'gameStart';
  document.getElementById('start').style.zIndex = -1;
  document.getElementById('player').style.zIndex = 0;
  document.getElementById('score-tracker').style.zIndex = 1;
  document.getElementById('life-tracker').style.zIndex = 1;
})

const retryButton = document.getElementById('retrybutton');
retryButton.addEventListener('click', function () {
  board.heroine.lives = 3;
  gameState = 'gamestart';
  gameoverElement.style.zIndex = -1;
})

function gameOver(){
  gameState = 'gameover';
  gameoverElement.style.zIndex = 1;
  gameoverElement.classList.add('animated', 'slideInUp');
}

this.screenHeight = document.getElementById('board').getClientRects()[0].height;
this.screenWidth = document.getElementById('board').getClientRects()[0].width;

const Board = function(){
  this.heroine = new Heroine();
  this.sabers = [];
  this.rocks = [];
  this.score = 0;

  let lives;
  let saberSpd = 1;

  const self = this;

  this.laserSFX = new Audio();
  this.explodeFX = new Audio();
  this.playerSFX = new Audio();

  function spawnSabersRow(y, speed, type) {
    const x = 25;
    const z = y;

    for(let i = 0; i < 10; i++){
      self.sabers.push(new Saber(x, z, speed, type));
      x += 75;
    }
  }

  function spawnSabers() {
    if (self.sabers.length === 0) {
      spawnSabersRow(100, saberSpd, 'saber3');
      spawnSabersRow(150, saberSpd, 'saber2');
      spawnSabersRow(200, saberSpd, 'saber2');
      spawnSabersRow(250, saberSpd, 'saber1');
      spawnSabersRow(300, saberSpd, 'saber1');
      saberSpd += 0.2;

      if (self.rocks.length === 0) {
        let y = screenHeight - 150;
        const x = 100;
        for (let j = 0; j < 5; j++){
          self.rocks.push(new Rock(x, y));
          x += 150;
        }
      }
    }
  }

  this.movement = {
    "left" : false,
    "right": false,
    "shoot": false
  }

  this.collision = function(a, b) {
    if (a.left < b.left + b.width &&
      a.left + a.width > b.left &&
      a.top < b.top + b.height &&
      a.height + a.top > b.top) {
        return true;
      } else {
        return false;
      }
  }

  function collisonDetect(){
    self.rocks.forEach(function(el, idx){
      if ((self.heroine.beams.length !== 0) && (self.rocks.length !== 0)){
        const rockDetect = self.rocks[idx].element.getClientRects()[0];
        const beamDetect = self.beams[0].element.getClientRects()[0];

        if (self.collision(rockDetect, beamDetect)) {
          self.player.removeBeam();
          self.rocks[idx].hit(idx);
        }
      }
    })

    self.sabers.forEach(function(el, idx) {
      if ((self.sabers[idx].beams.length !== 0) && (self.rocks.length !== 0)) {
        for (let k = 0; k < self.rocks.length; k++) {
          const rockDetect = self.rocks[k].element.getClientRects()[0];
          const beamDetect = self.sabers[idx].beams[0].element.getClientRects()[0];

          if (self.collision(rockDetect, beamDetect)) {
            self.sabers[idx].removeBeam();
            self.rocks[i].hit(i);
          }

        }
      }
    })

    self.sabers.forEach(function (el, idx) {
      if ((self.heroine.beams.length !== 0) && (self.sabers.length !==0 )) {
        const saberDetect = self.sabers[idx].element.getClientRects()[0];
        const beamDetect = self.heroine.beams[0].element.getClientRects()[0];

        if (self.collision(saberDetect, beamDetect)) {
          if (self.aliens[index].element.className.includes("saber1")) {
            self.score += 10;
          } else if (self.aliens[index].element.className.includes("saber2")) {
            self.score += 15;
          } else if (self.aliens[index].element.className.includes("saber3")) {
            self.score += 20;
          }

          if (self.sabers[idx].beams.length !== 0) {
            self.sabers[idx].beams[0].element.remove();
          } 
          self.sabers[idx].explode(idx);

          self.heroine.removeBeam();
        }
      }
    })

    self.sabers.forEach(function(el, idx){
        if (self.sabers[idx].beams.length !== 0) {
            const saberBeamsDetect = self.sabers[idx].beams[0].element.getClientRects()[0];
            var heroineDetect = self.heroine.element.getClientRects()[0];

              if (self.collision(saberBeamsDetect, heroineDetect)) {
                self.heroine.hit();
                
                self.sabers[idx].removeLaser();
                }
        }

    }) 

      self.sabers.forEach(function(el, idx){
      if ((self.heroine) && (self.sabers.length !== 0)) {
        const sabersDetect = self.sabers[idx].element.getClientRects()[0];
        const heroine = self.heroine.element.getClientRects()[0];

        if (self.collision(sabersDetect, heroine)) {
              self.player.hit();
        }
      }
    })
  }

  function scoreBoard() {
    const scoreEle = document.getElementById('score');
    scoreEle.textContent = self.score;
  }

  document.addEventListener('keydown', function(e){
    switch(e.keyCode) {
      case 37:
        self.movement.left = true;
        self.heroine.style.backgroundImage="url(res/HeroineLT.png)";
        break;
      case 39:
        self.movement.left = true;
        self.heroine.style.backgroundImage = "url(res/HeroineRT.png)";
        break;
      case 37:
        self.movement.shoot = true;
        break;
      default:
    }
  });
  document.addEventListener('keyup', function (e) {
    switch (e.keyCode) {
      case 37:
        self.movement.left = false;
        self.heroine.element.style.backgroundImage = "url(res/Heroine.png)";
        break;
      case 39:
        self.movement.right = false;
        self.heroine.element.style.backgroundImage = "url(res/Heroine.png)";
        break;
      case 32:
        self.movement.shoot = false;
        break;
      default:
    }
  });

  function render() {
    if (gameState !== 'startscreen' && gameState !== 'gameover') {
      self.heroine.render(self.movement);
      spawnSabers();

      for (let l = 0; l < self.rocks.length; l++) {
        self.rocks[l].render();
      }

      for (let m = 0; m < self.sabers.length; m++) {
        self.sabers[m].render();
      }

      collisonDetect();
      scoreBoard();

    }
  }

  function animaLoop() {
    requestAnimFrame(animaLoop);
    render();
  }
  animaLoop();

}

window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

const board = new Board();