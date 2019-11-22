const Heroine = function() {
  
  const speed = 7;
  this.lives = 3;
  const maxBeam = 1;

  this.beams = [];
  this.position = {
    "x" : screenWidth / 2,
    "y" : screenHeight - 20
  };

  const self = this;

  this.livesEl = document.getElementsByClassName("lives");

  const create = function () {
    self.el = document.createElement("div");
    self.el.setAttribute("id", "heroine");

    self.el.style.top = self.position.y + "px";
    self.el.style.left = self.position.x + "px";

    const board = document.getElementById("board");
    board.appendChild(self.el);
  }

  this.hit= function() {
    const moveRight = self.el.style.backgroundImage="url(res/HeroineRT.png)";
    const moveLeft = self.el.style.backgroundImage = "url(res/HeroineLT.png)";
    const heroineHit = self.el.style.backgroundImage = "url(res/HeroineHit.png)";

    board.playerExplodeFX.play();

    if (self.lives >= 2) {
      self.livesEl[0].remove()
      self.lives --;
      if (board.movement.left) {
        moveRight;
      } else if (board.movement.right) {
        moveLeft;
      } else {
        heroineHit;
      }
    } else if (self.lives === 1) {
      self.livesEl[0].remove()
      self.lives --;
      if (board.movement.left) {
        moveRight;
      } else if (board.movement.right) {
        moveLeft;
      } else {
        heroineHit;
      }
      gameOver();
    }
  }

  const shoot = function() {
    if(self.beams.length >= maxBeam) {
      return;
    }
    board.beamFX.play();
    self.beams.push(new Beam(self.position.x, self.position.y, 15, 'heroine-bean'));
  }

  this.removeBeam = function() {
    self.beams[0].el.remove();
    self.beams.splice(0,1);
  }

  function move(movement) {
    if (movement.right){
      self.position.x += speed;
    }
    if (movement.left){
      self.position.x -= speed;
    }
  }

  function edgeDetect(){
    if (self.position.x <= 25){
      self.position.x = 25;
    }

    if (self.position.x >= (screenWidth-25)){
      self.position.x = screenWidth - 25;
    }
  }

  this.render = function(movement) {
    if (movement.left || movement.right) {
      move(movement);
    }

    if (movement.shoot) {
      shoot();
    }

    self.el.style.left = self.position.x;
    self.el.style.top = self.position.y;

    edgeDetect();

    self.beams.forEach(function(ele, idx){
      ele.render();

      if (ele.position.y < 0) {
        ele.el.remove();
        self.beams.splice(idx, 1);
      }
    });
  }
  create();
}