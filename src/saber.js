const Saber = function (x, y, spd, type){

  this.pos = {
    x : x,
    y : y
  }

  let hP = 1;
  this.spd = spd;
  const maxBeams = 1;
  this.beams = [];

  const self = this;

  const create = function () {
    self.el = document.createElement("div");
    self.el.classList.add('animated', 'fadeInDown', type);

    self.el.style.top = self.pos.y + "px";
    self.el.style.left = self.pos.x + "px";

    const board = document.getElementById('board');
    board.appendChild(self.el);
  }


  this.motion = {
    left: false,
    right: true,
    down: false
  }

  function edgeDetect() {
    debugger;
    if (self.pos.x >= (screenWidth - 15)) {

      self.motion.right = false;
      self.motion.down = true;
      setTimeout(() => {
        self.motion.left = true;
        self.motion.down = false;
      }, 400);
    }
    if (self.pos.x <= 15) {
      self.motion.left = false;
      self.motion.down = true;
      setTimeout(() => {
        self.motion.down = false;
        self.motion.right = true;
      }, 400);
    }
  }

  function movement() {

    if(self.motion.right) {
      self.pos.x += self.spd;
    }
    if (self.motion.left) {
      self.pos.x -= self.spd;
    }
    if (self.motion.down) {
      self.pos.y += self.spd;
    }

    self.el.style.top = self.pos.y + "px";
    self.el.style.left = self.pos.x + "px";
  }

  function shoot() {
    if (self.beams.length >= maxBeams) {
      return;
    } else if (Math.random() >= 0.998) {
      self.beams.push(new Beams(self.pos.x, self.pos.y, -3, "saber-beam"));
    }
  }

  this.removeBeam = function() {
    self.beams[0].ele.remove();
    self.beams.splice(0, 1);
  }

  this.explode = function(idx) {
    board.sabers[idx].el.remove();
    board.sabers.splice(idx, 1);
    // board.explodeFX.play();
  }

  this.render = function(){
    movement();
    edgeDetect();
    shoot();

    self.beams.forEach(function(el, idx) {
      el.render();
      if (el.pos.y > screenHeight) {
        el.element.remove();
        self.beams.splice(idx, 1);
      }
    })
  }
  create();
}